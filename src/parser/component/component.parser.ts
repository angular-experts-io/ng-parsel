import path from 'path';
import { readFileSync } from 'fs';
import * as ts from 'typescript';
import { tsquery } from '@phenomnomnominal/tsquery';

import { parseInputsAndOutputs } from '../shared/parser/field-decorator.parser.js';
import { parseExplicitPublicMethods } from '../shared/parser/method.parser.js';
import { NgParselOutputType } from '../shared/model/types.model.js';
import { parseClassName } from '../shared/parser/class.parser.js';

import { NgParselComponent } from './component.model.js';
import { getDecoratorProperties } from '../shared/parser/decorator.parser.js';

export function parseComponent(ast: ts.SourceFile, componentFilePath: string): NgParselComponent {
  const componentDecorators = getDecoratorProperties(ast);

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
    onPush: isOnPushChangeDetection(ast),
    styles: styles,
    implementation: componentImplementation,
    inputs: inputsAndOutputs.inputs,
    outputs: inputsAndOutputs.outputs,
    methodsPublicExplicit: parseExplicitPublicMethods(ast),
  };
}

function isCva(ast: ts.SourceFile): boolean {
  return (
    tsquery(ast, 'HeritageClause > ExpressionWithTypeArguments > Identifier:has([escapedText="ControlValueAccessor"])')
      .length > 0
  );
}

function isOnPushChangeDetection(ast: ts.SourceFile): boolean {
  const changeDetectionNodes = tsquery(
    ast,
    'Decorator > CallExpression > ObjectLiteralExpression > PropertyAssignment:has(Identifier[name="changeDetection"])'
  );

  if (changeDetectionNodes.length === 0) {
    return false;
  }

  const changeDetectionNode = changeDetectionNodes[0] as ts.PropertyAssignment;
  const initializer = changeDetectionNode.initializer.getText();

  return initializer.includes('ChangeDetectionStrategy.OnPush');
}

function fetchFileContent(filePath: string | undefined, componentFilePath: string): string {
  if (!filePath) {
    return '';
  }
  const filePathFragements = componentFilePath.split('/');
  filePathFragements.pop();
  const componentDirectory = filePathFragements.join('/');
  const templatePath = path.join(componentDirectory, filePath);
  return readFileSync(templatePath, 'utf8').toString();
}
