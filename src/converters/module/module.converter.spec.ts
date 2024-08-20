import { NgParselOutputType } from '../../parser/shared/model/types.model.js';
import { convertToModuleStats } from './module.converter.js';

describe('Module converter', () => {
  it('should convert to module stats', () => {
    const moduleStats = [
      {
        className: 'first',
        type: NgParselOutputType.DIRECTIVE,
        filePath: '',
        imports: [],
        exports: [],
        declarations: [],
        providers: [],
        bootstrap: [],
      },
      {
        className: 'second',
        type: NgParselOutputType.MODULE,
        filePath: '',
        imports: [],
        exports: [],
        declarations: [],
        providers: [],
        bootstrap: [],
      },
      {
        className: 'third',
        type: NgParselOutputType.MODULE,
        filePath: '',
        imports: [],
        exports: [],
        declarations: [],
        providers: [],
        bootstrap: [],
      },
    ];

    const expectedStats = {
      total: 3,
    };

    const stats = convertToModuleStats(moduleStats);

    expect(expectedStats).toEqual(stats);
  });
});
