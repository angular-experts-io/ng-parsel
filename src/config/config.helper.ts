import { CONFIG_DEFAULT_VALUES, NgParselConfig } from './config.model';

export function mergeOptionalConfigWithDefaults(config: { [key: string]: string }): NgParselConfig {
  return {
    ...CONFIG_DEFAULT_VALUES,
    ...config,
  };
}
