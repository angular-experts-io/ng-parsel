import * as ts from 'typescript';

import { parseClassName } from '../shared/parser/class.parser.js';
import { NgParselOutputType } from '../shared/model/types.model.js';
import { parseExplicitPublicMethods, parseMethods } from '../shared/parser/method.parser.js';

import { NgParselValidator } from './validator.model.js';

export function parseValidator(ast: ts.SourceFile, validatorFilePath: string): NgParselValidator {
  return {
    className: parseClassName(ast),
    filePath: validatorFilePath,
    type: NgParselOutputType.VALIDATOR,
    methods: parseMethods(ast),
    methodsPublicExplicit: parseExplicitPublicMethods(ast),
  };
}
