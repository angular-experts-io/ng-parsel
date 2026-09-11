import * as ts from 'typescript';
import { tsquery } from '@phenomnomnominal/tsquery';

import { NgParselFieldDecorator } from '../model/decorator.model.js';

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

export function parseInputsAndOutputs(ast: ts.SourceFile): {
  inputs: NgParselFieldDecorator[];
  outputs: NgParselFieldDecorator[];
} {
  const parsedPropertyDeclarations = parseDecoratedPropertyDeclarations(ast);
  return {
    inputs: [...parseDecoratedSetters(ast), ...parsedPropertyDeclarations.inputs, ...parseSignalInputsAndModels(ast)],
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

    const jsDoc = extractJSDocComment(decoratedSetters[i]);

    inputSetters.push({
      decorator: '@Input()',
      name,
      type,
      field: decoratedSetters[i]?.getText() || '',
      jsDoc,
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

    const jsDoc = extractJSDocComment(decoratorPropertyDeclaration[i]!);

    const componentDecorator = {
      decorator: decorator as string,
      name,
      type,
      initializer,
      field,
      jsDoc,
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

const SIGNAL_TYPE_ARGUMENT_KINDS = new Set<ts.SyntaxKind>([
  ts.SyntaxKind.BooleanKeyword,
  ts.SyntaxKind.AnyKeyword,
  ts.SyntaxKind.TypeReference,
  ts.SyntaxKind.StringKeyword,
  ts.SyntaxKind.LiteralType,
  ts.SyntaxKind.TypeLiteral,
  ts.SyntaxKind.NullKeyword,
  ts.SyntaxKind.UndefinedKeyword,
  ts.SyntaxKind.ArrayType,
  ts.SyntaxKind.UnionType,
  ts.SyntaxKind.IntersectionType,
]);

/**
 * Determines whether the signal factory of a property initializer is a required factory,
 * meaning `input.required()` or `model.required()`.
 */
function isRequiredSignalFactory(callee: ts.LeftHandSideExpression): boolean {
  return ts.isPropertyAccessExpression(callee) && callee.name.getText() === 'required';
}

/**
 * Returns the name of the signal factory, meaning `input` or `model`,
 * no matter whether the required or the optional factory is used.
 */
function signalFactoryName(callee: ts.LeftHandSideExpression): string {
  return ts.isPropertyAccessExpression(callee) ? callee.expression.getText() : callee.getText();
}

/**
 * Reads the alias from the top level of the given options object literal.
 * Nested object literals, for example inside a transform, are ignored.
 */
function extractAlias(optionsArgument: ts.Expression | undefined): string | undefined {
  if (!optionsArgument || !ts.isObjectLiteralExpression(optionsArgument)) {
    return undefined;
  }

  const aliasProperty = optionsArgument.properties.find(
    (property) => ts.isPropertyAssignment(property) && property.name.getText().replace(/["']/g, '') === 'alias',
  ) as ts.PropertyAssignment | undefined;

  if (!aliasProperty || !ts.isStringLiteralLike(aliasProperty.initializer)) {
    return undefined;
  }

  return aliasProperty.initializer.text;
}

function parseSignalInputsAndModels(ast: ts.SourceFile): NgParselFieldDecorator[] {
  const inputNodes = [
    ...tsquery(
      ast,
      'PropertyDeclaration[initializer.expression.name="model"], PropertyDeclaration[initializer.expression.name="input"], PropertyDeclaration[initializer.expression.expression.name="model"], PropertyDeclaration[initializer.expression.expression.name="input"]',
    ),
  ] as ts.PropertyDeclaration[];
  const signalInputs: NgParselFieldDecorator[] = [];

  inputNodes.forEach((input) => {
    const field = input.getText();
    const initializer = input.initializer;

    if (!initializer || !ts.isCallExpression(initializer)) {
      return;
    }

    const required = isRequiredSignalFactory(initializer.expression);
    const decorator = signalFactoryName(initializer.expression);

    const name = input.name.getText();
    // The required factory only takes options, the optional factory takes the initial value first.
    const optionsArgument = required ? initializer.arguments[0] : initializer.arguments[1];
    const alias = extractAlias(optionsArgument);

    const type =
      [...(initializer.typeArguments ?? []), ...initializer.arguments]
        .find((node) => SIGNAL_TYPE_ARGUMENT_KINDS.has(node.kind))
        ?.getText() || 'inferred';

    const jsDoc = extractJSDocComment(input);

    if (required) {
      signalInputs.push({
        decorator,
        required,
        name: alias || name,
        type,
        field,
        jsDoc,
      });
    } else {
      signalInputs.push({
        decorator,
        required,
        initialValue: initializer.arguments[0]?.getText() ?? '',
        name: alias || name,
        type,
        field,
        jsDoc,
      });
    }
  });

  return signalInputs;
}

function parseNewOutputAPI(ast: ts.SourceFile): NgParselFieldDecorator[] {
  // First, try to find JSDoc comments directly in the source file
  const fullText = ast.getFullText();
  const jsDocRegex = /\/\*\*([\s\S]*?)\*\//g;
  const jsDocMatches: { [key: string]: string } = {};

  let match;
  while ((match = jsDocRegex.exec(fullText)) !== null) {
    // Find the next non-whitespace character after the JSDoc comment
    let nextNonWhitespace = match.index + match[0].length;
    while (nextNonWhitespace < fullText.length && /\s/.test(fullText[nextNonWhitespace]!)) {
      nextNonWhitespace++;
    }

    // Extract the field name if it's followed by an output declaration
    if (nextNonWhitespace < fullText.length) {
      const remainingText = fullText.substring(nextNonWhitespace);
      const outputMatch = /(\w+)\s*=\s*output/.exec(remainingText);
      if (outputMatch) {
        jsDocMatches[outputMatch[1]!] = match[0];
      }
    }
  }

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

    // Try to get JSDoc from our map first, then fall back to extractJSDocComment
    let jsDoc = jsDocMatches[name];
    if (!jsDoc) {
      jsDoc = extractJSDocComment(node);
    }

    if (isObservableOutput) {
      outputs.push({
        decorator: 'outputFromObservable',
        name,
        field,
        jsDoc,
      });
    } else {
      outputs.push({
        decorator: 'output',
        name,
        type,
        field,
        jsDoc,
      });
    }
  });

  return outputs;
}
