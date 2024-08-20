import { table } from 'table';

import { NgParselDirectiveStats } from '../converters/directive/directive.converter.js';

export function printDirectiveStats(directiveStats: NgParselDirectiveStats) {
  const tableData = [
    ['Standalone', 'Module based', 'Total'],
    [directiveStats.standalone, directiveStats.moduleBased, directiveStats.total],
  ];

  const tableConfig = {
    header: {
      alignment: 'center',
      content: 'DIRECTIVES',
    },
  } as any;

  console.log(table(tableData, tableConfig));
}
