import { tsquery } from '@phenomnomnominal/tsquery';
import fs from 'fs';

import { NgParselOutputType } from '../shared/model/types.model.js';

import { parsePipe } from './pipe.parser.js';

describe('PipeParser', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should parse Angular pipes to NgParselPipes', () => {
    const filePath = 'my-test.pipe.ts';
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
      filePath,
      className: 'MyPipe',
      name: 'myPipe',
      pure: true,
      standalone: false,
      implementation,
    };

    jest.spyOn(fs, 'readFileSync').mockReturnValue(implementation);

    expect(parsePipe(ast, filePath)).toEqual(expectedPipe);
  });

  it('should parse standalone Angular pipes to NgParselPipes', () => {
    const filePath = 'my-test.pipe.ts';
    const implementation = `export class MyPipe implements PipeTransform {
            
                transform(value: any, ...args: any[]): any {
                   return null;
                }
            }`;

    const ast = tsquery.ast(`
            @Pipe({
                name: 'myPipe',
                standalone: true
            })
            ${implementation}
        `);

    const expectedPipe = {
      type: NgParselOutputType.PIPE,
      filePath,
      className: 'MyPipe',
      name: 'myPipe',
      pure: true,
      standalone: true,
      implementation,
    };

    jest.spyOn(fs, 'readFileSync').mockReturnValue(implementation);

    expect(parsePipe(ast, filePath)).toEqual(expectedPipe);
  });
});
