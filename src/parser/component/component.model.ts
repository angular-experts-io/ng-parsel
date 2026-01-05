import { NgParselOutput } from '../shared/model/types.model.js';
import { NgParselFieldDecorator } from '../shared/model/decorator.model.js';
import { NgParselMethod } from '../shared/model/method.model.js';
import { NgParselField } from '../shared/model/field.model.js';

export interface NgParselComponent extends NgParselOutput {
  className: string;
  selector: string;
  standalone: boolean;
  cva: boolean;
  extends: string[];
  onPush: boolean;
  inputs: NgParselFieldDecorator[];
  outputs: NgParselFieldDecorator[];
  implementation: string;
  template: string;
  styles: string | string[];
  methods: NgParselMethod[];
  methodsPublicExplicit: NgParselMethod[];
  fieldsPublicExplicit: NgParselField[];
  classJsDoc?: string | undefined;
}
