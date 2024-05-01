import { tsquery } from '@phenomnomnominal/tsquery';

import { parseInputsAndOutputs } from './field-decorator.parser.js';

describe('Field Decorator', function () {
  describe('decorator based inputs and outputs', () => {
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
  });

  describe('signal inputs', () => {
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

    it('should parse signal inputs with null', () => {
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

    it('should parse signal inputs with a number', () => {
      const ast = tsquery.ast(`
            export class MyTestClass {
                test = input(0);
           }
        `);

      const expectedInputs = [
        {
          decorator: 'input',
          name: 'test',
          required: false,
          initialValue: '0',
          field: 'test = input(0);',
        },
      ];
      expect(parseInputsAndOutputs(ast)).toEqual({
        inputs: expectedInputs,
        outputs: [],
      });
    });

    it('should parse signal inputs with a template string', () => {
      const ast = tsquery.ast(`
            export class MyTestClass {
                test = input(\`test\`);
           }
        `);

      const expectedInputs = [
        {
          decorator: 'input',
          name: 'test',
          required: false,
          initialValue: '`test`',
          field: 'test = input(`test`);',
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

    it('should parse model inputs with a template string', () => {
      const ast = tsquery.ast(`
            export class MyTestClass {
                test = input(\`myvalue\`);
           }
        `);

      const expectedInputs = [
        {
          decorator: 'input',
          name: 'test',
          initialValue: '`myvalue`',
          required: false,
          field: 'test = input(`myvalue`);',
        },
      ];
      expect(parseInputsAndOutputs(ast)).toEqual({
        inputs: expectedInputs,
        outputs: [],
      });
    });

    it('should parse signal inputs with a template string and dynamic variable access', () => {
      const foo = 'bar';
      const ast = tsquery.ast(`
            export class MyTestClass {
                test = input(\`myvalue ${foo}\`);
           }
        `);

      const expectedInputs = [
        {
          decorator: 'input',
          name: 'test',
          initialValue: '`myvalue bar`',
          required: false,
          field: 'test = input(`myvalue bar`);',
        },
      ];
      expect(parseInputsAndOutputs(ast)).toEqual({
        inputs: expectedInputs,
        outputs: [],
      });
    });
  });

  describe('model inputs', () => {
    it('should parse signal model with initial string value', () => {
      const ast = tsquery.ast(`
            export class MyTestClass {
                test = model("myValue");
           }
        `);

      const expectedInputs = [
        {
          decorator: 'model',
          name: 'test',
          required: false,
          initialValue: '"myValue"',
          field: 'test = model("myValue");',
        },
      ];
      expect(parseInputsAndOutputs(ast)).toEqual({
        inputs: expectedInputs,
        outputs: [],
      });
    });

    it('should parse signal model with an initial boolean (true) value', () => {
      const ast = tsquery.ast(`
            export class MyTestClass {
                test = model(true);
           }
        `);

      const expectedInputs = [
        {
          decorator: 'model',
          name: 'test',
          required: false,
          initialValue: 'true',
          field: 'test = model(true);',
        },
      ];
      expect(parseInputsAndOutputs(ast)).toEqual({
        inputs: expectedInputs,
        outputs: [],
      });
    });

    it('should parse signal model with an initial boolean (false) value', () => {
      const ast = tsquery.ast(`
            export class MyTestClass {
                test = model(false);
           }
        `);

      const expectedInputs = [
        {
          decorator: 'model',
          name: 'test',
          required: false,
          initialValue: 'false',
          field: 'test = model(false);',
        },
      ];
      expect(parseInputsAndOutputs(ast)).toEqual({
        inputs: expectedInputs,
        outputs: [],
      });
    });

    it('should parse signal model with an initial array', () => {
      const ast = tsquery.ast(`
            export class MyTestClass {
                test = model([]);
           }
        `);

      const expectedInputs = [
        {
          decorator: 'model',
          name: 'test',
          required: false,
          initialValue: '[]',
          field: 'test = model([]);',
        },
      ];
      expect(parseInputsAndOutputs(ast)).toEqual({
        inputs: expectedInputs,
        outputs: [],
      });
    });

    it('should parse signal model with an initial object', () => {
      const ast = tsquery.ast(`
            export class MyTestClass {
                test = model({});
           }
        `);

      const expectedInputs = [
        {
          decorator: 'model',
          name: 'test',
          required: false,
          initialValue: '{}',
          field: 'test = model({});',
        },
      ];
      expect(parseInputsAndOutputs(ast)).toEqual({
        inputs: expectedInputs,
        outputs: [],
      });
    });

    it('should parse signal model with null', () => {
      const ast = tsquery.ast(`
            export class MyTestClass {
                test = model(null);
           }
        `);

      const expectedInputs = [
        {
          decorator: 'model',
          name: 'test',
          required: false,
          initialValue: 'null',
          field: 'test = model(null);',
        },
      ];
      expect(parseInputsAndOutputs(ast)).toEqual({
        inputs: expectedInputs,
        outputs: [],
      });
    });

    it('should parse signal model with an undefined', () => {
      const ast = tsquery.ast(`
            export class MyTestClass {
                test = model(undefined);
           }
        `);

      const expectedInputs = [
        {
          decorator: 'model',
          name: 'test',
          required: false,
          initialValue: 'undefined',
          field: 'test = model(undefined);',
        },
      ];
      expect(parseInputsAndOutputs(ast)).toEqual({
        inputs: expectedInputs,
        outputs: [],
      });
    });

    it('should parse typed required signal model', () => {
      const ast = tsquery.ast(`
            export class MyTestClass {
                test = model.required<string>();
           }
        `);

      const expectedInputs = [
        {
          decorator: 'model',
          name: 'test',
          required: true,
          type: 'string',
          field: 'test = model.required<string>();',
        },
      ];
      expect(parseInputsAndOutputs(ast)).toEqual({
        inputs: expectedInputs,
        outputs: [],
      });
    });

    it('should parse model inputs with a number', () => {
      const ast = tsquery.ast(`
            export class MyTestClass {
                test = model(0);
           }
        `);

      const expectedInputs = [
        {
          decorator: 'model',
          name: 'test',
          initialValue: '0',
          required: false,
          field: 'test = model(0);',
        },
      ];
      expect(parseInputsAndOutputs(ast)).toEqual({
        inputs: expectedInputs,
        outputs: [],
      });
    });

    it('should parse model inputs with a template string', () => {
      const ast = tsquery.ast(`
            export class MyTestClass {
                test = model(\`myvalue\`);
           }
        `);

      const expectedInputs = [
        {
          decorator: 'model',
          name: 'test',
          initialValue: '`myvalue`',
          required: false,
          field: 'test = model(`myvalue`);',
        },
      ];
      expect(parseInputsAndOutputs(ast)).toEqual({
        inputs: expectedInputs,
        outputs: [],
      });
    });

    it('should parse model inputs with a template string and dynamic variable access', () => {
      const foo = 'bar';
      const ast = tsquery.ast(`
            export class MyTestClass {
                test = model(\`myvalue ${foo}\`);
           }
        `);

      const expectedInputs = [
        {
          decorator: 'model',
          name: 'test',
          initialValue: '`myvalue bar`',
          required: false,
          field: 'test = model(`myvalue bar`);',
        },
      ];
      expect(parseInputsAndOutputs(ast)).toEqual({
        inputs: expectedInputs,
        outputs: [],
      });
    });
  });

  describe('output', () => {
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
});
