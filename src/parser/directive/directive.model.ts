import {NgParselBuildingBlock} from "../../model/types.model";
import {NgParselFieldDecorator} from "../shared/model/decorator.model";

export interface NgParselDirectiveDecorators {
    selector: string;
    standalone: boolean;
}

export interface NgParselDirective extends NgParselBuildingBlock {
    className: string;
    selector: string;
    standalone: boolean;
    implementation: string;
    inputs: NgParselFieldDecorator[];
    outputs: NgParselFieldDecorator[];
}
