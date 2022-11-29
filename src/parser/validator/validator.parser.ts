import * as ts from 'typescript';

import { parseClassName } from '../shared/parser/class.parser';
import { NgParselOutputType } from '../shared/model/types.model';
import { parseExplicitPublicMethods } from '../shared/parser/method.parser';

import { NgParselValidtor } from './validator.model';

export function parseValidator(ast: ts.SourceFile): NgParselValidtor {
  return {
    className: parseClassName(ast),
    type: NgParselOutputType.VALIDATOR,
    methods: parseExplicitPublicMethods(ast),
  };
}
