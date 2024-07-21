import chalk from 'chalk';
import { existsSync, mkdirSync } from 'fs';

import { printWelcomeMessage } from '../utils/welcome.util.js';
import { parse } from '../parser/parser.js';
import { generateSpinner } from '../utils/spinner.util.js';
import { NgParselConfig } from '../config/config.model.js';
import { NgParselComponent } from '../parser/component/component.model.js';
import { NgParselService } from '../parser/services/service.model.js';
import { NgParselDirective } from '../parser/directive/directive.model.js';
import { NgParselModule } from '../parser/module/module.model.js';
import { NgParselSpec } from '../parser/spec/spec.model.js';
import { NgParselHarness } from '../parser/harness/harness.model.js';
import { NgParselPipe } from '../parser/pipe/pipe.model.js';
import { NgParselValidtor } from '../parser/validator/validator.model.js';
import { writeJson } from '../utils/write.util.js';
import { NgParselOutput } from '../parser/parse-output.model.js';
import { loadAndMergeConfig } from '../utils/config.util.js';

export function parseCommand(cliArgs: { [key: string]: string }) {
  printWelcomeMessage();

  const config = loadAndMergeConfig(cliArgs);

  // TODO: clean this up later
  config['src'] = './test-spa';

  const parseOutput = parse(config);
  writeParsedOutputToDisk(config, parseOutput);

  console.log(chalk.magenta('===================================='));
}

function writeParsedOutputToDisk(config: NgParselConfig, parseOutput: NgParselOutput) {
  const writeOutputSpinner = generateSpinner('Write output files');
  try {
    writeOutputSpinner.start();

    writeOutputFiles(
      config,
      parseOutput.ngParselComponents,
      parseOutput.ngParselServices,
      parseOutput.ngParselDirectives,
      parseOutput.ngParselModules,
      parseOutput.ngParselSpecs,
      parseOutput.ngParselHarnesses,
      parseOutput.ngParselPipes,
      parseOutput.ngParselValidators
    );

    writeOutputSpinner.succeed(`Files successfully written to ${config.out}`);
  } catch (e) {
    writeOutputSpinner.fail(`Failed to write output files: ${e}`);
  }
}

function writeOutputFiles(
  config: NgParselConfig,
  ngParselComponents: NgParselComponent[],
  ngParselServices: NgParselService[],
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
      ...ngParselServices,
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

    if (ngParselServices.length > 0) {
      writeJson(`${config.out}/ng-parsel-services.json`, ngParselServices);
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
