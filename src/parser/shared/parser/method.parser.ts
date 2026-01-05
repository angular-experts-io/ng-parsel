import * as ts from 'typescript';
import { tsquery } from '@phenomnomnominal/tsquery';

import { NgParselArgs } from '../model/args.model.js';
import { NgParselMethod } from '../model/method.model.js';
import { AccessType } from '../model/common.model.js';

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

export function parseExplicitPublicMethods(ast: ts.SourceFile): NgParselMethod[] {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const explicitMethods = tsquery(ast, 'MethodDeclaration:has(PublicKeyword)') as any[];

  return explicitMethods.map((method) => {
    return {
      name: method.name.getText(),
      args: method.parameters.map((parameters: ts.ParameterDeclaration) => parseMethodParameters(parameters)),
      returnType: method.type?.getText(),
      jsDoc: extractJSDocComment(method),
      accessType: 'public',
    };
  });
}

export function parseMethods(ast: ts.SourceFile): NgParselMethod[] {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const methods = tsquery(ast, 'MethodDeclaration') as any[];
  return methods.map((method) => {
    // determine access type from modifiers
    const modifiers = (method.modifiers as ts.NodeArray<ts.Modifier>) ?? undefined;

    const kind = modifiers?.find((m) => m.kind)?.kind;
    const accessType: AccessType =
      kind === ts.SyntaxKind.PublicKeyword
        ? 'public'
        : kind === ts.SyntaxKind.ProtectedKeyword
          ? 'protected'
          : kind === ts.SyntaxKind.PrivateKeyword
            ? 'private'
            : 'publicImplicit';

    return {
      name: method.name.getText(),
      args: method.parameters.map((parameters: ts.ParameterDeclaration) => parseMethodParameters(parameters)),
      returnType: method.type?.getText(),
      jsDoc: extractJSDocComment(method),
      accessType,
    };
  });
}

function parseMethodParameters(methodParams: ts.ParameterDeclaration): NgParselArgs {
  return {
    name: methodParams.name.getText(),
    type: methodParams.type?.getText() as string,
  };
}
