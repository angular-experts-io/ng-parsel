import * as ts from 'typescript';

import { parseClassName } from '../shared/parser/class.parser.js';
import { NgParselOutputType } from '../shared/model/types.model.js';
import { parseExplicitPublicMethods } from '../shared/parser/method.parser.js';

import { NgParselValidtor } from './validator.model.js';

export function parseValidator(ast: ts.SourceFile): NgParselValidtor {
  return {
    className: parseClassName(ast),
    type: NgParselOutputType.VALIDATOR,
    methodsPublicExplicit: parseExplicitPublicMethods(ast),
  };
}
