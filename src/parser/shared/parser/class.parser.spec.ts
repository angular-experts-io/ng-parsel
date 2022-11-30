import { tsquery } from '@phenomnomnominal/tsquery';

import { parseClassName } from './class.parser.js';

describe('ClassParser', () => {
  it('should extract the class name', () => {
    const ast = tsquery.ast(`
            export class MyTestClass {}
        `);
    expect(parseClassName(ast)).toEqual('MyTestClass');
  });
});
