import { tsquery } from '@phenomnomnominal/tsquery';

import { investigateType } from './investigator.js';
import { NgParselOutputType } from '../parser/shared/model/types.model.js';

describe('Investigator', () => {
  it('should detect Angular components', () => {
    const ast = tsquery.ast(`
        @Component({
            selector: 'app-root',
        })
        export class MyTestComponent {}
      `);
    expect(investigateType(ast, 'foo.component.ts')).toEqual(NgParselOutputType.COMPONENT);
  });

  it('should detect Angular modules', () => {
    const ast = tsquery.ast(`
        @NgModule({
            selector: 'app-root',
        })
        export class MyTestModule {}
      `);
    expect(investigateType(ast, 'foo.module.ts')).toEqual(NgParselOutputType.MODULE);
  });

  it('should detect Angular pipes', () => {
    const ast = tsquery.ast(`
        @Pipe({
            name: 'app-root',
        })
        export class MyTestPipe {}
      `);
    expect(investigateType(ast, 'foo.pipe.ts')).toEqual(NgParselOutputType.PIPE);
  });

  it('should detect Angular directives', () => {
    const ast = tsquery.ast(`
        @Directive({
            selector: 'app-root',
        })
        export class MyTestPipe {}
      `);
    expect(investigateType(ast, 'foo.directive.ts')).toEqual(NgParselOutputType.DIRECTIVE);
  });

  it('should detect test files', () => {
    const ast = tsquery.ast(`
        describe('foo', () => {
            it('should do something', () => {
                expect(true).toBeTruthy();
            });
        });
      `);
    expect(investigateType(ast, 'foo.spec.ts')).toEqual(NgParselOutputType.SPEC);
  });

  it('should classify all other files as type UNKNOWN', () => {
    const ast = tsquery.ast(`
        const foo = 'bar';
      `);
    expect(investigateType(ast, 'foo.ts')).toEqual(NgParselOutputType.UNKNOWN);
  });
});
