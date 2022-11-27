import * as ts from 'typescript';
import { tsquery } from '@phenomnomnominal/tsquery';

import { NgParselFieldDecorator } from '../model/decorator.model';

export function parseInputsAndOutputs(ast: ts.SourceFile): {
  inputs: NgParselFieldDecorator[];
  outputs: NgParselFieldDecorator[];
} {
  /*
       This is afaik the only way to get the Decorator name
       - getDecorators() returns nothing
       - canHaveDecorators() returns false
      */
  const decoratorPropertyDecorator = [...tsquery(ast, 'PropertyDeclaration:has(Decorator) > Decorator')];
  const decoratorPropertyDeclaration = [...tsquery(ast, 'PropertyDeclaration:has(Decorator)')];

  let inputsAndOutputs = {
    inputs: [] as NgParselFieldDecorator[],
    outputs: [] as NgParselFieldDecorator[],
  };

  for (let i = 0; i < decoratorPropertyDecorator.length; i++) {
    const decorator = decoratorPropertyDecorator[i].getText();
    const name = (decoratorPropertyDeclaration[i] as any)?.name?.getText();
    const type = (decoratorPropertyDeclaration[i] as any)?.type?.getText();
    const initializer = (decoratorPropertyDeclaration[i] as any)?.initializer?.getText();
    const field = `${decorator} ${name}${type ? ': ' + type : ' = ' + initializer}`;

    const componentDecorator = {
      decorator,
      name,
      type,
      initializer,
      field,
    };

    if (decorator.startsWith('@Inp')) {
      inputsAndOutputs.inputs.push(componentDecorator);
    }

    if (decorator.startsWith('@Out')) {
      inputsAndOutputs.outputs.push(componentDecorator);
    }
  }
  return inputsAndOutputs;
}
