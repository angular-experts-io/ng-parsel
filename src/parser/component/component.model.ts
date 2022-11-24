import {NgParselBuildingBlock} from "../../model/types.model";
import {NgParselFieldDecorator} from "../shared/model/decorator.model";

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
