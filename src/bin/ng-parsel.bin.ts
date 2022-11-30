#!/usr/bin/env node
import chalk from 'chalk';
import { Command } from 'commander';
import { cosmiconfigSync } from 'cosmiconfig';

import { mergeOptionalConfigWithDefaults } from '../config/config.helper.js';
import { CONFIG_DEFAULT_VALUES } from '../config/config.model.js';
import { writeJson } from '../utils/write.util.js';
import { parse } from '../parser/parser.js';
import * as packageJson from '../../package.json' assert { type: 'json' };

const program = new Command();
const explorer = cosmiconfigSync('ng-parsel');

program.version(packageJson.default.version);

program
  .command('parse')
  .option('-s, --src', 'Glob pattern to search for files')
  .option('--components', 'Parse Components', true)
  .option('--pipes', 'Parse Pipes', true)
  .option('--modules', 'Parse Modules', true)
  .option('--directives', 'Parse Directives', true)
  .option('--harnesses', 'Parse Harnesses', true)
  .option('--specs', 'Parse Specs', true)
  .option('-o, --out <string>', 'Output directory for generated files')
  .option('--singleFile', 'Output in a single file')
  .action((_srcGlob, options) => {
    const configObject = explorer.search();

    if (configObject) {
      console.log(
        chalk.cyan(
          `ng-parsel: configuration found under ${configObject.filepath}.
                Configuraton from config file will be used.`
        )
      );
      parse(mergeOptionalConfigWithDefaults(configObject.config));
    } else {
      console.log(chalk.cyan(`ng-parsel: no configuration found. CLI arguments will be used.`));
      parse(mergeOptionalConfigWithDefaults(options));
    }
  });

program.command('init').action(() => {
  console.log(chalk.cyan(`ng-parsel: creating configuration file`));

  // EXTRACT TO UTILS
  writeJson('.ng-parselrc.json', CONFIG_DEFAULT_VALUES);

  console.log(chalk.green(`ng-parsel: configuration successfully written to: .ng-parselrc`));
});

program.parse();
