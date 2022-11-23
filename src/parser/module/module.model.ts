import {NgParselBuildingBlock} from "../../model/types.model";

export interface NgParselModule extends NgParselBuildingBlock {
    imports: string[];
    exports: string[];
    declarations: string[];
    providers: string[];
    bootstrap: string[];
}
