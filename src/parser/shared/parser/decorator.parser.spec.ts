import { tsquery } from '@phenomnomnominal/tsquery';

import { getDecoratorProperties } from './decorator.parser';

describe('DecoratorParser', () => {
  it('should parse decorator properties', () => {
    const ast = tsquery.ast(`
            @Component({
                selector: 'my-component',
                template: '<div></div>'
            })
            export class MyTestClass {}
        `);

    const expectedDecorators = {
      selector: 'my-component',
      template: '<div></div>',
    };

    expect(getDecoratorProperties(ast)).toEqual(expectedDecorators);
  });
});
