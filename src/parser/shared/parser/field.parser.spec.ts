import { parseExplicitPublicFields } from './field.parser.js';
import { tsquery } from '@phenomnomnominal/tsquery';

describe('Field parser', () => {
  it('should extract a public Signal field', () => {
    const ast = tsquery.ast(`
            export class MyTestClass {
               public visible = signal('0'); 
               private notVisibleToYou = 'foo';
           }
        `);

    const expectedFields = [
      {
        name: 'visible',
        type: 'inferred',
        value: `signal('0')`,
      },
    ];

    const fieldsPublicExplicit = parseExplicitPublicFields(ast);
    expect(fieldsPublicExplicit).toEqual(expectedFields);
  });

  it('should extract a public property field', () => {
    const ast = tsquery.ast(`
            export class MyTestClass {
               public visible = 'some value'; 
               private notVisibleToYou = 'foo';
           }
        `);

    const expectedFields = [
      {
        name: 'visible',
        type: 'inferred',
        value: `'some value'`,
      },
    ];

    const fieldsPublicExplicit = parseExplicitPublicFields(ast);
    expect(fieldsPublicExplicit).toEqual(expectedFields);
  });

  it('should extract a public Subject', () => {
    const ast = tsquery.ast(`
            export class MyTestClass {
               public visible = new Subject('some value'); 
               private notVisibleToYou = 'foo';
           }
        `);

    const expectedFields = [
      {
        name: 'visible',
        type: 'inferred',
        value: `Subject('some value')`,
      },
    ];

    const fieldsPublicExplicit = parseExplicitPublicFields(ast);
    expect(fieldsPublicExplicit).toEqual(expectedFields);
  });

  it('should extract a public Subject with type void', () => {
    const ast = tsquery.ast(`
            export class MyTestClass {
               public visible = new Subject<void>(); 
               private notVisibleToYou = 'foo';
           }
        `);

    const expectedFields = [
      {
        name: 'visible',
        type: 'Subject<void>',
        value: undefined,
      },
    ];

    const fieldsPublicExplicit = parseExplicitPublicFields(ast);
    expect(fieldsPublicExplicit).toEqual(expectedFields);
  });
});
