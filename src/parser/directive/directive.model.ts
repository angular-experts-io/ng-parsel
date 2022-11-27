import { NgParselOutput } from '../shared/model/types.model';
import { NgParselFieldDecorator } from '../shared/model/decorator.model';

export interface NgParselDirective extends NgParselOutput {
  className: string;
  selector: string;
  standalone: boolean;
  implementation: string;
  inputs: NgParselFieldDecorator[];
  outputs: NgParselFieldDecorator[];
}
