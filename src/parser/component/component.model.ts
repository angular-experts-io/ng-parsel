import {NgParselBuildingBlock} from "../../model/types.model";

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
