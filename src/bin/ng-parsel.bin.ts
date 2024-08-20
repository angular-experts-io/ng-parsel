#!/usr/bin/env node
import chalk from 'chalk';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { Command } from 'commander';
import { dirname, resolve } from 'path';

import { CONFIG_DEFAULT_VALUES } from '../config/config.model.js';
import { writeJson } from '../utils/write.util.js';
import { printWelcomeMessage } from '../utils/welcome.util.js';
import { parseCommand } from '../commands/parse.js';
import { statsCommand } from '../commands/stats.js';

const program = new Command();

program.version(
  /*
           This is very complicated and could be done way simpler by using import assertion.
           But import assertions are not supported by Node 14.
           */
  JSON.parse(readFileSync(resolve(dirname(fileURLToPath(import.meta.url)), '../../package.json')).toString() as any)
    .version
);

program
  .command('parse')
  .option('-s, --src', 'Glob pattern to search for files')
  .option('--components', 'Parse Components', true)
  .option('--services', 'Parse Services', true)
  .option('--pipes', 'Parse Pipes', true)
  .option('--modules', 'Parse Modules', true)
  .option('--directives', 'Parse Directives', true)
  .option('--harnesses', 'Parse Harnesses', true)
  .option('--specs', 'Parse Specs', true)
  .option('-o, --out <string>', 'Output directory for generated files')
  .option('--singleFile', 'Output in a single file')
  .action((_srcGlob, cliArgs) => {
    parseCommand(cliArgs);
  });

program.command('init').action(() => {
  printWelcomeMessage();
  console.log(chalk.cyan(`ng-parsel: creating configuration file`));

  // EXTRACT TO UTILS
  writeJson('.ng-parselrc.json', CONFIG_DEFAULT_VALUES);

  console.log(chalk.green(`ng-parsel: configuration successfully written to: .ng-parselrc`));
  console.log(chalk.magenta('===================================='));
});

program
  .command('stats')
  .option('-s, --src', 'Glob pattern to search for files')
  .action((_srcGlob, cliArgs) => {
    statsCommand(cliArgs);
  });

program.parse();
