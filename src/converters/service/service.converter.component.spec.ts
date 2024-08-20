import { NgParselOutputType } from '../../parser/shared/model/types.model.js';

import { convertToServiceStats } from './service.converter.js';

describe('Service stats converter', () => {
  it('should convert to service stats', () => {
    const serviceStats = [
      {
        className: 'first',
        type: NgParselOutputType.SERVICE,
        filePath: '',
        fieldsPublicExplicit: [],
        methodsPublicExplicit: [],
      },
      {
        className: 'second',
        type: NgParselOutputType.SERVICE,
        filePath: '',
        fieldsPublicExplicit: [],
        methodsPublicExplicit: [],
      },
      {
        className: 'third',
        type: NgParselOutputType.SERVICE,
        filePath: '',
        fieldsPublicExplicit: [],
        methodsPublicExplicit: [],
      },
    ];

    const expectedStats = {
      total: 3,
    };

    const stats = convertToServiceStats(serviceStats);

    expect(expectedStats).toEqual(stats);
  });
});
