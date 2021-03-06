// @ts-ignore
import {parse, expr, json, obj} from "./utils";

describe('Parser:Literal', ()=>{

    test('literal:boolean', ()=> {
        expect(obj(expr("true"))).toStrictEqual({
            type: "LiteralExpression",
            value: true,
            raw: "true",
            position: {
                column: 0,
                line: 0,
                offset: 0
            }
        });

        expect(obj(expr("false"))).toStrictEqual({
            type: "LiteralExpression",
            value: false,
            raw: "false",
            position: {
                column: 0,
                line: 0,
                offset: 0
            }
        });
    });

    test('literal:null', ()=> {
        expect(obj(expr("null"))).toStrictEqual({
            type: "LiteralExpression",
            value: null,
            raw: "null",
            position: {
                column: 0,
                line: 0,
                offset: 0
            }
        });
    });

    test('literal:number', ()=> {
        expect(obj(expr("12"))).toStrictEqual({
            type: "LiteralExpression",
            value: 12,
            raw: "12",
            position: {
                column: 0,
                line: 0,
                offset: 0
            }
        });

        expect(obj(expr("12.36"))).toStrictEqual({
            type: "LiteralExpression",
            value: 12.36,
            raw: "12.36",
            position: {
                column: 0,
                line: 0,
                offset: 0
            }
        });
    });

    test('literal:string', ()=> {
        expect(obj(expr("'string'"))).toStrictEqual({
            type: "LiteralExpression",
            value: "string",
            raw: "string",
            position: {
                column: 0,
                line: 0,
                offset: 0
            }
        });
    });

});