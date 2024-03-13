import * as ts from 'typescript';
import { tsquery } from '@phenomnomnominal/tsquery';

import { NgParselDecoratorProperties } from '../model/decorator.model.js';

export function getDecoratorProperties(ast: ts.SourceFile): NgParselDecoratorProperties {
  const componentDecorators = tsquery(ast, 'Decorator > CallExpression > ObjectLiteralExpression > PropertyAssignment');

  return componentDecorators.reduce((decorators: any, propertyAssignment: any) => {
    const propertyName = propertyAssignment.name.escapedText;
    decorators[propertyName] = propertyAssignment.initializer.text;
    return decorators;
  }, {});
}
