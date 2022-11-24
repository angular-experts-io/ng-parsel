import { CONFIG_DEFAULT_VALUES, NgParselConfig } from './config.model';

export function mergeOptionalConfigWithDefaults(config: any): NgParselConfig {
  return {
    ...CONFIG_DEFAULT_VALUES,
    ...config,
  };
}
