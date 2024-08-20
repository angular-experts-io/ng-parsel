import { NgParselHarness } from '../../parser/harness/harness.model.js';

export interface NgParselHarnessStats {
  total: number;
}

export function convertToHarnessStats(moduleStats: NgParselHarness[]): NgParselHarnessStats {
  return {
    total: moduleStats.length,
  };
}
