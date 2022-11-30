import * as ts from 'typescript';
import { tsquery } from '@phenomnomnominal/tsquery';

import { NgParselOutputType } from '../shared/model/types.model.js';
import { parseClassName } from '../shared/parser/class.parser.js';

import { NgParselModule } from './module.model.js';

export function parseModule(ast: ts.SourceFile): NgParselModule {
  return {
    className: parseClassName(ast),
    type: NgParselOutputType.MODULE,
    imports: getImports(ast),
    exports: getExports(ast),
    declarations: getDeclarations(ast),
    providers: getProviders(ast),
    bootstrap: getBootstrap(ast),
  };
}

function getImports(ast: ts.SourceFile): string[] {
  return getDecoratorPropertyValue(ast, 'imports');
}

function getDeclarations(ast: ts.SourceFile): string[] {
  return getDecoratorPropertyValue(ast, 'declarations');
}

function getExports(ast: ts.SourceFile): string[] {
  return getDecoratorPropertyValue(ast, 'exports');
}

function getProviders(ast: ts.SourceFile): string[] {
  return [...getDecoratorPropertyValue(ast, 'providers'), ...getDecoratorPropertyObject(ast, 'providers')];
}

function getBootstrap(ast: ts.SourceFile): string[] {
  return getDecoratorPropertyValue(ast, 'bootstrap');
}

function getDecoratorPropertyValue(ast: ts.SourceFile, identifier: string): string[] {
  return [
    ...tsquery(
      ast,
      `Decorator > CallExpression > ObjectLiteralExpression > PropertyAssignment:has(Identifier[escapedText="${identifier}"]) > ArrayLiteralExpression > Identifier`
    ),
  ].map((identifier: any) => identifier.getText());
}

function getDecoratorPropertyObject(ast: ts.SourceFile, identifier: string): string[] {
  return [
    ...tsquery(
      ast,
      `Decorator > CallExpression > ObjectLiteralExpression > PropertyAssignment:has(Identifier[escapedText="${identifier}"]) > ArrayLiteralExpression > ObjectLiteralExpression`
    ),
  ].map((identifier: any) => identifier.getText());
}
