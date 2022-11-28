import { tsquery } from '@phenomnomnominal/tsquery';

import { parseInputsAndOutputs } from './field-decorator.parser';

describe('Field Decorator', function () {
  it('should parse input and output decorators', () => {
    const ast = tsquery.ast(`
            export class MyTestClass {
                @Input() myInput: string;
                @Output() myOutput = new EventEmitter();
           }
        `);

    const expectedInputs = [
      {
        decorator: '@Input()',
        name: 'myInput',
        type: 'string',
        field: '@Input() myInput: string',
      },
    ];

    const expectedOutputs = [
      {
        decorator: '@Output()',
        name: 'myOutput',
        initializer: 'new EventEmitter()',
        field: '@Output() myOutput = new EventEmitter()',
      },
    ];

    expect(parseInputsAndOutputs(ast)).toEqual({
      inputs: expectedInputs,
      outputs: expectedOutputs,
    });
  });
});
