import { tsquery } from '@phenomnomnominal/tsquery';

import { getDecoratorProperties } from './decorator.parser.js';

describe('DecoratorParser', () => {
  it('should parse component decorator properties', () => {
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

  it('should parse standalone component decorator properties', () => {
    const ast = tsquery.ast(`
            @Component({
                selector: 'my-component',
                template: '<div></div>',
                standalone: true,
            })
            export class MyTestClass {}
        `);

    const expectedDecorators = {
      selector: 'my-component',
      template: '<div></div>',
      standalone: true,
    };

    expect(getDecoratorProperties(ast)).toEqual(expectedDecorators);
  });

  it('should parse directive decorator properties', () => {
    const ast = tsquery.ast(`
            @Component({
                selector: 'my-directive',
            })
            export class MyTestClass {}
        `);

    const expectedDecorators = {
      selector: 'my-directive',
    };

    expect(getDecoratorProperties(ast)).toEqual(expectedDecorators);
  });

  it('should parse standalone directive decorator properties', () => {
    const ast = tsquery.ast(`
            @Component({
                selector: 'my-directive',
                standalone: true,
            })
            export class MyTestClass {}
        `);

    const expectedDecorators = {
      selector: 'my-directive',
      standalone: true,
    };

    expect(getDecoratorProperties(ast)).toEqual(expectedDecorators);
  });

  it('should parse pipe decorator properties', () => {
    const ast = tsquery.ast(`
            @Component({
                name: 'my-pipe',
            })
            export class MyTestClass {}
        `);

    const expectedDecorators = {
      name: 'my-pipe',
    };

    expect(getDecoratorProperties(ast)).toEqual(expectedDecorators);
  });

  it('should parse pipe decorator properties', () => {
    const ast = tsquery.ast(`
            @Component({
                name: 'my-pipe',
                standalone: true,
            })
            export class MyTestClass {}
        `);

    const expectedDecorators = {
      name: 'my-pipe',
      standalone: true,
    };

    expect(getDecoratorProperties(ast)).toEqual(expectedDecorators);
  });
});
