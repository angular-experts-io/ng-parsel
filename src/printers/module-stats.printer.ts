import { table } from 'table';

import { NgParselModuleStats } from '../converters/module/module.converter.js';

export function printModuleStats(moduleStats: NgParselModuleStats) {
  const tableData = [['Total'], [moduleStats.total]];

  const tableConfig = {
    header: {
      alignment: 'center',
      content: 'MODULES',
    },
    columns: {
      0: {
        width: 25,
      },
    },
  } as any;

  console.log(table(tableData, tableConfig));
}
