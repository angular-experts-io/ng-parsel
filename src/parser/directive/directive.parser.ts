import { readFileSync } from 'fs';
import * as ts from 'typescript';

import { isCva } from '../shared/parser/cva.parser.js';
import { NgParselOutputType } from '../shared/model/types.model.js';
import { parseInputsAndOutputs } from '../shared/parser/field-decorator.parser.js';
import { getDecoratorProperties } from '../shared/parser/decorator.parser.js';
import { parseExplicitPublicFields } from '../shared/parser/field.parser.js';
import { parseClassName, parseClassJsDoc } from '../shared/parser/class.parser.js';
import { parseExplicitPublicMethods, parseMethods } from '../shared/parser/method.parser.js';

import { NgParselDirective } from './directive.model.js';
import { parseExtends } from '../shared/parser/extends.parser.js';

export function parseDirective(ast: ts.SourceFile, directiveFilePath: string): NgParselDirective {
  const directiveDecorators = getDecoratorProperties(ast);

  const directiveImplementation = readFileSync(directiveFilePath, 'utf8').toString();

  const inputsAndOutputs = parseInputsAndOutputs(ast);

  return {
    type: NgParselOutputType.DIRECTIVE,
    className: parseClassName(ast),
    filePath: directiveFilePath,
    selector: directiveDecorators.selector as string,
    standalone: directiveDecorators.standalone || false,
    extends: parseExtends(ast),
    cva: isCva(ast),
    implementation: directiveImplementation,
    inputs: inputsAndOutputs.inputs,
    outputs: inputsAndOutputs.outputs,
    methods: parseMethods(ast),
    methodsPublicExplicit: parseExplicitPublicMethods(ast),
    fieldsPublicExplicit: parseExplicitPublicFields(ast),
    classJsDoc: parseClassJsDoc(ast),
  };
}
