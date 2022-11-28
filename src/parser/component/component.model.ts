import { NgParselOutput } from '../shared/model/types.model';
import { NgParselFieldDecorator } from '../shared/model/decorator.model';
import { NgParselMethod } from '../shared/model/method.model';

export interface NgParselComponent extends NgParselOutput {
  className: string;
  selector: string;
  standalone: boolean;
  inputs: NgParselFieldDecorator[];
  outputs: NgParselFieldDecorator[];
  implementation: string;
  template: string;
  styles: string | string[];
  methodsPublicExplicit: NgParselMethod[];
}
