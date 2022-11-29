import * as ts from 'typescript';
import { tsquery } from '@phenomnomnominal/tsquery';

export function parseClassName(ast: ts.SourceFile): string {
  const classDeclarations = [...tsquery(ast, 'ClassDeclaration > Identifier')] as ts.Identifier[];
  return classDeclarations[0]?.getText() as string;
}
