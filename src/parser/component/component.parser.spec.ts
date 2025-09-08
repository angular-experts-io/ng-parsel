import fs from 'fs';
import { tsquery } from '@phenomnomnominal/tsquery';
import { NgParselOutputType } from '../shared/model/types.model.js';
import { parseComponent } from './component.parser.js';

describe('ComponentParser', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should parse a Angular Component to NgParselComponent', function () {
    const inlineTemplate = `<h1>Foo</h1>`;
    const styles = 'div { color: red; }';
    const filePath = 'foo.component.ts';

    const implementation = `export class MyTestComponent {
                @Input() foo: string;
                @Output() bar = new EventEmitter();
                
                public foo(bar: string): string {
                }
                
                bar(foo: string): string {}
            }`;

    const ast = tsquery.ast(`
            @Component({
                selector: 'my-test-comp',
                template: '${inlineTemplate}'
                styles: ['${styles}']
            })
            ${implementation}
        `);
    const expectedOutput = {
      type: NgParselOutputType.COMPONENT,
      filePath,
      className: 'MyTestComponent',
      selector: 'my-test-comp',
      standalone: false,
      cva: false,
      onPush: false,
      template: inlineTemplate,
      styles: [styles],
      inputs: [
        {
          decorator: '@Input()',
          name: 'foo',
          type: 'string',
          initializer: undefined,
          field: '@Input() foo: string',
          jsDoc: undefined,
        },
      ],
      outputs: [
        {
          decorator: '@Output()',
          name: 'bar',
          type: undefined,
          initializer: 'new EventEmitter()',
          field: '@Output() bar = new EventEmitter()',
          jsDoc: undefined,
        },
      ],
      implementation,
      methodsPublicExplicit: [
        {
          name: 'foo',
          args: [{ name: 'bar', type: 'string' }],
          returnType: 'string',
        },
      ],
    };
    jest.spyOn(fs, 'readFileSync').mockReturnValue(implementation);

    expect(parseComponent(ast, filePath)).toEqual(expectedOutput);
  });

  it('should parse a standalone Angular Component to NgParselComponent', function () {
    const inlineTemplate = `<h1>Foo</h1>`;
    const styles = 'div { color: red; }';
    const filePath = 'foo.component.ts';

    const implementation = `export class MyTestComponent {
                @Input() foo: string;
                @Output() bar = new EventEmitter();
                
                public foo(bar: string): string {
                }
                
                bar(foo: string): string {}
            }`;

    const ast = tsquery.ast(`
            @Component({
                selector: 'my-test-comp',
                template: '${inlineTemplate}'
                styles: ['${styles}'],
                standalone: true
            })
            ${implementation}
        `);
    const expectedOutput = {
      type: NgParselOutputType.COMPONENT,
      filePath,
      className: 'MyTestComponent',
      selector: 'my-test-comp',
      standalone: true,
      cva: false,
      onPush: false,
      template: inlineTemplate,
      styles: [styles],
      inputs: [
        {
          decorator: '@Input()',
          name: 'foo',
          type: 'string',
          initializer: undefined,
          field: '@Input() foo: string',
          jsDoc: undefined,
        },
      ],
      outputs: [
        {
          decorator: '@Output()',
          name: 'bar',
          type: undefined,
          initializer: 'new EventEmitter()',
          field: '@Output() bar = new EventEmitter()',
          jsDoc: undefined,
        },
      ],
      implementation,
      methodsPublicExplicit: [
        {
          name: 'foo',
          args: [{ name: 'bar', type: 'string' }],
          returnType: 'string',
        },
      ],
    };
    jest.spyOn(fs, 'readFileSync').mockReturnValue(implementation);

    expect(parseComponent(ast, filePath)).toEqual(expectedOutput);
  });

  it('should fetch the content of external templates', function () {
    const templateContent = `<h1>Foo</h1>`;
    const ast = tsquery.ast(`
            @Component({
                selector: 'my-test-comp',
                templateUrl: 'my-template-url.html'
            })
            export class MyTestComponent {}
        `);
    jest.spyOn(fs, 'readFileSync').mockReturnValue(templateContent);

    expect(parseComponent(ast, 'foo.component.ts').template).toEqual(templateContent);
  });

  it('should fetch the content of external style sheets', function () {
    const styleSheetContent = `h1 { color: red; }`;
    const ast = tsquery.ast(`
            @Component({
                selector: 'my-test-comp',
                template: '<h1>Foo</h1>',
                styleUrls: ['my-template-url.scss']
            })
            export class MyTestComponent {}
        `);
    jest.spyOn(fs, 'readFileSync').mockReturnValue(styleSheetContent);

    expect(parseComponent(ast, 'foo.component.ts').styles).toEqual([styleSheetContent]);
  });

  it('should detect a control value accessor', function () {
    const ast = tsquery.ast(`
            @Component({
                selector: 'my-test-comp',
                template: '<h1>Foo</h1>',
                styles: []
            })
            export class MyTestComponent implements ControlValueAccessor{}
        `);

    jest.spyOn(fs, 'readFileSync').mockReturnValue('');

    expect(parseComponent(ast, 'foo.component.ts').cva).toBeTruthy();
  });

  it('should be able to parse a component with an empty template', () => {
    const ast = tsquery.ast(`
            @Component({
                selector: 'my-test-comp',
                template: '',
                styles: []
            })
            export class MyTestComponent implements ControlValueAccessor{}
        `);

    jest.spyOn(fs, 'readFileSync').mockReturnValue('');

    expect(parseComponent(ast, 'foo.component.ts').template).toBe('');
  });

  it('should detect OnPush change detection strategy', () => {
    const ast = tsquery.ast(`
            @Component({
                selector: 'my-test-comp',
                template: '<h1>Foo</h1>',
                styles: [],
                changeDetection: ChangeDetectionStrategy.OnPush
            })
            export class MyTestComponent {}
        `);

    jest.spyOn(fs, 'readFileSync').mockReturnValue('');

    expect(parseComponent(ast, 'foo.component.ts').onPush).toBeTruthy();
  });

  it('should default to false for change detection strategy when not specified', () => {
    const ast = tsquery.ast(`
            @Component({
                selector: 'my-test-comp',
                template: '<h1>Foo</h1>',
                styles: []
            })
            export class MyTestComponent {}
        `);

    jest.spyOn(fs, 'readFileSync').mockReturnValue('');

    expect(parseComponent(ast, 'foo.component.ts').onPush).toBeFalsy();
  });
});
