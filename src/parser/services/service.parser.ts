import * as ts from 'typescript';

import { parseExtends } from '../shared/parser/extends.parser.js';
import { NgParselOutputType } from '../shared/model/types.model.js';
import { parseExplicitPublicFields } from '../shared/parser/field.parser.js';
import { parseClassName, parseClassJsDoc } from '../shared/parser/class.parser.js';
import { parseExplicitPublicMethods, parseMethods } from '../shared/parser/method.parser.js';

import { NgParselService } from './service.model.js';

export function parseService(ast: ts.SourceFile, filePath: string): NgParselService {
  return {
    type: NgParselOutputType.SERVICE,
    className: parseClassName(ast),
    extends: parseExtends(ast),
    filePath,
    fieldsPublicExplicit: parseExplicitPublicFields(ast),
    methods: parseMethods(ast),
    methodsPublicExplicit: parseExplicitPublicMethods(ast),
    classJsDoc: parseClassJsDoc(ast),
  };
}
