import { table } from 'table';

import { NgParselSpecStats } from '../converters/spec/spec.converter.js';

export function printSpecStats(specStats: NgParselSpecStats) {
  const tableData = [['Total'], [specStats.total]];

  const tableConfig = {
    header: {
      alignment: 'center',
      content: 'SPECS',
    },
    columns: {
      0: {
        width: 25,
      },
    },
  } as any;

  console.log(table(tableData, tableConfig));
}
