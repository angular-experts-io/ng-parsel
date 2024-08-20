import { convertToComponentStats } from './component.converter.js';
import { NgParselOutputType } from '../../parser/shared/model/types.model.js';

describe('Component converter', () => {
  it('it should return the correct stats for a given NgParselComponent array', () => {
    const componentStats = [
      {
        type: NgParselOutputType.COMPONENT,
        filePath: '',
        className: 'first',
        selector: 'first',
        standalone: true,
        cva: true,
        inputs: [],
        outputs: [],
        implementation: '',
        template: '',
        styles: '',
        methodsPublicExplicit: [],
      },
      {
        type: NgParselOutputType.COMPONENT,
        filePath: '',
        className: 'second',
        selector: 'second',
        standalone: false,
        cva: true,
        inputs: [],
        outputs: [],
        implementation: '',
        template: '',
        styles: '',
        methodsPublicExplicit: [],
      },
      {
        type: NgParselOutputType.COMPONENT,
        filePath: '',
        className: 'third',
        selector: 'third',
        standalone: true,
        cva: false,
        inputs: [],
        outputs: [],
        implementation: '',
        template: '',
        styles: '',
        methodsPublicExplicit: [],
      },
    ];

    const expectedStats = {
      standalone: 2,
      moduleBased: 1,
      cva: 2,
      total: 3,
    };

    const stats = convertToComponentStats(componentStats);

    expect(expectedStats).toEqual(stats);
  });
});
