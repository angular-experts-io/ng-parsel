import { tsquery } from '@phenomnomnominal/tsquery';
import { existsSync, mkdirSync, readFileSync } from 'fs';
import * as glob from 'glob';

import { investigateType } from '../investigator/investigator';
import { parseSpec } from './spec/spec.parser';
import { parsePipe } from './pipe/pipe.parser';
import { parseModule } from './module/module.parser';
import { parseDirective } from './directive/directive.parser';
import { parseComponent } from './component/component.parser';
import { NgParselOutputType } from './shared/model/types.model';
import { NgParselConfig } from '../config/config.model';
import { NgParselComponent } from './component/component.model';
import { NgParselModule } from './module/module.model';
import { NgParselDirective } from './directive/directive.model';
import { NgParselHarness } from './harness/harness.model';
import { NgParselSpec } from './spec/spec.model';
import { NgParselPipe } from './pipe/pipe.model';
import { generateSpinner } from '../utils/spinner.util';
import { writeJson } from '../utils/write.util';
import { parseHarnesses } from './harness/harness.parser';

export function parse(configuration: NgParselConfig): void {
  const directoryGlob = `${configuration.src}/**/*.{ts,html,scss,css,less}`;

  let ngParselComponents: NgParselComponent[] = [],
    ngParselSpecs: NgParselSpec[] = [],
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
        ngParselSpecs.push(parseSpec(filePath));
      }

      if (configuration.parseSpecs && componentType === NgParselOutputType.HARNESS) {
        ngParselHarnesses.push(parseHarnesses(ast));
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
      ngParselPipes
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
  ngParselPipes: NgParselPipe[]
): void {
  if (config.singleFile) {
    if (!existsSync(config.out as string)) {
      mkdirSync(config.out as string, { recursive: true });
    }

    writeJson(`${config.out}/ng-parsel.json`, [
      ...ngParselComponents,
      ...ngParselModules,
      ...ngParselDirectives,
      ...ngParselSpecs,
      ...ngParselHarnesses,
      ...ngParselPipes,
    ]);
  } else {
    if (ngParselComponents.length > 0) {
      writeJson(`${config.out}/ng-parsel-component.json`, ngParselComponents);
    }

    if (ngParselModules.length > 0) {
      writeJson(`${config.out}/ng-parsel-module.json`, ngParselModules);
    }

    if (ngParselDirectives.length > 0) {
      writeJson(`${config.out}/ng-parsel-directive.json`, ngParselDirectives);
    }

    if (ngParselPipes.length > 0) {
      writeJson(`${config.out}/ng-parsel-pipe.json`, ngParselPipes);
    }

    if (ngParselSpecs.length > 0) {
      writeJson(`${config.out}/ng-parsel-spec.json`, ngParselSpecs);
    }

    if (ngParselHarnesses.length > 0) {
      writeJson(`${config.out}/ng-parsel-harnesses.json`, ngParselHarnesses);
    }
  }
}
