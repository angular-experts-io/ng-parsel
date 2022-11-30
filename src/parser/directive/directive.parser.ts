import { readFileSync } from 'fs';
import * as ts from 'typescript';

import { parseClassName } from '../shared/parser/class.parser.js';
import { NgParselOutputType } from '../shared/model/types.model.js';
import { getDecoratorProperties } from '../shared/parser/decorator.parser.js';
import { parseInputsAndOutputs } from '../shared/parser/field-decorator.parser.js';

import { NgParselDirective } from './directive.model.js';

export function parseDirective(ast: ts.SourceFile, componentFilePath: string): NgParselDirective {
  const directiveDecorators = getDecoratorProperties(ast);

  const directiveImplementation = readFileSync(componentFilePath, 'utf8').toString();

  const inputsAndOutputs = parseInputsAndOutputs(ast);

  return {
    type: NgParselOutputType.DIRECTIVE,
    className: parseClassName(ast),
    selector: directiveDecorators.selector as string,
    standalone: directiveDecorators.standalone || false,
    implementation: directiveImplementation,
    inputs: inputsAndOutputs.inputs,
    outputs: inputsAndOutputs.outputs,
  };
}
