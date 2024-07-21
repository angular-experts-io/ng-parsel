import chalk from 'chalk';

import { mergeOptionalConfigWithDefaults } from '../config/config.helper.js';
import { printWelcomeMessage } from '../utils/welcome.util.js';
import { cosmiconfigSync } from 'cosmiconfig';
import { parse } from '../parser/parser.js';

const explorer = cosmiconfigSync('ng-parsel');

export function parseCommand(options: { [key: string]: string }) {
  printWelcomeMessage();

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
    options['src'] = './test-spa';

    parse(mergeOptionalConfigWithDefaults(options));
  }
  console.log(chalk.magenta('===================================='));
}
