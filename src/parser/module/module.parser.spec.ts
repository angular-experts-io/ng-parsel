import { tsquery } from '@phenomnomnominal/tsquery';

import { NgParselOutputType } from '../shared/model/types.model';

import { parseModule } from './module.parser';

describe('ModuleParser', () => {
  it('should parse Angular modules to NgParselModules', () => {
    const ast = tsquery.ast(`
            @NgModule({
                declarations: [MyComponent],
                imports: [CommonModule],
                exports: [MyComponent]
            })
            export class MyModule {}
        `);

    const expectedOutput = {
      type: NgParselOutputType.MODULE,
      className: 'MyModule',
      imports: ['CommonModule'],
      exports: ['MyComponent'],
      declarations: ['MyComponent'],
      providers: [],
      bootstrap: [],
    };

    expect(parseModule(ast)).toEqual(expectedOutput);
  });
});
