import * as ts from "typescript";
import {tsquery} from '@phenomnomnominal/tsquery';

type angularDecoratorProperties = 'selector' | 'template' | 'templateUrl' | 'styleUrls' | 'styles' | 'standalone';

export function parseComponent(ast: ts.SourceFile): void {
    const componentDecorators = getAngularComponentDecorators(ast);

    if (componentDecorators.templateUrl) {
        // TODO: fetch template
    }

}

function getAngularComponentDecorators(ast: ts.SourceFile): { propertyName: string, value: string }[] {
    const componentDecorators = tsquery(ast,
        `Decorator > CallExpression > ObjectLiteralExpression > PropertyAssignment`
    );
    return componentDecorators.reduce((decorators, propertyAssignment: any) => {
        return {
            propertyName: propertyAssignment.name.getText(),
            value: propertyAssignment.initializer.getText()
        }
    }, {});
}
