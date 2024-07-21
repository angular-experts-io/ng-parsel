import { printWelcomeMessage } from '../utils/welcome.util.js';
import { loadAndMergeConfig } from '../utils/config.util.js';
import { parse } from '../parser/parser.js';
import { convertToComponentStats } from '../converters/component.converter.js';

export function statsCommand(cliArgs: { [key: string]: string }) {
  printWelcomeMessage();

  const config = loadAndMergeConfig(cliArgs);

  // TODO: clean this up later
  config['src'] = './test-spa';

  const parsedOutput = parse(config);
  console.log(convertToComponentStats(parsedOutput.ngParselComponents));
}
