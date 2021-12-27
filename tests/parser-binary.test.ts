// @ts-ignore
import {parse, expr, json, obj} from "./utils";

describe('Parser:Binary', ()=>{

    test('simple binary', ()=>{

        expect(obj(expr("a+b"))).toStrictEqual({
            type: "BinaryExpression",
            left: {
                type: "VariableExpression",
                value: "a",
                position: {
                    column: 0,
                    line: 0,
                    offset: 0
                }
            },
            operator: "+",
            right: {
                type: "VariableExpression",
                value: "b",
                position: {
                    column: 2,
                    line: 0,
                    offset: 2
                }
            },
            position: {
                column: 0,
                line: 0,
                offset: 0
            }
        });

        expect(obj(expr("a+b-c"))).toStrictEqual({
            type: "BinaryExpression",
            left: {
                type: "BinaryExpression",
                left: {
                    type: "VariableExpression",
                    value: "a",
                    position: {
                        column: 0,
                        line: 0,
                        offset: 0
                    }
                },
                operator: "+",
                right: {
                    type: "VariableExpression",
                    value: "b",
                    position: {
                        column: 2,
                        line: 0,
                        offset: 2
                    }
                },
                position: {
                    column: 0,
                    line: 0,
                    offset: 0
                }
            },
            operator: "-",
            right: {
                type: "VariableExpression",
                value: "c",
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
    });

    test('complex binary', ()=> {

        expect(obj(expr("a+b*c+d"))).toStrictEqual({
            type: 'BinaryExpression',
            left: {
                type: 'BinaryExpression',
                left: {
                    type: 'VariableExpression',
                    position: {
                        column: 0,
                        line: 0,
                        offset: 0
                    },
                    value: 'a'
                },
                operator: '+',
                position: {
                    column: 0,
                    line: 0,
                    offset: 0
                },
                right: {
                    type: 'BinaryExpression',
                    left: {
                        type: 'VariableExpression',
                        position: {
                            column: 2,
                            line: 0,
                            offset: 2
                        },
                        value: 'b'
                    },
                    operator: '*',
                    position: {
                        column: 2,
                        line: 0,
                        offset: 2
                    },
                    right: {
                        type: 'VariableExpression',
                        position: {
                            column: 4,
                            line: 0,
                            offset: 4
                        },
                        value: 'c'
                    }
                }
            },
            operator: '+',
            position: {
                column: 0,
                line: 0,
                offset: 0
            },
            right: {
                type: 'VariableExpression',
                position: {
                    column: 6,
                    line: 0,
                    offset: 6
                },
                value: 'd'
            },
        });
    });

});