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
      methodsPublicExplicit: [],
    };

    const parselOutput = parseService(ast, filePath);
    expect(parselOutput).toEqual(expectedOutput);
  });
});
