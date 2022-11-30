import path from 'path';
import { readFileSync } from 'fs';
import * as ts from 'typescript';
import { tsquery } from '@phenomnomnominal/tsquery';

import { parseInputsAndOutputs } from '../shared/parser/field-decorator.parser.js';
import { NgParselDecoratorProperties } from '../shared/model/decorator.model.js';
import { parseExplicitPublicMethods } from '../shared/parser/method.parser.js';
import { NgParselOutputType } from '../shared/model/types.model.js';
import { parseClassName } from '../shared/parser/class.parser.js';

import { NgParselComponent } from './component.model.js';

export function parseComponent(ast: ts.SourceFile, componentFilePath: string): NgParselComponent {
  const componentDecorators = getComponentDecorators(ast);

  const template = componentDecorators.template
    ? componentDecorators.template
    : fetchFileContent(componentDecorators.templateUrl as string, componentFilePath);

  const styles = componentDecorators.styles
    ? componentDecorators.styles
    : (componentDecorators.styleUrls as [])?.map((styleUrl: string) => fetchFileContent(styleUrl, componentFilePath));
  const componentImplementation = readFileSync(componentFilePath, 'utf8').toString();

  const inputsAndOutputs = parseInputsAndOutputs(ast);

  return {
    type: NgParselOutputType.COMPONENT,
    className: parseClassName(ast),
    filePath: componentFilePath,
    selector: componentDecorators.selector as string,
    standalone: componentDecorators.standalone || false,
    template: template,
    cva: isCva(ast),
    styles: styles,
    implementation: componentImplementation,
    inputs: inputsAndOutputs.inputs,
    outputs: inputsAndOutputs.outputs,
    methodsPublicExplicit: parseExplicitPublicMethods(ast),
  };
}

function getComponentDecorators(ast: ts.SourceFile): NgParselDecoratorProperties {
  const decoratorQuery = 'Decorator > CallExpression > ObjectLiteralExpression > PropertyAssignment';
  const componentDecorators = tsquery(ast, decoratorQuery);

  return componentDecorators.reduce((decorators: any, propertyAssignment: any) => {
    const propertyName = propertyAssignment.name.escapedText;

    if (propertyName === 'styleUrls' || propertyName === 'styles') {
      const styleTokens = tsquery(ast, `${decoratorQuery} > ArrayLiteralExpression > StringLiteral`);
      decorators[propertyName] = styleTokens.map((token) => token.getText().replace(/'/g, ''));
      return decorators;
    }

    decorators[propertyName] = propertyAssignment.initializer.text;
    return decorators;
  }, {});
}

function isCva(ast: ts.SourceFile): boolean {
  return (
    tsquery(ast, 'HeritageClause > ExpressionWithTypeArguments > Identifier:has([escapedText="ControlValueAccessor"])')
      .length > 0
  );
}

function fetchFileContent(filePath: string, componentFilePath: string): string {
  const filePathFragements = componentFilePath.split('/');
  filePathFragements.pop();
  const componentDirectory = filePathFragements.join('/');
  const templatePath = path.join(componentDirectory, filePath);
  return readFileSync(templatePath, 'utf8').toString();
}
