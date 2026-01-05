import { tsquery } from '@phenomnomnominal/tsquery';
import { parseExtends } from './extends.parser.js';

describe('parseExtends', () => {
  it('parses extends for a component-like class with extends', () => {
    const ast = tsquery.ast(`
      @Component({ selector: 'x' })
      export class MyComponent extends BaseComponent {}
    `);

    expect(parseExtends(ast)).toEqual(['BaseComponent']);
  });

  it('returns an empty array for a component-like class without extends', () => {
    const ast = tsquery.ast(`
      @Component({ selector: 'x' })
      export class MyComponent {}
    `);

    expect(parseExtends(ast)).toEqual([]);
  });

  it('parses extends for a directive-like class with extends', () => {
    const ast = tsquery.ast(`
      @Directive({ selector: '[x]' })
      export class MyDirective extends SomeDirectiveBase {}
    `);

    expect(parseExtends(ast)).toEqual(['SomeDirectiveBase']);
  });

  it('returns an empty array for a directive-like class without extends', () => {
    const ast = tsquery.ast(`
      @Directive({ selector: '[x]' })
      export class MyDirective {}
    `);

    expect(parseExtends(ast)).toEqual([]);
  });

  it('parses extends for a service-like class with generic extends', () => {
    const ast = tsquery.ast(`
      export class MyService extends BaseService<Thing> {}
    `);

    expect(parseExtends(ast)).toEqual(['BaseService']);
  });

  it('returns an empty array for a service-like class without extends', () => {
    const ast = tsquery.ast(`
      export class MyService {}
    `);

    expect(parseExtends(ast)).toEqual([]);
  });
});
