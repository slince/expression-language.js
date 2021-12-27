import {TokenStream} from "../src/token";
import {Lexer, Parser} from "../src/expression";
import * as ast from "../src/ast/ast";


export function json(object: any): string {
    return JSON.stringify(object);
}

export function obj(object: any): object {
    return JSON.parse(JSON.stringify(object));
}

export function lex(source: string): TokenStream{
    return new Lexer(source).lex() ;
}

export function parse(source: string): ast.BlockStatement{
    return new Parser(lex(source)).parse() ;
}

export function expr(source: string): ast.Expr{
    return new Parser(lex(source)).parseExpression() ;
}