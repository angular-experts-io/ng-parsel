import { tsquery } from '@phenomnomnominal/tsquery';

import { parseClassName, parseClassJsDoc } from './class.parser.js';

describe('ClassParser', () => {
  it('should extract the class name', () => {
    const ast = tsquery.ast(`
            export class MyTestClass {}
        `);
    expect(parseClassName(ast)).toEqual('MyTestClass');
  });

  it('should return undefined for class JSDoc when no JSDoc exists', () => {
    const ast = tsquery.ast(`
        export class MyTestClass {
            public myExplicitMethod(foo: string, bar: boolean): string {
            }
        }
    `);

    expect(parseClassJsDoc(ast)).toBeUndefined();
  });

  it('should parse JSDoc comments for class declarations', () => {
    const ast = tsquery.ast(`
        /**
         * This is a JSDoc comment for MyTestClass
         * @description A test class
         * @example
         * const myClass = new MyTestClass();
         */
        export class MyTestClass {
            public myExplicitMethod(foo: string, bar: boolean): string {
              return 'test';
            }
        }
    `);

    expect(parseClassJsDoc(ast)).toEqual('This is a JSDoc comment for MyTestClass\n@description A test class\n@example const myClass = new MyTestClass();');
  });

  it('should parse JSDoc comments with multiple tags', () => {
    const ast = tsquery.ast(`
        /**
         * This is a JSDoc comment for MyTestClass
         * @description A test class
         * @deprecated Use NewTestClass instead
         * @since 1.0.0
         */
        export class MyTestClass {
            public myExplicitMethod(foo: string, bar: boolean): string {
              return 'test';
            }
        }
    `);

    expect(parseClassJsDoc(ast)).toEqual('This is a JSDoc comment for MyTestClass\n@description A test class\n@deprecated Use NewTestClass instead\n@since 1.0.0');
  });
});
