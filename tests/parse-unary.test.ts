// @ts-ignore
import {parse, expr, json, obj} from "./utils";

describe('Parser:Unary', ()=>{

    test('simple unary', ()=>{

        expect(obj(expr("!abc"))).toStrictEqual({
            type: "UnaryExpression",
            operator: "!",
            argument: {
                type: "VariableExpression",
                value: "abc"
            },
        });

        expect(obj(expr("not abc"))).toStrictEqual({
            type: "UnaryExpression",
            operator: "not",
            argument: {
                type: "VariableExpression",
                value: "abc"
            },
        });

        expect(obj(expr("+abc"))).toStrictEqual({
            type: "UnaryExpression",
            operator: "+",
            argument: {
                type: "VariableExpression",
                value: "abc"
            },
        });

        expect(obj(expr("-abc"))).toStrictEqual({
            type: "UnaryExpression",
            operator: "-",
            argument: {
                type: "VariableExpression",
                value: "abc"
            },
        });
    });

    test('embed unary', ()=> {

        expect(obj(expr("!+-abc"))).toStrictEqual({
            type: "UnaryExpression",
            operator: "!",
            argument: {
                type: "UnaryExpression",
                operator: "+",
                argument: {
                    type: "UnaryExpression",
                    operator: "-",
                    argument: {
                        type: "VariableExpression",
                        value: "abc"
                    }
                }
            }
        });
    });

});