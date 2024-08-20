import * as ts from 'typescript';
import { tsquery } from '@phenomnomnominal/tsquery';

import { NgParselField } from '../model/field.model.js';

export function parseExplicitPublicFields(ast: ts.SourceFile): NgParselField[] {
  const fieldsExplicitPublic: NgParselField[] = [];

  const publicFields = tsquery(ast, 'PropertyDeclaration:has(PublicKeyword)');

  publicFields.forEach((field) => {
    const nameNode = tsquery(field.getText(), 'Identifier')[0];
    let typeNode = null;
    const valueNode =
      tsquery(field.getText(), 'CallExpression')[0] ||
      tsquery(
        field.getText(),
        'NewExpression:has(NullKeyword, ObjectLiteralExpression, ArrayLiteralExpression, TrueKeyword, FalseKeyword, StringLiteral, Identifier[name=undefined], NumericLiteral, TemplateExpression, NoSubstitutionTemplateLiteral)'
      )[0] ||
      tsquery(
        field.getText(),
        'NullKeyword, ObjectLiteralExpression, ArrayLiteralExpression, TrueKeyword, FalseKeyword, StringLiteral, Identifier[name=undefined], NumericLiteral, TemplateExpression, NoSubstitutionTemplateLiteral'
      )[0];

    if (!valueNode) {
      typeNode =
        tsquery(field.getText(), 'TypeReference')[0] ||
        tsquery(field.getText(), 'NewExpression')[0] ||
        tsquery(field.getText(), 'CallExpression')[0];
    }

    fieldsExplicitPublic.push({
      name: nameNode!.getText(),
      type: typeNode?.getText().replace('new ', '').replace('()', '') || 'inferred',
      value: valueNode?.getText().replace('new ', '').replace('()', ''),
    });
  });

  return fieldsExplicitPublic;
}
