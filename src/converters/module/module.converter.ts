import { NgParselModule } from '../../parser/module/module.model.js';

export interface NgParselModuleStats {
  total: number;
}

export function convertToModuleStats(moduleStats: NgParselModule[]): NgParselModuleStats {
  return {
    total: moduleStats.length,
  };
}
