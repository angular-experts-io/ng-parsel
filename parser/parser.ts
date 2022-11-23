import {tsquery} from '@phenomnomnominal/tsquery';

import {AngularType} from "../model/types.model";

import {parseComponent} from "./component-parser";
import {investigateType} from "./investigator";

export function parse(source: string) {
    const ast = createAST(source);
    const componentType = investigateType(ast);

    if(componentType === AngularType.COMPONENT) {
        parseComponent(ast);
    }


}

function createAST(source: string) {
    return tsquery.ast(source);
}
