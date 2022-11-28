import { tsquery } from '@phenomnomnominal/tsquery';
import { parseImplictPublicMethods } from './method.parser';

describe('MethodParser', () => {
  it('should parse the implicit public methods', () => {
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
      },
    ];

    expect(parseImplictPublicMethods(ast)).toEqual(expectedOutput);
  });
});
