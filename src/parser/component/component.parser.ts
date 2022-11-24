import path from "path";
import {readFileSync} from "fs";
import * as ts from "typescript";
import {tsquery} from "@phenomnomnominal/tsquery";

import {parseClassName} from "../shared/parser/class.parser";
import {NgParselBuildingBlockType} from "../shared/model/types.model";
import {parseInputsAndOutputs} from "../shared/parser/field-decorator.parser";

import {NgParselComponent} from "./component.model";
import {NgParselDecoratorProperties} from "../shared/model/decorator.model";

export function parseComponent(
    ast: ts.SourceFile,
    componentFilePath: string
): NgParselComponent {
    const componentDecorators = getComponentDecorators(ast);
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
        selector: componentDecorators.selector as string,
        standalone: componentDecorators.standalone || false,
        template: template,
        styles: styles,
        implementation: componentImplementation,
        inputs: inputsAndOutputs.inputs,
        outputs: inputsAndOutputs.outputs,
    };
}

function getComponentDecorators(
    ast: ts.SourceFile
): NgParselDecoratorProperties {
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

function fetchFileContent(filePath: string, componentFilePath: string): string {
    const filePathFragements = componentFilePath.split("/");
    filePathFragements.pop();
    const componentDirectory = filePathFragements.join("/");
    const templatePath = path.join(componentDirectory, filePath);
    return readFileSync(templatePath, "utf8").toString();
}
