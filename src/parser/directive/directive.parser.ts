import {readFileSync} from "fs";
import * as ts from "typescript";

import {parseClassName} from "../shared/parser/class.parser";
import {NgParselBuildingBlockType} from "../shared/model/types.model";
import {getDecoratorProperties} from "../shared/parser/decorator.parser";
import {parseInputsAndOutputs} from "../shared/parser/field-decorator.parser";

import {NgParselDirective} from "./directive.model";

export function parseDirective(
    ast: ts.SourceFile,
    componentFilePath: string
): NgParselDirective {
    const directiveDecorators = getDecoratorProperties(ast);

    const directiveImplementation = readFileSync(
        componentFilePath,
        "utf8"
    ).toString();

    const inputsAndOutputs = parseInputsAndOutputs(ast);

    return {
        type: NgParselBuildingBlockType.DIRECTIVE,
        className: parseClassName(ast),
        selector: directiveDecorators.selector as string,
        standalone: directiveDecorators.standalone || false,
        implementation: directiveImplementation,
        inputs: inputsAndOutputs.inputs,
        outputs: inputsAndOutputs.outputs
    }
}

