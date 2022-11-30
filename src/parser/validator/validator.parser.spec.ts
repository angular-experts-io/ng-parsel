import { tsquery } from '@phenomnomnominal/tsquery';

import { parseValidator } from './validator.parser.js';
import { NgParselOutputType } from '../shared/model/types.model.js';

describe('ValidatorParser', () => {
  it('should parse a validator file', function () {
    const ast = tsquery.ast(`
            export class MyValidator {
                public static atLeastOneSelected(control: FormControl): ValidationErrors | null => {}
            }`);

    const expectedOutput = {
      type: NgParselOutputType.VALIDATOR,
      className: 'MyValidator',
      methods: [
        {
          name: 'atLeastOneSelected',
          args: [{ name: 'control', type: 'FormControl' }],
          returnType: 'ValidationErrors | null',
        },
      ],
    };
    expect(parseValidator(ast, 'my-validator.ts')).toEqual(expectedOutput);
  });
});
