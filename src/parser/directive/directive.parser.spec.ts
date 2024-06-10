import fs from 'fs';
import { tsquery } from '@phenomnomnominal/tsquery';

import { NgParselOutputType } from '../shared/model/types.model.js';

import { parseDirective } from './directive.parser.js';

describe('DirectiveParser', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should extract all the properties from the directive', function () {
    const filePath = 'foo.directive.ts';
    const implementation = `export class MyTestDirective {
                @Input() foo: string;
                @Output() bar = new EventEmitter();
            }`;

    const ast = tsquery.ast(`
            @Directive({
                selector: '[myTestDirective]'
            })
            ${implementation}
        `);
    const expectedOutput = {
      type: NgParselOutputType.DIRECTIVE,
      className: 'MyTestDirective',
      filePath,
      selector: '[myTestDirective]',
      standalone: false,
      inputs: [
        {
          decorator: '@Input()',
          name: 'foo',
          type: 'string',
          initializer: undefined,
          field: '@Input() foo: string',
        },
      ],
      outputs: [
        {
          decorator: '@Output()',
          name: 'bar',
          type: undefined,
          initializer: 'new EventEmitter()',
          field: '@Output() bar = new EventEmitter()',
        },
      ],
      implementation,
    };
    jest.spyOn(fs, 'readFileSync').mockReturnValue(implementation);

    expect(parseDirective(ast, filePath)).toEqual(expectedOutput);
  });

  it('should extract all the properties from the standalone directive', function () {
    const filePath = 'foo.directive.ts';
    const implementation = `export class MyTestDirective {
                @Input() foo: string;
                @Output() bar = new EventEmitter();
            }`;

    const ast = tsquery.ast(`
            @Directive({
                selector: '[myTestDirective]',
                standalone: true
            })
            ${implementation}
        `);
    const expectedOutput = {
      type: NgParselOutputType.DIRECTIVE,
      className: 'MyTestDirective',
      filePath,
      selector: '[myTestDirective]',
      standalone: true,
      inputs: [
        {
          decorator: '@Input()',
          name: 'foo',
          type: 'string',
          initializer: undefined,
          field: '@Input() foo: string',
        },
      ],
      outputs: [
        {
          decorator: '@Output()',
          name: 'bar',
          type: undefined,
          initializer: 'new EventEmitter()',
          field: '@Output() bar = new EventEmitter()',
        },
      ],
      implementation,
    };
    jest.spyOn(fs, 'readFileSync').mockReturnValue(implementation);

    expect(parseDirective(ast, filePath)).toEqual(expectedOutput);
  });
});
