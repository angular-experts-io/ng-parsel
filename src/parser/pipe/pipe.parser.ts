import * as ts from 'typescript';

import { getDecoratorProperties } from '../shared/parser/decorator.parser';
import { NgParselOutputType } from '../shared/model/types.model';
import { parseClassName } from '../shared/parser/class.parser';

import { NgParselPipe } from './pipe.model';
import { readFileSync } from 'fs';

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
