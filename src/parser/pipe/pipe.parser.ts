import * as ts from 'typescript';
import { readFileSync } from 'fs';

import { parseClassName } from '../shared/parser/class.parser.js';
import { NgParselOutputType } from '../shared/model/types.model.js';
import { getDecoratorProperties } from '../shared/parser/decorator.parser.js';

import { NgParselPipe } from './pipe.model.js';

export function parsePipe(ast: ts.SourceFile, componentFilePath: string): NgParselPipe {
  const pipeDecorators = getDecoratorProperties(ast);
  const pipeImplementation = readFileSync(componentFilePath, 'utf8').toString();

  return {
    type: NgParselOutputType.PIPE,
    className: parseClassName(ast),
    name: pipeDecorators.name as string,
    pure: pipeDecorators.pure || true,
    standalone: pipeDecorators.standalone || false,
    implementation: pipeImplementation,
  };
}
