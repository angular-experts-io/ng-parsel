import path from "path";
import {readFileSync} from "fs";
import * as ts from "typescript";
import {tsquery} from '@phenomnomnominal/tsquery';

import {MitchellAngularComponent} from "../model/component.model";

export function parseComponent(ast: ts.SourceFile, componentFilePath: string): MitchellAngularComponent {
    const componentDecorators = getAngularComponentDecorators(ast);
    const template =
        componentDecorators.template ? componentDecorators.template :
            fetchFileContent(componentDecorators.templateUrl as string, componentFilePath);

    const styles = componentDecorators.style ?
        componentDecorators.style :
        (componentDecorators.styleUrls as [])?.map((styleUrl: string) =>
            fetchFileContent(styleUrl, componentFilePath)
        );

    // TODO: this can probably be improved since we already know the properties and the types
    return {
        name: '',
        selector: componentDecorators.selector as string,
        standalone: componentDecorators.standalone as boolean || false,
        template: template as string,
        styles: styles as string,
        implementation: '',
        inputs: [],
        outputs: []
    }
}

function getAngularComponentDecorators(ast: ts.SourceFile): { [key: string]: string | string[] | boolean } {
    const decoratorQuery = 'Decorator > CallExpression > ObjectLiteralExpression > PropertyAssignment';
    const componentDecorators = tsquery(ast, decoratorQuery);

    return componentDecorators.reduce((decorators: { [key: string]: string | string[] | boolean }, propertyAssignment: any) => {
        const propertyName = propertyAssignment.name.escapedText;

        if (propertyName === 'styleUrls' || propertyName === 'styles') {
            const styleTokens = tsquery(ast, `${decoratorQuery} > ArrayLiteralExpression > StringLiteral`);
            decorators[propertyName] = styleTokens.map(token => token.getText().replace(/'/g, ''));
            return decorators;
        }

        decorators[propertyName] = propertyAssignment.initializer.text;
        return decorators;
    }, {});
}

function fetchFileContent(filePath: string, componentFilePath: string): string {
    const filePathFragements = componentFilePath.split('/');
    filePathFragements.pop();
    const componentDirectory = filePathFragements.join('/');
    const templatePath = path.join(componentDirectory, filePath);
    return readFileSync(templatePath, 'utf8').toString();
}
