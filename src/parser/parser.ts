import { tsquery } from '@phenomnomnominal/tsquery';
import { readFileSync } from 'fs';
import glob from 'glob';

import { investigateType } from '../investigator/investigator.js';
import { generateSpinner } from '../utils/spinner.util.js';

import { parseSpec } from './spec/spec.parser.js';
import { parsePipe } from './pipe/pipe.parser.js';
import { parseModule } from './module/module.parser.js';
import { parseDirective } from './directive/directive.parser.js';
import { parseComponent } from './component/component.parser.js';
import { NgParselOutputType } from './shared/model/types.model.js';
import { NgParselConfig } from '../config/config.model.js';
import { NgParselComponent } from './component/component.model.js';
import { NgParselModule } from './module/module.model.js';
import { NgParselDirective } from './directive/directive.model.js';
import { NgParselHarness } from './harness/harness.model.js';
import { NgParselSpec } from './spec/spec.model.js';
import { NgParselPipe } from './pipe/pipe.model.js';
import { parseHarnesses } from './harness/harness.parser.js';
import { parseValidator } from './validator/validator.parser.js';
import { NgParselValidator } from './validator/validator.model.js';
import { NgParselService } from './services/service.model.js';
import { parseService } from './services/service.parser.js';
import { NgParselOutput } from './parse-output.model.js';

export function parse(configuration: NgParselConfig): NgParselOutput {
  const directoryGlob = `${configuration.src}/**/*.{ts,html,scss,css,less}`;

  let ngParselComponents: NgParselComponent[] = [],
    ngParselSpecs: NgParselSpec[] = [],
    ngParselValidators: NgParselValidator[] = [],
    ngParselHarnesses: NgParselHarness[] = [],
    ngParselPipes: NgParselPipe[] = [],
    ngParselModules: NgParselModule[] = [],
    ngParselDirectives: NgParselDirective[] = [],
    ngParselServices: NgParselService[] = [];

  const parseSpinner = generateSpinner('Parsing files');
  try {
    parseSpinner.start();

    glob.sync(directoryGlob).forEach((filePath) => {
      const source = readFileSync(filePath, 'utf8');
      const ast = tsquery.ast(source);
      const componentType = investigateType(ast, filePath);

      if (configuration.parseComponents && componentType === NgParselOutputType.COMPONENT) {
        ngParselComponents.push(parseComponent(ast, filePath));
      }

      if (configuration.parseServices && componentType === NgParselOutputType.SERVICE) {
        ngParselServices.push(parseService(ast, filePath));
      }

      if (configuration.parseSpecs && componentType === NgParselOutputType.SPEC) {
        ngParselSpecs.push(parseSpec(ast, filePath));
      }

      if (configuration.parseHarnesses && componentType === NgParselOutputType.HARNESS) {
        ngParselHarnesses.push(parseHarnesses(ast, filePath));
      }

      if (configuration.parseValidators && componentType === NgParselOutputType.VALIDATOR) {
        ngParselValidators.push(parseValidator(ast, filePath));
      }

      if (configuration.parseModules && componentType === NgParselOutputType.MODULE) {
        ngParselModules.push(parseModule(ast, filePath));
      }

      if (configuration.parseDirectives && componentType === NgParselOutputType.DIRECTIVE) {
        ngParselDirectives.push(parseDirective(ast, filePath));
      }

      if (configuration.parsePipes && componentType === NgParselOutputType.PIPE) {
        ngParselPipes.push(parsePipe(ast, filePath));
      }
    });
    parseSpinner.succeed('Files successfully parsed');
  } catch (e) {
    parseSpinner.fail(`Failed to parse files: ${e}`);
  }

  return {
    ngParselComponents,
    ngParselServices,
    ngParselDirectives,
    ngParselModules,
    ngParselSpecs,
    ngParselHarnesses,
    ngParselPipes,
    ngParselValidators,
  };
}
