import { tsquery } from '@phenomnomnominal/tsquery';

import { NgParselOutputType } from '../shared/model/types.model.js';

import { parseModule } from './module.parser.js';

describe('ModuleParser', () => {
  it('should parse Angular modules to NgParselModules', () => {
    const filePath = 'my-test.module.ts';
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
      filePath,
      className: 'MyModule',
      imports: ['CommonModule'],
      exports: ['MyComponent'],
      declarations: ['MyComponent'],
      providers: [],
      bootstrap: [],
    };

    expect(parseModule(ast, filePath)).toEqual(expectedOutput);
  });
});
