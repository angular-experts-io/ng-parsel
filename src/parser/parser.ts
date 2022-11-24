import {tsquery} from "@phenomnomnominal/tsquery";
import {readFileSync} from "fs";

import {NgParselBuildingBlockType} from "../model/types.model";

import {parseComponent} from "./component/component.parser";
import {investigateType} from "./investigator";
import {parseSpec} from "./spec/spec.parser";
import {parseModule} from "./module/module.parser";
import {parseDirective} from "./directive/directive.parser";

export function parse(filePath: string) {
    const source = readFileSync(filePath, "utf8");
    const ast = createAST(source);
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
        console.log(parseDirective(ast, filePath));
    }
}

function createAST(source: string) {
    return tsquery.ast(source);
}
