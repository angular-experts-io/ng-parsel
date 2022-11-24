import {NgParselBuildingBlock} from "../../model/types.model";
import {NgParselFieldDecorator} from "../shared/model/decorator.model";

// TODO test all of those properties
export interface NgParselComponentDecorators {
    selector: string;
    standalone: boolean;
    template?: string;
    templateUrl?: string;
    styles?: string;
    styleUrls?: string[];
    animations?: any[];
    encapsulation?: string;
    changeDetection?: string;
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
