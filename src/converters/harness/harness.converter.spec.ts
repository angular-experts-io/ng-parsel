import { NgParselOutputType } from '../../parser/shared/model/types.model.js';
import { convertToHarnessStats } from './harness.converter.js';

describe('Harness converter', () => {
  it('should convert to module stats', () => {
    const harnessStats = [
      {
        className: 'first',
        type: NgParselOutputType.HARNESS,
        filePath: '',
        methodsPublicExplicit: [],
      },
      {
        className: 'second',
        type: NgParselOutputType.HARNESS,
        filePath: '',
        methodsPublicExplicit: [],
      },
      {
        className: 'third',
        type: NgParselOutputType.HARNESS,
        filePath: '',
        methodsPublicExplicit: [],
      },
    ];

    const expectedStats = {
      total: 3,
    };

    const stats = convertToHarnessStats(harnessStats);

    expect(expectedStats).toEqual(stats);
  });
});
