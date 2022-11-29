import * as ts from 'typescript';

import { NgParselOutputType } from '../shared/model/types.model';
import { parseExplicitPublicMethods } from '../shared/parser/method.parser';
import { parseClassName } from '../shared/parser/class.parser';

import { NgParselHarness } from './harness.model';

export function parseHarnesses(ast: ts.SourceFile): NgParselHarness {
  return {
    className: parseClassName(ast),
    type: NgParselOutputType.HARNESS,
    methodsPublicExplicit: parseExplicitPublicMethods(ast),
  };
}
