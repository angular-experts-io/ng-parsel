import { tsquery } from '@phenomnomnominal/tsquery';
import { readFileSync } from 'fs';
import * as glob from 'glob';

import { investigateType } from './investigator';
import { parseSpec } from './parser/spec/spec.parser';
import { parsePipe } from './parser/pipe/pipe.parser';
import { parseModule } from './parser/module/module.parser';
import { parseDirective } from './parser/directive/directive.parser';
import { parseComponent } from './parser/component/component.parser';
import { NgParselBuildingBlockType } from './parser/shared/model/types.model';

export function parse(directory: string) {
  const directoryGlob = `${directory}/**/*.{ts,html,scss,css,less}`;
  glob.sync(directoryGlob).forEach((filePath) => {
    const source = readFileSync(filePath, 'utf8');
    const ast = tsquery.ast(source);
    const componentType = investigateType(ast, filePath);

    if (componentType === NgParselBuildingBlockType.COMPONENT) {
      console.log(parseComponent(ast, filePath));
    }

    if (componentType === NgParselBuildingBlockType.SPEC) {
      console.log(parseSpec(ast, filePath));
    }

    if (componentType === NgParselBuildingBlockType.MODULE) {
      console.log(parseModule(ast));
    }

    if (componentType === NgParselBuildingBlockType.DIRECTIVE) {
      console.log(parseDirective(ast, filePath));
    }

    if (componentType === NgParselBuildingBlockType.PIPE) {
      console.log(parsePipe(ast, filePath));
    }
  });
}
