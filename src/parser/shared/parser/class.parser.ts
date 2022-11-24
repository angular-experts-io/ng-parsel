import * as ts from "typescript";
import {tsquery} from "@phenomnomnominal/tsquery";

export function parseClassName(ast: ts.SourceFile): string {
    return [...tsquery(ast, 'ClassDeclaration > Identifier')][0].getText();
}
