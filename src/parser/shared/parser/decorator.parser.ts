import * as ts from 'typescript';
import { tsquery } from '@phenomnomnominal/tsquery';

import { NgParselDecoratorProperties } from '../model/decorator.model.js';

const booleanDecoratorProps = ['standalone', 'pure'];

export function getDecoratorProperties(ast: ts.SourceFile): NgParselDecoratorProperties {
  const decoratorQuery = 'Decorator > CallExpression > ObjectLiteralExpression > PropertyAssignment';
  const componentDecorators = tsquery(ast, decoratorQuery);

  return componentDecorators.reduce((decorators: any, propertyAssignment: any) => {
    const propertyName = propertyAssignment.name.escapedText;

    if (propertyName === 'styleUrls' || propertyName === 'styles') {
      const styleTokens = tsquery(ast, `${decoratorQuery} > ArrayLiteralExpression > StringLiteral`);
      decorators[propertyName] = styleTokens.map((token) => token.getText().replace(/'/g, ''));
      return decorators;
    }

    if (booleanDecoratorProps.includes(propertyName)) {
      decorators[propertyName] = propertyAssignment.initializer.getText() === 'true';
      return decorators;
    }

    decorators[propertyName] = propertyAssignment.initializer.text;
    return decorators;
  }, {});
}
