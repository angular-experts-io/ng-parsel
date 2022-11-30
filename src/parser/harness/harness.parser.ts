import * as ts from 'typescript';

import { parseExplicitPublicMethods } from '../shared/parser/method.parser.js';
import { NgParselOutputType } from '../shared/model/types.model.js';
import { parseClassName } from '../shared/parser/class.parser.js';

import { NgParselHarness } from './harness.model.js';

export function parseHarnesses(ast: ts.SourceFile): NgParselHarness {
  return {
    className: parseClassName(ast),
    type: NgParselOutputType.HARNESS,
    methodsPublicExplicit: parseExplicitPublicMethods(ast),
  };
}
