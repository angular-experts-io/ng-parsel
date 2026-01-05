import { tsquery } from '@phenomnomnominal/tsquery';

import { NgParselOutputType } from '../shared/model/types.model.js';

import { parseHarnesses } from './harness.parser.js';

describe('HarnessParser', () => {
  it('should parse the methods of a harness file', () => {
    const filePath = 'my-test.harness.ts';
    const ast = tsquery.ast(`
            export class MyTestHarness {
            
            public async foo(test: string): Promise<string> {
            }
            
            public async bar(): Promise<boolean> {
            }
        }`);

    const expectedOutput = {
      type: NgParselOutputType.HARNESS,
      filePath,
      className: 'MyTestHarness',
      methods: [
        {
          name: 'foo',
          args: [{ name: 'test', type: 'string' }],
          returnType: 'Promise<string>',
          jsDoc: undefined,
          accessType: 'public',
        },
        {
          name: 'bar',
          args: [],
          returnType: 'Promise<boolean>',
          jsDoc: undefined,
          accessType: 'public',
        },
      ],
      methodsPublicExplicit: [
        {
          name: 'foo',
          args: [{ name: 'test', type: 'string' }],
          returnType: 'Promise<string>',
          accessType: 'public',
        },
        {
          name: 'bar',
          args: [],
          returnType: 'Promise<boolean>',
          accessType: 'public',
        },
      ],
    };
    expect(parseHarnesses(ast, filePath)).toEqual(expectedOutput);
  });
});
