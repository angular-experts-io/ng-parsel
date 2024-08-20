import { NgParselService } from '../../parser/services/service.model.js';

export interface NgParselServiceStats {
  total: number;
}

export function convertToServiceStats(serviceStats: NgParselService[]): NgParselServiceStats {
  return {
    total: serviceStats.length,
  };
}
