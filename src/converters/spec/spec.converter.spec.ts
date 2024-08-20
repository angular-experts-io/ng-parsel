import { NgParselOutputType } from '../../parser/shared/model/types.model.js';

import { convertToSpecStats } from './spec.converter.js';

describe('Module converter', () => {
  it('should convert to module stats', () => {
    const specStats = [
      {
        className: 'first',
        type: NgParselOutputType.SPEC,
        filePath: '',
        implementation: '',
      },
      {
        className: 'second',
        type: NgParselOutputType.SPEC,
        filePath: '',
        implementation: '',
      },
      {
        className: 'third',
        type: NgParselOutputType.SPEC,
        filePath: '',
        implementation: '',
      },
    ];

    const expectedStats = {
      total: 3,
    };

    const stats = convertToSpecStats(specStats);

    expect(expectedStats).toEqual(stats);
  });
});
