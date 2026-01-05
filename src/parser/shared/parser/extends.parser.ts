import * as ts from 'typescript';
import { tsquery } from '@phenomnomnominal/tsquery';

export function parseExtends(ast: ts.SourceFile): string | undefined {
  // Find identifiers used in extends heritage clauses
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const identifiers = tsquery(ast, 'HeritageClause > ExpressionWithTypeArguments > Identifier') as any[];

  for (const id of identifiers) {
    const heritageClause = (id.parent as any)?.parent as ts.HeritageClause | undefined;
    if (!heritageClause) continue;

    if (heritageClause.token === ts.SyntaxKind.ExtendsKeyword) {
      return id.getText();
    }
  }

  return undefined;
}
