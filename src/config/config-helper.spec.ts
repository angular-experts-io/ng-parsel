import { mergeOptionalConfigWithDefaults } from './config.helper.js';
import { CONFIG_DEFAULT_VALUES } from './config.model.js';

describe('ConfigHelper', () => {
  it('should return the default config if no config was provided', function () {
    expect(mergeOptionalConfigWithDefaults({})).toEqual(CONFIG_DEFAULT_VALUES);
  });

  it('should merge the provided config with the default configuration', function () {
    const config = {
      src: 'foo',
      out: 'bar',
    };

    expect(mergeOptionalConfigWithDefaults(config)).toEqual({
      ...CONFIG_DEFAULT_VALUES,
      ...config,
    });
  });
});
