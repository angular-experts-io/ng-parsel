import { readFileSync } from 'fs';
import * as ts from 'typescript';

import { parseClassName } from '../shared/parser/class.parser.js';
import { NgParselOutputType } from '../shared/model/types.model.js';

import { NgParselSpec } from './spec.model.js';

export function parseSpec(ast: ts.SourceFile, specFilePath: string): NgParselSpec {
  return {
    className: parseClassName(ast),
    type: NgParselOutputType.SPEC,
    implementation: readFileSync(specFilePath, 'utf8').toString(),
  };
}
