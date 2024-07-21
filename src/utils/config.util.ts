import { cosmiconfigSync } from 'cosmiconfig';
import chalk from 'chalk';
import { mergeOptionalConfigWithDefaults } from '../config/config.helper.js';

const explorer = cosmiconfigSync('ng-parsel');

export function loadAndMergeConfig(cliArgsConfig: { [key: string]: string }) {
  const configObject = explorer.search();

  if (configObject) {
    console.log(
      chalk.cyan(
        `ng-parsel: configuration found under ${configObject.filepath}.
                Configuraton from config file will be used.`
      )
    );
    return mergeOptionalConfigWithDefaults(configObject.config);
  } else {
    console.log(chalk.cyan(`ng-parsel: no configuration found. CLI arguments will be used.`));
    return mergeOptionalConfigWithDefaults(cliArgsConfig);
  }
}
