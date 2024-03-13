import * as ts from 'typescript';
import { tsquery } from '@phenomnomnominal/tsquery';

import { NgParselFieldDecorator } from '../model/decorator.model.js';

export function parseInputsAndOutputs(ast: ts.SourceFile): {
  inputs: NgParselFieldDecorator[];
  outputs: NgParselFieldDecorator[];
} {
  return parseDecorators(ast);
}

function parseDecorators(ast: ts.SourceFile): {
  inputs: NgParselFieldDecorator[];
  outputs: NgParselFieldDecorator[];
} {
  const parsedPropertyDeclarations = parseDecoratedPropertyDeclarations(ast);
  return {
    inputs: [...parseDecoratedSetters(ast), ...parsedPropertyDeclarations.inputs],
    outputs: [...parsedPropertyDeclarations.outputs],
  };
}

function parseDecoratedSetters(ast: ts.SourceFile): NgParselFieldDecorator[] {
  const decoratedSetters = [...tsquery(ast, 'SetAccessor:has(Decorator)')];
  const decoratedSettersPropertyDeclaration = [...tsquery(ast, 'SetAccessor:has(Decorator) > Decorator')];

  const inputSetters = [];

  for (let i = 0; i < decoratedSetters.length; i++) {
    const decoratorName = decoratedSettersPropertyDeclaration[i]?.getText();

    if (!decoratorName?.startsWith('@Input')) {
      continue;
    }

    const name = (decoratedSetters[i] as any)?.name?.getText();
    const type = (decoratedSetters[i] as any)?.parameters[0]?.type?.getText();

    inputSetters.push({
      decorator: '@Input()',
      name,
      type,
      field: decoratedSetters[i]?.getText() || '',
    });
  }

  return inputSetters;
}

function parseDecoratedPropertyDeclarations(ast: ts.SourceFile): {
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
    const decorator = decoratorPropertyDecorator[i]?.getText();
    const name = (decoratorPropertyDeclaration[i] as any)?.name?.getText();
    const type = (decoratorPropertyDeclaration[i] as any)?.type?.getText();
    const initializer = (decoratorPropertyDeclaration[i] as any)?.initializer?.getText();
    const field = `${decorator} ${name}${type ? ': ' + type : ' = ' + initializer}`;

    const componentDecorator = {
      decorator: decorator as string,
      name,
      type,
      initializer,
      field,
    };

    if (decorator?.startsWith('@Inp')) {
      inputsAndOutputs.inputs.push(componentDecorator);
    }

    if (decorator?.startsWith('@Out')) {
      inputsAndOutputs.outputs.push(componentDecorator);
    }
  }
  return inputsAndOutputs;
}
