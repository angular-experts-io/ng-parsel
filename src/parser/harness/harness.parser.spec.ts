import { tsquery } from '@phenomnomnominal/tsquery';
import { parseHarnesses } from './harness.parser';
import { NgParselOutputType } from '../shared/model/types.model';

describe('HarnessParser', () => {
  it('should parse the methods of a harness file', () => {
    const ast = tsquery.ast(`
            export class MyTestHarness {
            
            public async foo(test: string): Promise<string> {
            }
            
            public async bar(): Promise<boolean> {
            }
        }`);

    const expectedOutput = {
      type: NgParselOutputType.HARNESS,
      className: 'MyTestHarness',
      methods: [
        {
          name: 'foo',
          args: [{ name: 'test', type: 'string' }],
          returnType: 'Promise<string>',
        },
        {
          name: 'bar',
          args: [],
          returnType: 'Promise<boolean>',
        },
      ],
    };
    expect(parseHarnesses(ast)).toEqual(expectedOutput);
  });
});
