import { tsquery } from '@phenomnomnominal/tsquery';

import { parseInputsAndOutputs } from './field-decorator.parser.js';

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

  it('should parse input setters', () => {
    const ast = tsquery.ast(`
            export class MyTestClass {
                @Input() set myInput(value: string){
                  console.log(value);
                };
           }
        `);

    const expectedInputs = [
      {
        decorator: '@Input()',
        name: 'myInput',
        type: 'string',
        field: '@Input() set myInput(value: string){\n                  console.log(value);\n                }',
      },
    ];
    expect(parseInputsAndOutputs(ast)).toEqual({
      inputs: expectedInputs,
      outputs: [],
    });
  });

  it('should parse signal inputs with an initial value', () => {
    const ast = tsquery.ast(`
            export class MyTestClass {
                test = input("myValue");
           }
        `);

    const expectedInputs = [
      {
        decorator: 'input',
        name: 'test',
        required: false,
        initialValue: '"myValue"',
        field: 'test = input("myValue");',
      },
    ];
    expect(parseInputsAndOutputs(ast)).toEqual({
      inputs: expectedInputs,
      outputs: [],
    });
  });

  it('should parse typed required signal inputs', () => {
    const ast = tsquery.ast(`
            export class MyTestClass {
                test = input.required<string>();
           }
        `);

    const expectedInputs = [
      {
        decorator: 'input',
        name: 'test',
        required: true,
        type: 'string',
        field: 'test = input.required<string>();',
      },
    ];
    expect(parseInputsAndOutputs(ast)).toEqual({
      inputs: expectedInputs,
      outputs: [],
    });
  });
});
