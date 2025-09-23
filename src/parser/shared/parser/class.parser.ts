import * as ts from 'typescript';
import { tsquery } from '@phenomnomnominal/tsquery';

/**
 * Extracts JSDoc comments from a TypeScript node
 * @param node The TypeScript node to extract JSDoc comments from
 * @returns The extracted JSDoc comment as a string, or undefined if no JSDoc comment exists
 */
function extractJSDocComment(node: ts.Node | undefined): string | undefined {
  if (!node) return undefined;

  const jsDocs = (node as any).jsDoc as ts.JSDoc[] | undefined;
  if (!jsDocs || jsDocs.length === 0) return undefined;

  const jsDoc = jsDocs[0];
  let result = (jsDoc?.comment as string) ?? '';

  if (jsDoc?.tags) {
    for (const tag of jsDoc.tags) {
      result += `\n@${tag.tagName.getText()} ${tag.comment ?? ''}`;
    }
  }

  return result.trim();
}

export function parseClassName(ast: ts.SourceFile): string {
  const classDeclarations = [...tsquery(ast, 'ClassDeclaration > Identifier')] as ts.Identifier[];
  return classDeclarations[0]?.getText() as string;
}

export function parseClassJsDoc(ast: ts.SourceFile): string | undefined {
  const classDeclarations = [...tsquery(ast, 'ClassDeclaration')] as ts.ClassDeclaration[];
  if (classDeclarations.length === 0) return undefined;

  return extractJSDocComment(classDeclarations[0]);
}
