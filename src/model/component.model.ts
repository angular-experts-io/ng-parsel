import {NgParselBuildingBlock} from "./types.model";

export interface NgParselFieldDecorator {
  decorator: string;
  name: string;
  type?: string;
  initializer ?: string;
  field: string;
}

export interface NgParselComponent extends NgParselBuildingBlock{
  className: string;
  selector: string;
  standalone: boolean;
  inputs: NgParselFieldDecorator[];
  outputs: NgParselFieldDecorator[];
  implementation: string;
  template: string;
  styles: string | string[];
}
