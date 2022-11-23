import {MitchelAngularBuildingBlock} from "./types.model";

export interface MitchellAngularFieldDecorator {
  decorator: string;
  name: string;
  type?: string;
  initializer ?: string;
  field: string;
}

export interface MitchellAngularComponent extends MitchelAngularBuildingBlock{
  className: string;
  selector: string;
  standalone: boolean;
  inputs: MitchellAngularFieldDecorator[];
  outputs: MitchellAngularFieldDecorator[];
  implementation: string;
  template: string;
  styles: string | string[];
}
