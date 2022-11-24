import * as ts from "typescript";
import {readFileSync} from "fs";

import {NgParselSpec} from "./spec.model";
import {NgParselBuildingBlockType} from "../shared/model/types.model";

export function parseSpec(
    ast: ts.SourceFile,
    specFilePath: string
): NgParselSpec {
    return {
        type: NgParselBuildingBlockType.SPEC,
        implementation: readFileSync(specFilePath, 'utf8').toString()
    }
}
