import * as ts from 'typescript';
import { tsquery } from '@phenomnomnominal/tsquery';

import { NgParselBuildingBlockType } from './parser/shared/model/types.model';

export function investigateType(ast: ts.SourceFile, filePath: string): NgParselBuildingBlockType {
  const filePathFragment = filePath.split('/');
  if (filePathFragment[filePathFragment.length - 1].endsWith('spec.ts')) {
    return NgParselBuildingBlockType.SPEC;
  }

  if (isComponent(ast)) {
    return NgParselBuildingBlockType.COMPONENT;
  }

  if (isModule(ast)) {
    return NgParselBuildingBlockType.MODULE;
  }

  if (isDirective(ast)) {
    return NgParselBuildingBlockType.DIRECTIVE;
  }

  if (isPipe(ast)) {
    return NgParselBuildingBlockType.PIPE;
  }

  return NgParselBuildingBlockType.UNKNOWN;
}

function isPipe(ast: ts.SourceFile): boolean {
  return isType(ast, 'Pipe');
}

function isDirective(ast: ts.SourceFile): boolean {
  return isType(ast, 'Directive');
}

function isModule(ast: ts.SourceFile): boolean {
  return isType(ast, 'NgModule');
}

function isComponent(ast: ts.SourceFile): boolean {
  return isType(ast, 'Component');
}

function isType(ast: ts.SourceFile, type: string): boolean {
  return tsquery(ast, `Decorator > CallExpression > Identifier[escapedText="${type}"]`).length > 0;
}
