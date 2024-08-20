import { NgParselComponent } from '../../parser/component/component.model.js';

export interface NgParselComponentStats {
  standalone: number;
  moduleBased: number;
  cva: number;
  total: number;
}

export function convertToComponentStats(componentStats: NgParselComponent[]): NgParselComponentStats {
  return componentStats.reduce(
    (acc: NgParselComponentStats, component) => {
      if (component.standalone) {
        acc.standalone = acc.standalone + 1;
      } else {
        acc.moduleBased = acc.moduleBased + 1;
      }

      if (component.cva) {
        acc.cva = acc.cva + 1;
      }

      acc.total = acc.total + 1;
      return acc;
    },
    {
      standalone: 0,
      moduleBased: 0,
      cva: 0,
      total: 0,
    }
  );
}
