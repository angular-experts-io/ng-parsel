import { table } from 'table';

import { NgParselPipeStats } from '../converters/pipes/pipes.converter.js';

export function printPipeStats(pipeStats: NgParselPipeStats) {
  const tableData = [
    ['Standalone', 'Pure', 'Total'],
    [pipeStats.standalone, pipeStats.pure, pipeStats.total],
  ];

  const tableConfig = {
    header: {
      alignment: 'center',
      content: 'PIPES',
    },
  } as any;

  console.log(table(tableData, tableConfig));
}
