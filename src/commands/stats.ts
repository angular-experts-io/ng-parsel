import { table } from 'table';

import { printWelcomeMessage } from '../utils/welcome.util.js';
import { loadAndMergeConfig } from '../utils/config.util.js';
import { convertToComponentStats, NgParselComponentStats } from '../converters/component.converter.js';
import { parse } from '../parser/parser.js';

export function statsCommand(cliArgs: { [key: string]: string }) {
  printWelcomeMessage();

  const config = loadAndMergeConfig(cliArgs);

  // TODO: clean this up later
  config['src'] = './test-spa';

  const parsedOutput = parse(config);
  const componentStats = convertToComponentStats(parsedOutput.ngParselComponents);
  printComponentStats(componentStats);
}

// TODO: extract this into a dedicated file
function printComponentStats(componentStats: NgParselComponentStats) {
  const tableData = [
    ['Standalone', 'Module based', 'CVA', 'Total'],
    [componentStats.standalone, componentStats.moduleBased, componentStats.cva, componentStats.total],
  ];

  const tableConfig = {
    header: {
      alignment: 'center',
      content: 'COMPONENTS',
    },
  } as any;

  console.log(table(tableData, tableConfig));
}
