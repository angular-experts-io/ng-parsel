import * as ts from 'typescript';
import { tsquery } from '@phenomnomnominal/tsquery';

import { NgParselFieldDecorator } from '../model/decorator.model.js';

export function parseInputsAndOutputs(ast: ts.SourceFile): {
  inputs: NgParselFieldDecorator[];
  outputs: NgParselFieldDecorator[];
} {
  const parsedPropertyDeclarations = parseDecoratedPropertyDeclarations(ast);
  return {
    inputs: [...parseDecoratedSetters(ast), ...parsedPropertyDeclarations.inputs, ...parseSignalInputs(ast)],
    outputs: [...parsedPropertyDeclarations.outputs, ...parseNewOutputAPI(ast)],
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

function parseSignalInputs(ast: ts.SourceFile): NgParselFieldDecorator[] {
  const inputNodes = [...tsquery(ast, 'PropertyDeclaration:has(CallExpression [name="input"])')];
  const signalInputs: NgParselFieldDecorator[] = [];

  function isRequiredSingalInput(file: string): boolean {
    return [...tsquery(file, 'CallExpression > PropertyAccessExpression > Identifier')].length > 1;
  }

  inputNodes.forEach((input) => {
    const field = input.getText();
    const required = isRequiredSingalInput(field);

    const name = [...tsquery(field, 'BinaryExpression > Identifier')][0]?.getText() || '';
    const initialValue =
      [
        ...tsquery(
          field,
          'CallExpression > :matches(NullKeyword, ObjectLiteralExpression, ArrayLiteralExpression, TrueKeyword, FalseKeyword, StringLiteral, Identifier[name=undefined])'
        ),
      ][0]?.getText() || '';
    const type = (required && [...tsquery(field, 'CallExpression > *:last-child')][0]?.getText()) || '';

    if (required) {
      signalInputs.push({
        decorator: 'input',
        required,
        name,
        type,
        field,
      });
    } else {
      signalInputs.push({
        decorator: 'input',
        required,
        name,
        initialValue,
        field,
      });
    }
  });

  return signalInputs;
}

function parseNewOutputAPI(ast: ts.SourceFile): NgParselFieldDecorator[] {
  const outputNodes = [...tsquery(ast, 'PropertyDeclaration:has(CallExpression:has([name="output"]))')];
  const outPutnodesFromObservable = [
    ...tsquery(ast, 'PropertyDeclaration:has(CallExpression:has([name="outputFromObservable"]))'),
  ];

  const outputs: NgParselFieldDecorator[] = [];

  [...outputNodes, ...outPutnodesFromObservable].forEach((node) => {
    const field = node.getText();

    const isObservableOutput = [...tsquery(field, 'CallExpression:has([name="outputFromObservable"])')].length > 0;
    const name = [...tsquery(field, 'BinaryExpression > Identifier')][0]?.getText() || '';
    const type = [...tsquery(field, 'CallExpression > *:last-child')][0]?.getText() || '';

    if (isObservableOutput) {
      outputs.push({
        decorator: 'outputFromObservable',
        name,
        field,
      });
    } else {
      outputs.push({
        decorator: 'output',
        name,
        type,
        field,
      });
    }
  });

  return outputs;
}
