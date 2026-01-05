import * as ts from 'typescript';
import { tsquery } from '@phenomnomnominal/tsquery';

export function isCva(ast: ts.SourceFile): boolean {
  return (
    tsquery(ast, 'HeritageClause > ExpressionWithTypeArguments > Identifier:has([escapedText="ControlValueAccessor"])')
      .length > 0
  );
}
