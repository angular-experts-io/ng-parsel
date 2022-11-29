import { readFileSync } from 'fs';
import * as ts from 'typescript';

import { NgParselOutputType } from '../shared/model/types.model';
import { parseClassName } from '../shared/parser/class.parser';

import { NgParselSpec } from './spec.model';

export function parseSpec(ast: ts.SourceFile, specFilePath: string): NgParselSpec {
  return {
    className: parseClassName(ast),
    type: NgParselOutputType.SPEC,
    implementation: readFileSync(specFilePath, 'utf8').toString(),
  };
}
