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

  it('should parse signal inputs with initial string value', () => {
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

  it('should parse signal inputs with an initial boolean (true) value', () => {
    const ast = tsquery.ast(`
            export class MyTestClass {
                test = input(true);
           }
        `);

    const expectedInputs = [
      {
        decorator: 'input',
        name: 'test',
        required: false,
        initialValue: 'true',
        field: 'test = input(true);',
      },
    ];
    expect(parseInputsAndOutputs(ast)).toEqual({
      inputs: expectedInputs,
      outputs: [],
    });
  });

  it('should parse signal inputs with an initial boolean (false) value', () => {
    const ast = tsquery.ast(`
            export class MyTestClass {
                test = input(false);
           }
        `);

    const expectedInputs = [
      {
        decorator: 'input',
        name: 'test',
        required: false,
        initialValue: 'false',
        field: 'test = input(false);',
      },
    ];
    expect(parseInputsAndOutputs(ast)).toEqual({
      inputs: expectedInputs,
      outputs: [],
    });
  });

  it('should parse signal inputs with an initial array', () => {
    const ast = tsquery.ast(`
            export class MyTestClass {
                test = input([]);
           }
        `);

    const expectedInputs = [
      {
        decorator: 'input',
        name: 'test',
        required: false,
        initialValue: '[]',
        field: 'test = input([]);',
      },
    ];
    expect(parseInputsAndOutputs(ast)).toEqual({
      inputs: expectedInputs,
      outputs: [],
    });
  });

  it('should parse signal inputs with an initial object', () => {
    const ast = tsquery.ast(`
            export class MyTestClass {
                test = input({});
           }
        `);

    const expectedInputs = [
      {
        decorator: 'input',
        name: 'test',
        required: false,
        initialValue: '{}',
        field: 'test = input({});',
      },
    ];
    expect(parseInputsAndOutputs(ast)).toEqual({
      inputs: expectedInputs,
      outputs: [],
    });
  });

  it('should parse signal inputs with an null', () => {
    const ast = tsquery.ast(`
            export class MyTestClass {
                test = input(null);
           }
        `);

    const expectedInputs = [
      {
        decorator: 'input',
        name: 'test',
        required: false,
        initialValue: 'null',
        field: 'test = input(null);',
      },
    ];
    expect(parseInputsAndOutputs(ast)).toEqual({
      inputs: expectedInputs,
      outputs: [],
    });
  });

  it('should parse signal inputs with an undefined', () => {
    const ast = tsquery.ast(`
            export class MyTestClass {
                test = input(undefined);
           }
        `);

    const expectedInputs = [
      {
        decorator: 'input',
        name: 'test',
        required: false,
        initialValue: 'undefined',
        field: 'test = input(undefined);',
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

  it('should parse the new output API', () => {
    const ast = tsquery.ast(`
            export class MyTestClass {
                counterChange = output<number>();
           }
        `);

    const expectedOutputs = [
      {
        decorator: 'output',
        name: 'counterChange',
        type: 'number',
        field: 'counterChange = output<number>();',
      },
    ];
    expect(parseInputsAndOutputs(ast)).toEqual({
      inputs: [],
      outputs: expectedOutputs,
    });
  });

  it('should parse the new output outputFromObservable API', () => {
    const ast = tsquery.ast(`
            export class MyTestClass {
                counterChange = outputFromObservable(this.change$);
           }
        `);

    const expectedOutputs = [
      {
        decorator: 'outputFromObservable',
        name: 'counterChange',
        field: 'counterChange = outputFromObservable(this.change$);',
      },
    ];
    expect(parseInputsAndOutputs(ast)).toEqual({
      inputs: [],
      outputs: expectedOutputs,
    });
  });
});
