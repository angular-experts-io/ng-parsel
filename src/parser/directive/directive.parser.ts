import {readFileSync} from "fs";
import * as ts from "typescript";
import {tsquery} from "@phenomnomnominal/tsquery";

import {NgParselBuildingBlockType} from "../../model/types.model";
import {parseInputsAndOutputs} from "../shared/parser/field-decorator.parser";

import {NgParselDirective, NgParselDirectiveDecorators} from "./directive.model";

export function parseDirective(
    ast: ts.SourceFile,
    componentFilePath: string
): NgParselDirective {
    const directiveDecorators = getDirectiveDecorators(ast);

    const directiveImplementation = readFileSync(
        componentFilePath,
        "utf8"
    ).toString();

    const inputsAndOutputs = parseInputsAndOutputs(ast);

    return {
        type: NgParselBuildingBlockType.DIRECTIVE,
        className: parseClassName(ast),
        selector: directiveDecorators.selector,
        standalone: directiveDecorators.standalone || false,
        implementation: directiveImplementation,
        inputs: inputsAndOutputs.inputs,
        outputs: inputsAndOutputs.outputs
    }
}

function getDirectiveDecorators(
    ast: ts.SourceFile
): NgParselDirectiveDecorators {
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

function parseClassName(ast: ts.SourceFile): string {
    return [...tsquery(ast, 'ClassDeclaration > Identifier')][0].getText();
}
