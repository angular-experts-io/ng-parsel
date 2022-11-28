import { tsquery } from '@phenomnomnominal/tsquery';
import fs from 'fs';

import { NgParselOutputType } from '../shared/model/types.model';

import { parsePipe } from './pipe.parser';

describe('PipeParser', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should parse Angular pipes to NgParselPipes', () => {
    const implementation = `export class MyPipe implements PipeTransform {
            
                transform(value: any, ...args: any[]): any {
                   return null;
                }
            }`;

    const ast = tsquery.ast(`
            @Pipe({
                name: 'myPipe'
            })
            ${implementation}
        `);

    const expectedPipe = {
      type: NgParselOutputType.PIPE,
      className: 'MyPipe',
      name: 'myPipe',
      pure: true,
      standalone: false,
      implementation,
    };

    jest.spyOn(fs, 'readFileSync').mockReturnValue(implementation);

    expect(parsePipe(ast, 'my-test.pipe.ts')).toEqual(expectedPipe);
  });
});
