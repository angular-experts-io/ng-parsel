import * as ts from "typescript";
import { tsquery } from "@phenomnomnominal/tsquery";

import { MitchelAngularBuildingBlockType } from "../model/types.model";

export function investigateType(ast: ts.SourceFile): MitchelAngularBuildingBlockType {
  if (isComponent(ast)) {
    return MitchelAngularBuildingBlockType.COMPONENT;
  }

  if (isModule(ast)) {
    return MitchelAngularBuildingBlockType.MODULE;
  }

  if (isDirective(ast)) {
    return MitchelAngularBuildingBlockType.DIRECTIVE;
  }

  if (isPipe(ast)) {
    return MitchelAngularBuildingBlockType.PIPE;
  }

  return MitchelAngularBuildingBlockType.UNKNOWN;
}

function isPipe(ast: ts.SourceFile): boolean {
  return isType(ast, "Pipe");
}

function isDirective(ast: ts.SourceFile): boolean {
  return isType(ast, "Directive");
}

function isModule(ast: ts.SourceFile): boolean {
  return isType(ast, "NgModule");
}

function isComponent(ast: ts.SourceFile): boolean {
  return isType(ast, "Component");
}

function isType(ast: ts.SourceFile, type: string): boolean {
  return (
    tsquery(
      ast,
      `Decorator > CallExpression > Identifier[escapedText="${type}"]`
    ).length > 0
  );
}
