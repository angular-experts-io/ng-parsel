import { NgParselOutput } from '../shared/model/types.model.js';
import { NgParselFieldDecorator } from '../shared/model/decorator.model.js';
import { NgParselMethod } from '../shared/model/method.model.js';

export interface NgParselComponent extends NgParselOutput {
  className: string;
  selector: string;
  standalone: boolean;
  cva: boolean;
  onPush: boolean;
  inputs: NgParselFieldDecorator[];
  outputs: NgParselFieldDecorator[];
  implementation: string;
  template: string;
  styles: string | string[];
  methodsPublicExplicit: NgParselMethod[];
}
