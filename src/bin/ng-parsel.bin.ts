#!/usr/bin/env node
import commander from "commander";
import * as packageJson from "../../package.json";

(commander as any)
  .version(packageJson.version)
  .argument("<string>", "Glob pattern to search for files")
  .option("init", "Initialize a new ng-parsel configuration file")
  .option("--out", "Output directory for generated files")
  .parse(process.argv);

console.log("provided options", commander);
