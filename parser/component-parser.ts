import path from "path";
import {readFileSync} from "fs";
import * as ts from "typescript";
import {tsquery} from '@phenomnomnominal/tsquery';

import {MitchellAngularComponent} from "../model/component.model";

// TODO test all of those properties
export interface MitchellAngularComponentDecorators {
    selector: string;
    standalone: boolean;
    template?: string;
    templateUrl?: string;
    styles?: string;
    styleUrls?: string[];
    animations?: any[];
    encapsulation?: string;
    changeDetection?: string;
}

export function parseComponent(ast: ts.SourceFile, componentFilePath: string): MitchellAngularComponent {
    const componentDecorators = getAngularComponentDecorators(ast);
    const template =
        componentDecorators.template ? componentDecorators.template :
            fetchFileContent(componentDecorators.templateUrl as string, componentFilePath);

    const styles = componentDecorators.styles ?
        componentDecorators.styles :
        (componentDecorators.styleUrls as [])?.map((styleUrl: string) =>
            fetchFileContent(styleUrl, componentFilePath)
        );
    const componentImplementation = readFileSync(componentFilePath, 'utf8').toString();

    return {
        name: '',
        selector: componentDecorators.selector,
        standalone: componentDecorators.standalone || false,
        template: template,
        styles: styles,
        implementation: componentImplementation,
        inputs: [],
        outputs: []
    }
}

function getAngularComponentDecorators(ast: ts.SourceFile): MitchellAngularComponentDecorators {
    const decoratorQuery = 'Decorator > CallExpression > ObjectLiteralExpression > PropertyAssignment';
    const componentDecorators = tsquery(ast, decoratorQuery);

    return componentDecorators.reduce((decorators: any, propertyAssignment: any) => {
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
