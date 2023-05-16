import * as ts from 'typescript';

import { NgParselOutputType } from '../shared/model/types.model.js';
import { parseClassName } from '../shared/parser/class.parser.js';
import { parseExplicitPublicMethods } from '../shared/parser/method.parser.js';

import { NgParselService } from './service.model.js';

export function parseService(ast: ts.SourceFile, filePath: string): NgParselService {
  return {
    type: NgParselOutputType.SERVICE,
    className: parseClassName(ast),
    filePath,
    methodsPublicExplicit: parseExplicitPublicMethods(ast),
  };
}
