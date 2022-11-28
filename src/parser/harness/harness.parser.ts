import * as ts from 'typescript';

import { NgParselHarness } from './harness.model';
import { NgParselOutputType } from '../shared/model/types.model';
import { parseExplicitPublicMethods } from '../shared/parser/method.parser';

export function parseHarnesses(ast: ts.SourceFile): NgParselHarness {
  return {
    type: NgParselOutputType.HARNESS,
    methods: parseExplicitPublicMethods(ast),
  };
}
