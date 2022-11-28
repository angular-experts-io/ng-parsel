import * as ts from 'typescript';
import { tsquery } from '@phenomnomnominal/tsquery';

import { NgParselOutputType } from '../parser/shared/model/types.model';

export function investigateType(ast: ts.SourceFile, filePath: string): NgParselOutputType {
  const filePathFragment = filePath.split('/');
  if (filePathFragment[filePathFragment.length - 1].endsWith('spec.ts')) {
    return NgParselOutputType.SPEC;
  }

  if (filePathFragment[filePathFragment.length - 1].endsWith('harness.ts')) {
    return NgParselOutputType.HARNESS;
  }

  if (isComponent(ast)) {
    return NgParselOutputType.COMPONENT;
  }

  if (isModule(ast)) {
    return NgParselOutputType.MODULE;
  }

  if (isDirective(ast)) {
    return NgParselOutputType.DIRECTIVE;
  }

  if (isPipe(ast)) {
    return NgParselOutputType.PIPE;
  }

  return NgParselOutputType.UNKNOWN;
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
