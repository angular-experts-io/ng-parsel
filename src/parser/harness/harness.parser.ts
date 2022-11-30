import * as ts from 'typescript';

import { parseExplicitPublicMethods } from '../shared/parser/method.parser.js';
import { NgParselOutputType } from '../shared/model/types.model.js';
import { parseClassName } from '../shared/parser/class.parser.js';

import { NgParselHarness } from './harness.model.js';

export function parseHarnesses(ast: ts.SourceFile, harnessFilePath: string): NgParselHarness {
  return {
    className: parseClassName(ast),
    type: NgParselOutputType.HARNESS,
    filePath: harnessFilePath,
    methodsPublicExplicit: parseExplicitPublicMethods(ast),
  };
}
