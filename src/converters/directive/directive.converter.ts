import { NgParselDirective } from '../../parser/directive/directive.model.js';

export interface NgParselDirectiveStats {
  standalone: number;
  moduleBased: number;
  total: number;
}

export function convertToDirectiveStats(directiveStats: NgParselDirective[]): NgParselDirectiveStats {
  return directiveStats.reduce(
    (acc: NgParselDirectiveStats, component) => {
      if (component.standalone) {
        acc.standalone = acc.standalone + 1;
      } else {
        acc.moduleBased = acc.moduleBased + 1;
      }
      acc.total = acc.total + 1;
      return acc;
    },
    {
      standalone: 0,
      moduleBased: 0,
      total: 0,
    }
  );
}
