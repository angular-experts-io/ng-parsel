import { NgParselOutput } from '../shared/model/types.model.js';
import { NgParselFieldDecorator } from '../shared/model/decorator.model.js';
import { NgParselMethod } from '../shared/model/method.model.js';
import { NgParselField } from '../shared/model/field.model.js';

export interface NgParselDirective extends NgParselOutput {
  className: string;
  selector: string;
  standalone: boolean;
  implementation: string;
  inputs: NgParselFieldDecorator[];
  outputs: NgParselFieldDecorator[];
  methodsPublicExplicit: NgParselMethod[];
  fieldsPublicExplicit: NgParselField[];
  classJsDoc?: string | undefined;
}
