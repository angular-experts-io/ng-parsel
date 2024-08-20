import { NgParselSpec } from '../../parser/spec/spec.model.js';

export interface NgParselSpecStats {
  total: number;
}

export function convertToSpecStats(serviceStats: NgParselSpec[]): NgParselSpecStats {
  return {
    total: serviceStats.length,
  };
}
