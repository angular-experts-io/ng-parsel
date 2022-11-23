import { tsquery } from "@phenomnomnominal/tsquery";
import { readFileSync } from "fs";

import { AngularType } from "../model/types.model";

import { parseComponent } from "./component-parser";
import { investigateType } from "./investigator";

export function parse(filePath: string) {
  const source = readFileSync(filePath, "utf8");
  const ast = createAST(source);
  const componentType = investigateType(ast);

  if (componentType === AngularType.COMPONENT) {
    console.log(parseComponent(ast, filePath));
  }
}

function createAST(source: string) {
  return tsquery.ast(source);
}
