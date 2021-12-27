// @ts-ignore
import {parse, expr, json, obj} from "./utils";

describe('Parser:Unary', ()=>{

    test('simple unary', ()=>{

        expect(obj(expr("!abc"))).toStrictEqual({
            type: "UnaryExpression",
            operator: "!",
            argument: {
                type: "VariableExpression",
                value: "abc",
                position: {
                    column: 1,
                    line: 0,
                    offset: 1
                }
            },
            position: {
                column: 0,
                line: 0,
                offset: 0
            }
        });

        expect(obj(expr("not abc"))).toStrictEqual({
            type: "UnaryExpression",
            operator: "not",
            argument: {
                type: "VariableExpression",
                value: "abc",
                position: {
                    column: 4,
                    line: 0,
                    offset: 4
                }
            },
            position: {
                column: 0,
                line: 0,
                offset: 0
            }
        });

        expect(obj(expr("+abc"))).toStrictEqual({
            type: "UnaryExpression",
            operator: "+",
            argument: {
                type: "VariableExpression",
                value: "abc",
                position: {
                    column: 1,
                    line: 0,
                    offset: 1
                }
            },
            position: {
                column: 0,
                line: 0,
                offset: 0
            }
        });

        expect(obj(expr("-abc"))).toStrictEqual({
            type: "UnaryExpression",
            operator: "-",
            argument: {
                type: "VariableExpression",
                value: "abc",
                position: {
                    column: 1,
                    line: 0,
                    offset: 1
                }
            },
            position: {
                column: 0,
                line: 0,
                offset: 0
            }
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
                        value: "abc",
                        position: {
                            column: 3,
                            line: 0,
                            offset: 3
                        }
                    },
                    position: {
                        column: 2,
                        line: 0,
                        offset: 2
                    }
                },
                position: {
                    column: 1,
                    line: 0,
                    offset: 1
                }
            },
            position: {
                column: 0,
                line: 0,
                offset: 0
            }
        });
    });

});