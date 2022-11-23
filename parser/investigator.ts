import * as ts from "typescript";
import {tsquery} from '@phenomnomnominal/tsquery';

import {AngularType} from "../model/types.model";

export function investigateType(ast: ts.SourceFile): AngularType {
    if (isComponent(ast)) {
        return AngularType.COMPONENT;
    }

    if (isModule(ast)) {
        return AngularType.MODULE;
    }

    if (isDirective(ast)) {
        return AngularType.DIRECTIVE;
    }

    if (isPipe(ast)) {
        return AngularType.PIPE;
    }

    return AngularType.UNKNOWN;
}

function isPipe(ast: ts.SourceFile): boolean {
    return isType(ast, 'Pipe');
}

function isDirective(ast: ts.SourceFile): boolean {
    return isType(ast, 'Directive');
}

function isModule(ast: ts.SourceFile): boolean {
    return isType(ast, 'NgModule');
}

function isComponent(ast: ts.SourceFile): boolean {
    return isType(ast, 'Component');
}

function isType(ast: ts.SourceFile, type: string): boolean {
    return tsquery(ast, `Decorator > CallExpression > Identifier[escapedText="${type}"]`).length > 0;
}

