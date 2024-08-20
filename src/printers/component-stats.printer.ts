import { table } from 'table';

import { NgParselComponentStats } from '../converters/component/component.converter.js';

export function printComponentStats(componentStats: NgParselComponentStats) {
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
