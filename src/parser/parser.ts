import { tsquery } from '@phenomnomnominal/tsquery';
import { existsSync, mkdirSync, readFileSync } from 'fs';
import glob from 'glob';

import { investigateType } from '../investigator/investigator.js';
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
import { generateSpinner } from '../utils/spinner.util.js';
import { writeJson } from '../utils/write.util.js';
import { parseHarnesses } from './harness/harness.parser.js';
import { parseValidator } from './validator/validator.parser.js';
import { NgParselValidtor } from './validator/validator.model.js';

export function parse(configuration: NgParselConfig): void {
  const directoryGlob = `${configuration.src}/**/*.{ts,html,scss,css,less}`;

  let ngParselComponents: NgParselComponent[] = [],
    ngParselSpecs: NgParselSpec[] = [],
    ngParselValidators: NgParselValidtor[] = [],
    ngParselHarnesses: NgParselHarness[] = [],
    ngParselPipes: NgParselPipe[] = [],
    ngParselModules: NgParselModule[] = [],
    ngParselDirectives: NgParselDirective[] = [];

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

      if (configuration.parseSpecs && componentType === NgParselOutputType.SPEC) {
        ngParselSpecs.push(parseSpec(ast, filePath));
      }

      if (configuration.parseSpecs && componentType === NgParselOutputType.HARNESS) {
        ngParselHarnesses.push(parseHarnesses(ast));
      }

      if (configuration.parseValidators && componentType === NgParselOutputType.VALIDATOR) {
        ngParselValidators.push(parseValidator(ast));
      }

      if (configuration.parseModules && componentType === NgParselOutputType.MODULE) {
        ngParselModules.push(parseModule(ast));
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

  const writeOutputSpinner = generateSpinner('Write output files');
  try {
    writeOutputSpinner.start();

    writeOutputFiles(
      configuration,
      ngParselComponents,
      ngParselDirectives,
      ngParselModules,
      ngParselSpecs,
      ngParselHarnesses,
      ngParselPipes,
      ngParselValidators
    );

    writeOutputSpinner.succeed(`Files successfully written to ${configuration.out}`);
  } catch (e) {
    writeOutputSpinner.fail(`Failed to write output files: ${e}`);
  }
}

function writeOutputFiles(
  config: NgParselConfig,
  ngParselComponents: NgParselComponent[],
  ngParselDirectives: NgParselDirective[],
  ngParselModules: NgParselModule[],
  ngParselSpecs: NgParselSpec[],
  ngParselHarnesses: NgParselHarness[],
  ngParselPipes: NgParselPipe[],
  ngParselValidators: NgParselValidtor[]
): void {
  if (!existsSync(config.out as string)) {
    mkdirSync(config.out as string, { recursive: true });
  }

  if (config.singleFile) {
    writeJson(`${config.out}/ng-parsel.json`, [
      ...ngParselComponents,
      ...ngParselModules,
      ...ngParselDirectives,
      ...ngParselSpecs,
      ...ngParselHarnesses,
      ...ngParselPipes,
      ...ngParselValidators,
    ]);
  } else {
    if (ngParselComponents.length > 0) {
      writeJson(`${config.out}/ng-parsel-components.json`, ngParselComponents);
    }

    if (ngParselModules.length > 0) {
      writeJson(`${config.out}/ng-parsel-modules.json`, ngParselModules);
    }

    if (ngParselDirectives.length > 0) {
      writeJson(`${config.out}/ng-parsel-directives.json`, ngParselDirectives);
    }

    if (ngParselPipes.length > 0) {
      writeJson(`${config.out}/ng-parsel-pipes.json`, ngParselPipes);
    }

    if (ngParselSpecs.length > 0) {
      writeJson(`${config.out}/ng-parsel-specs.json`, ngParselSpecs);
    }

    if (ngParselHarnesses.length > 0) {
      writeJson(`${config.out}/ng-parsel-harnesses.json`, ngParselHarnesses);
    }

    if (ngParselValidators.length > 0) {
      writeJson(`${config.out}/ng-parsel-validators.json`, ngParselValidators);
    }
  }
}
