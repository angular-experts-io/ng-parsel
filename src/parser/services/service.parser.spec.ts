import { tsquery } from '@phenomnomnominal/tsquery';
import { parseService } from './service.parser.js';
import { NgParselOutputType } from '../shared/model/types.model.js';

describe('ServiceParser', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should parse a Angular Service with explicit public methods to NgParselService', function () {
    const className = 'MyTestService';
    const mockService = `
            export class ${className} {
                public foo(bar: string): string {
                }
                
                bar(foo: string): string {}
            }
        `;
    const ast = tsquery.ast(mockService);
    const filePath = 'foo.service.ts';

    const expectedOutput = {
      type: NgParselOutputType.SERVICE,
      className,
      filePath,
      fieldsPublicExplicit: [],
      methodsPublicExplicit: [
        {
          name: 'foo',
          args: [
            {
              name: 'bar',
              type: 'string',
            },
          ],
          returnType: 'string',
        },
      ],
    };

    const parselOutput = parseService(ast, filePath);
    expect(parselOutput).toEqual(expectedOutput);
  });

  it('should parse a Angular Service without explicit public methods to NgParselService', function () {
    const className = 'MyTestService';
    const mockService = `
            export class ${className} {
                foo(bar: string): string {
                }
                
                bar(foo: string): string {}
            }
        `;
    const ast = tsquery.ast(mockService);
    const filePath = 'foo.service.ts';

    const expectedOutput = {
      type: NgParselOutputType.SERVICE,
      className,
      filePath,
      fieldsPublicExplicit: [],
      methodsPublicExplicit: [],
    };

    const parselOutput = parseService(ast, filePath);
    expect(parselOutput).toEqual(expectedOutput);
  });

  it('should parse a Angular Service with explicit public fields', function () {
    const className = 'MyTestService';
    const mockService = `
            export class ${className} {
                public counter = signal(0);
                public counter$ = new BehaviorSubject(0);
                public increment = new Subject<number>();

                private notVisible = 'blub'
                
                foo(bar: string): string {
                }
                
                bar(foo: string): string {}
            }
        `;
    const ast = tsquery.ast(mockService);
    const filePath = 'foo.service.ts';

    const expectedOutput = {
      type: NgParselOutputType.SERVICE,
      className,
      filePath,
      fieldsPublicExplicit: [
        {
          name: 'counter',
          type: 'inferred',
          value: 'signal(0)',
        },
        {
          name: 'counter$',
          type: 'inferred',
          value: 'BehaviorSubject(0)',
        },
        {
          name: 'increment',
          type: 'Subject<number>',
        },
      ],
      methodsPublicExplicit: [],
    };

    const parselOutput = parseService(ast, filePath);
    expect(parselOutput).toEqual(expectedOutput);
  });
});
