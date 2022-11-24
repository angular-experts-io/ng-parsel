import {tsquery} from "@phenomnomnominal/tsquery";
import {readFileSync} from "fs";

import {NgParselBuildingBlockType} from "./parser/shared/model/types.model";

import {parseComponent} from "./parser/component/component.parser";
import {investigateType} from "./investigator";
import {parseSpec} from "./parser/spec/spec.parser";
import {parseModule} from "./parser/module/module.parser";
import {parseDirective} from "./parser/directive/directive.parser";
import {parsePipe} from "./parser/pipe/pipe.parser";

// TODO - this should be renamed or moved into index.ts
export function parse(filePath: string) {
    const source = readFileSync(filePath, "utf8");
    const ast = tsquery.ast(source);
    const componentType = investigateType(ast, filePath);

    if (componentType === NgParselBuildingBlockType.COMPONENT) {
        // console.log(parseComponent(ast, filePath));
    }

    if (componentType === NgParselBuildingBlockType.SPEC) {
        // console.log(parseSpec(ast, filePath));
    }

    if (componentType === NgParselBuildingBlockType.MODULE) {
        // console.log(parseModule(ast));
    }

    if (componentType === NgParselBuildingBlockType.DIRECTIVE) {
        // console.log(parseDirective(ast, filePath));
    }

    if (componentType === NgParselBuildingBlockType.PIPE) {
        console.log(parsePipe(ast, filePath));
    }
}
