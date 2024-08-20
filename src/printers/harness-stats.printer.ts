import { table } from 'table';

import { NgParselHarnessStats } from '../converters/harness/harness.converter.js';

export function printHarnessStats(moduleStats: NgParselHarnessStats) {
  const tableData = [['Total'], [moduleStats.total]];

  const tableConfig = {
    header: {
      alignment: 'center',
      content: 'HARNESS',
    },
    columns: {
      0: {
        width: 25,
      },
    },
  } as any;

  console.log(table(tableData, tableConfig));
}
