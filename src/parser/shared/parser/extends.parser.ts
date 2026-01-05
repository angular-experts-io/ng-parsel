import * as ts from 'typescript';
import { tsquery } from '@phenomnomnominal/tsquery';

export function parseExtends(ast: ts.SourceFile): string[] {
  const identifiers = tsquery(ast, 'HeritageClause > ExpressionWithTypeArguments > Identifier') as any[];

  const result: string[] = [];

  for (const id of identifiers) {
    // id.parent -> ExpressionWithTypeArguments
    // id.parent.parent -> HeritageClause
    const heritageClause = (id.parent as any)?.parent as ts.HeritageClause | undefined;
    if (!heritageClause) continue;

    if (heritageClause.token === ts.SyntaxKind.ExtendsKeyword) {
      result.push(id.getText());
    }
  }

  return result;
}
