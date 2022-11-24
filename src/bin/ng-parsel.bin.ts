#!/usr/bin/env node
import { writeFileSync } from "fs";
import { Command } from "commander";
import { cosmiconfigSync } from "cosmiconfig";
import chalk from "chalk";

import * as packageJson from "../../package.json";
import { parse } from "../ng-parsel";

const program = new Command();
const explorer = cosmiconfigSync(packageJson.name);

program.version(packageJson.version);

program
  .command("parse")
  .argument("<string>", "Glob pattern to search for files")
  .option("-c", "Parse Components", true)
  .option("-p", "Parse Pipes", true)
  .option("-m", "Parse Modules", true)
  .option("-d", "Parse Directives", true)
  .option("-s", "Parse Specs", true)
  .option("--out <string>", "Output directory for generated files")
  .option("--singleFile", "Output in a single file")
  .action((srcGlob, options) => {
    const configObject = explorer.search();

    if (configObject) {
      console.log(
        chalk.cyan(
          `ng-parsel: configuration found under ${configObject.filepath}.
                Configuraton from config file will be used.`
        )
      );

      if (!configObject.config.src) {
        console.log(
          chalk.red(
            `ng-parsel: required src property is missing in config file.`
          )
        );
        process.exit(1);
      }
      parse(configObject.config.src);
    } else {
      console.log(
        chalk.cyan(
          `ng-parsel: no configuration found. CLI arguments will be used.`
        )
      );
      const { out } = options;
      parse(out);
    }
  });

program.command("init").action(() => {
  console.log(chalk.cyan(`ng-parsel: creating configuration file`));

  writeFileSync(
    "ng-parselrc.json",
    JSON.stringify({
      src: "src",
      out: "dist",
      parseComponents: true,
      parsePipes: true,
      parseDirectives: true,
      parseModules: true,
      parseSpecs: true,
      singleFile: true,
    })
  );

  console.log(
    chalk.green(
      `ng-parsel: configuration successfully written to: ng-parselrc.json`
    )
  );
});

program.parse();
