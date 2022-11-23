import path from "path";
import {readFileSync} from "fs";
import * as ts from "typescript";
import {tsquery} from "@phenomnomnominal/tsquery";

import {NgParselBuildingBlockType} from "../../model/types.model";

import {NgParselComponent, NgParselComponentDecorators, NgParselFieldDecorator} from "./component.model";

export function parseComponent(
    ast: ts.SourceFile,
    componentFilePath: string
): NgParselComponent {
    const componentDecorators = getAngularComponentDecorators(ast);
    const template = componentDecorators.template
        ? componentDecorators.template
        : fetchFileContent(
            componentDecorators.templateUrl as string,
            componentFilePath
        );

    const styles = componentDecorators.styles
        ? componentDecorators.styles
        : (componentDecorators.styleUrls as [])?.map((styleUrl: string) =>
            fetchFileContent(styleUrl, componentFilePath)
        );
    const componentImplementation = readFileSync(
        componentFilePath,
        "utf8"
    ).toString();

    const inputsAndOutputs = parseInputsAndOutputs(ast);

    return {
        type: NgParselBuildingBlockType.COMPONENT,
        className: parseClassName(ast),
        selector: componentDecorators.selector,
        standalone: componentDecorators.standalone || false,
        template: template,
        styles: styles,
        implementation: componentImplementation,
        inputs: inputsAndOutputs.inputs,
        outputs: inputsAndOutputs.outputs,
    };
}

function getAngularComponentDecorators(
    ast: ts.SourceFile
): NgParselComponentDecorators {
    const decoratorQuery =
        "Decorator > CallExpression > ObjectLiteralExpression > PropertyAssignment";
    const componentDecorators = tsquery(ast, decoratorQuery);

    return componentDecorators.reduce(
        (decorators: any, propertyAssignment: any) => {
            const propertyName = propertyAssignment.name.escapedText;

            if (propertyName === "styleUrls" || propertyName === "styles") {
                const styleTokens = tsquery(
                    ast,
                    `${decoratorQuery} > ArrayLiteralExpression > StringLiteral`
                );
                decorators[propertyName] = styleTokens.map((token) =>
                    token.getText().replace(/'/g, "")
                );
                return decorators;
            }

            decorators[propertyName] = propertyAssignment.initializer.text;
            return decorators;
        },
        {}
    );
}

function parseInputsAndOutputs(ast: ts.SourceFile): {
    inputs: NgParselFieldDecorator[],
    outputs: NgParselFieldDecorator[],
} {
    /*
       This is afaik the only way to get the Decorator name
       - getDecorators() returns nothing
       - canHaveDecorators() returns false
      */
    const decoratorPropertyDecorator = [
        ...tsquery(ast, "PropertyDeclaration:has(Decorator) > Decorator"),
    ];
    const decoratorPropertyDeclaration = [
        ...tsquery(ast, "PropertyDeclaration:has(Decorator)"),
    ];

    let inputsAndOutputs = {
        inputs: [] as NgParselFieldDecorator[],
        outputs: [] as NgParselFieldDecorator[],
    };

    for (let i = 0; i < decoratorPropertyDecorator.length; i++) {
        const decorator = decoratorPropertyDecorator[i].getText();
        const name = (decoratorPropertyDeclaration[i] as any).name?.getText();
        const type = (decoratorPropertyDeclaration[i] as any).type?.getText();
        const initializer = (decoratorPropertyDeclaration[i] as any).initializer?.getText();
        const field = `${decorator} ${name}${type ? ': ' + type : ' = ' + initializer}`;

        const componentDecorator = {
            decorator, name, type, initializer, field
        }

        if (decorator.startsWith('@Inp')) {
            inputsAndOutputs.inputs.push(componentDecorator);
        }

        if (decorator.startsWith('@Out')) {
            inputsAndOutputs.outputs.push(componentDecorator);
        }
    }
    return inputsAndOutputs;
}

function fetchFileContent(filePath: string, componentFilePath: string): string {
    const filePathFragements = componentFilePath.split("/");
    filePathFragements.pop();
    const componentDirectory = filePathFragements.join("/");
    const templatePath = path.join(componentDirectory, filePath);
    return readFileSync(templatePath, "utf8").toString();
}

function parseClassName(ast: ts.SourceFile): string {
    return [...tsquery(ast, 'ClassDeclaration > Identifier')][0].getText();
}
