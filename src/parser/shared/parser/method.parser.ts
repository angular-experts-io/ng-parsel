import * as ts from 'typescript';
import { tsquery } from '@phenomnomnominal/tsquery';

import { NgParselArgs } from '../model/args.model.js';
import { NgParselMethod } from '../model/method.model.js';

export function parseExplicitPublicMethods(ast: ts.SourceFile): NgParselMethod[] {
  const explicitMethods = tsquery(ast, 'MethodDeclaration:has(PublicKeyword)');

  return explicitMethods.map((method: any) => {
    return {
      name: method.name.getText(),
      args: method.parameters.map((parameters: ts.ParameterDeclaration) => parseMethodParameters(parameters)),
      returnType: method.type?.getText(),
    };
  });
}

function parseMethodParameters(methodParams: ts.ParameterDeclaration): NgParselArgs {
  return {
    name: methodParams.name.getText(),
    type: methodParams.type?.getText() as string,
  };
}
