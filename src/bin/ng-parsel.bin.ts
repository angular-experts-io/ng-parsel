#!/usr/bin/env node
import { Command } from "commander";

import * as packageJson from "../../package.json";
import { parse } from "../ng-parsel";

const program = new Command();

program.version(packageJson.version);

program
  .command("parse")
  .argument("<string>", "Glob pattern to search for files")
  .option("--out <string>", "Output directory for generated files")
  .option("--singleFile", "Output in a single file")
  .action((srcGlob, options) => {
    const { out, singleFile } = options;
    parse(out);
  });

program.command("init").action(() => {
  // TODO implement init
  console.log("init called");
});

program.parse();
