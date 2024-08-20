import { convertToDirectiveStats } from './directive.converter.js';
import { NgParselOutputType } from '../../parser/shared/model/types.model.js';

describe('Directive converter', () => {
  it('should convert to directive stats', () => {
    const directiveStats = [
      {
        type: NgParselOutputType.DIRECTIVE,
        filePath: '',
        className: 'first',
        selector: 'first',
        standalone: true,
        inputs: [],
        outputs: [],
        implementation: '',
        methodsPublicExplicit: [],
      },
      {
        type: NgParselOutputType.DIRECTIVE,
        filePath: '',
        className: 'second',
        selector: 'second',
        standalone: false,
        inputs: [],
        outputs: [],
        implementation: '',
        methodsPublicExplicit: [],
      },
      {
        type: NgParselOutputType.DIRECTIVE,
        filePath: '',
        className: 'third',
        selector: 'third',
        standalone: true,
        inputs: [],
        outputs: [],
        implementation: '',
        methodsPublicExplicit: [],
      },
    ];

    const expectedStats = {
      standalone: 2,
      moduleBased: 1,
      total: 3,
    };

    const stats = convertToDirectiveStats(directiveStats);

    expect(expectedStats).toEqual(stats);
  });
});
