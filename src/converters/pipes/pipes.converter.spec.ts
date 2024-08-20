import { NgParselOutputType } from '../../parser/shared/model/types.model.js';
import { convertToPipeStats } from './pipes.converter.js';

describe('Directive converter', () => {
  it('should convert to directive stats', () => {
    const pipeStats = [
      {
        type: NgParselOutputType.PIPE,
        filePath: '',
        className: 'first',
        name: 'first',
        standalone: true,
        pure: true,
        implementation: '',
      },
      {
        type: NgParselOutputType.PIPE,
        filePath: '',
        className: 'second',
        name: 'second',
        standalone: true,
        pure: false,
        implementation: '',
      },
      {
        type: NgParselOutputType.PIPE,
        filePath: '',
        className: 'third',
        name: 'third',
        standalone: false,
        pure: true,
        implementation: '',
      },
    ];

    const expectedStats = {
      standalone: 2,
      pure: 2,
      total: 3,
    };

    const stats = convertToPipeStats(pipeStats);

    expect(expectedStats).toEqual(stats);
  });
});
