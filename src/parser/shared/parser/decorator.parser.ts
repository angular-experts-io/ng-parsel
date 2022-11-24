import * as ts from "typescript";
import {tsquery} from "@phenomnomnominal/tsquery";

import {NgParselDecoratorProperties} from "../model/decorator.model";

export function getDecoratorProperties(
    ast: ts.SourceFile
):  NgParselDecoratorProperties {
    const decoratorQuery =
        "Decorator > CallExpression > ObjectLiteralExpression > PropertyAssignment";
    const componentDecorators = tsquery(ast, decoratorQuery);

    return componentDecorators.reduce(
        (decorators: any, propertyAssignment: any) => {
            const propertyName = propertyAssignment.name.escapedText;
            decorators[propertyName] = propertyAssignment.initializer.text;
            return decorators;
        },
        {}
    );
}
