import { tsquery } from '@phenomnomnominal/tsquery';

import { parseValidator } from './validator.parser.js';
import { NgParselOutputType } from '../shared/model/types.model.js';

describe('ValidatorParser', () => {
  it('should parse a validator file', function () {
    const filePath = 'foo.validator.ts';
    const ast = tsquery.ast(`
            export class MyValidator {
                public static atLeastOneSelected(control: FormControl): ValidationErrors | null => {}
            }`);

    const expectedOutput = {
      type: NgParselOutputType.VALIDATOR,
      className: 'MyValidator',
      filePath,
      methodsPublicExplicit: [
        {
          name: 'atLeastOneSelected',
          args: [{ name: 'control', type: 'FormControl' }],
          returnType: 'ValidationErrors | null',
        },
      ],
    };
    expect(parseValidator(ast, filePath)).toEqual(expectedOutput);
  });
});
