import { tsquery } from '@phenomnomnominal/tsquery';

import { parseExplicitPublicMethods } from './method.parser.js';

describe('MethodParser', () => {
  it('should parse the explicit public methods', () => {
    const ast = tsquery.ast(`
        export class MyTestClass {
            public myExplicitMethod(foo: string, bar: boolean): string {
            }
        
            myMethod(foo: string, bar: boolean): string {
            }
        `);

    const expectedOutput = [
      {
        name: 'myExplicitMethod',
        args: [
          { name: 'foo', type: 'string' },
          { name: 'bar', type: 'boolean' },
        ],
        returnType: 'string',
        jsDoc: undefined,
      },
    ];

    expect(parseExplicitPublicMethods(ast)).toEqual(expectedOutput);
  });

  it('should parse all methods', () => {
    const ast = tsquery.ast(`
        export class MyTestClass {
            public myExplicitMethod(foo: string, bar: boolean): string {
            }
        
            myMethod(foo: string, bar: boolean): string {
            }
        `);

    const expectedOutput = [
      {
        name: 'myExplicitMethod',
        args: [
          { name: 'foo', type: 'string' },
          { name: 'bar', type: 'boolean' },
        ],
        returnType: 'string',
        jsDoc: undefined,
      },
      {
        name: 'myMethod',
        args: [
          { name: 'foo', type: 'string' },
          { name: 'bar', type: 'boolean' },
        ],
        returnType: 'string',
        jsDoc: undefined,
      },
    ];

    expect(parseExplicitPublicMethods(ast)).toEqual(expectedOutput);
  });

  it('should parse the static explicit public methods', () => {
    const ast = tsquery.ast(`
        export class MyTestClass {
            public static myExplicitMethod(foo: string, bar: boolean): string {
            }
        
            myMethod(foo: string, bar: boolean): string {
            }
        `);

    const expectedOutput = [
      {
        name: 'myExplicitMethod',
        args: [
          { name: 'foo', type: 'string' },
          { name: 'bar', type: 'boolean' },
        ],
        returnType: 'string',
        jsDoc: undefined,
      },
    ];

    expect(parseExplicitPublicMethods(ast)).toEqual(expectedOutput);
  });

  it('should parse JSDoc comments for explicit public methods', () => {
    const ast = tsquery.ast(`
        export class MyTestClass {
            /**
             * This is a JSDoc comment for myExplicitMethod
             * @param foo The foo parameter
             * @param bar The bar parameter
             * @returns A string value
             */
            public myExplicitMethod(foo: string, bar: boolean): string {
              return 'test';
            }
        
            myMethod(foo: string, bar: boolean): string {
              return 'test';
            }
        `);

    const expectedOutput = [
      {
        name: 'myExplicitMethod',
        args: [
          { name: 'foo', type: 'string' },
          { name: 'bar', type: 'boolean' },
        ],
        returnType: 'string',
        jsDoc:
          'This is a JSDoc comment for myExplicitMethod\n@param The foo parameter\n@param The bar parameter\n@returns A string value',
      },
    ];

    expect(parseExplicitPublicMethods(ast)).toEqual(expectedOutput);
  });
});
