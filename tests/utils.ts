import {TokenStream} from "../src/token";
import Lexer from "../src/lexer";


export function json(object: any): string {
    return JSON.stringify(object);
}

export function obj(object: any): object {
    return JSON.parse(JSON.stringify(object));
}

export function lex(source: string): TokenStream{
    return new Lexer(source).lex() ;
}