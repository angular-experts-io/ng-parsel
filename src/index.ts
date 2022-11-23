import { parse } from "./parser/parser";
import * as glob from "glob";

const TEMP_DIRECTORY = "./test-spa/src/app/**";

function traverse(directory: string) {
  const directoryGlob = `${directory}/**/*.{ts,html,scss,css,less}`;
  glob.sync(directoryGlob).forEach((filePath) => {
    parse(filePath);
  });
}

function isTypeScriptFile(file: string): boolean {
  return file.endsWith(".ts");
}

traverse(TEMP_DIRECTORY);
