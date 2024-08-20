import { table } from 'table';

import { NgParselServiceStats } from '../converters/service/service.converter.js';

export function printServiceStats(serviceStats: NgParselServiceStats) {
  const tableData = [['Total'], [serviceStats.total]];

  const tableConfig = {
    header: {
      alignment: 'center',
      content: 'SERVICES',
    },
    columns: {
      0: {
        width: 25,
      },
    },
  } as any;

  console.log(table(tableData, tableConfig));
}
