import { tsquery } from '@phenomnomnominal/tsquery';
import { isCva } from './cva.parser.js';

describe('isCva', () => {
  it('detects ControlValueAccessor on a component AST that implements it', () => {
    const ast = tsquery.ast(`
      @Component({ selector: 'cva-comp', template: '' })
      export class MyComponent implements ControlValueAccessor {}
    `);

    expect(isCva(ast)).toEqual(true);
  });

  it('does not detect ControlValueAccessor on a component AST that does not implement it', () => {
    const ast = tsquery.ast(`
      @Component({ selector: 'no-cva-comp', template: '' })
      export class MyComponent {}
    `);

    expect(isCva(ast)).toEqual(false);
  });

  it('detects ControlValueAccessor on a directive AST that implements it', () => {
    const ast = tsquery.ast(`
      @Directive({ selector: '[myDir]' })
      export class MyDirective implements ControlValueAccessor {}
    `);

    expect(isCva(ast)).toEqual(true);
  });

  it('does not detect ControlValueAccessor on a directive AST that does not implement it', () => {
    const ast = tsquery.ast(`
      @Directive({ selector: '[myDir]' })
      export class MyDirective {}
    `);

    expect(isCva(ast)).toEqual(false);
  });
});
