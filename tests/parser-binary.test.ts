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


    test('complex binary & unary & paren', ()=> {
        expect(obj(expr("a + b * (++c + b) / d"))).toStrictEqual({
            left: {
                left: {
                    position: {
                        column: 0,
                        line: 0,
                        offset: 0
                    },
                    type: 'VariableExpression',
                    value: 'a'
                },
                operator: '+',
                position: {
                    column: 0,
                    line: 0,
                    offset: 0
                },
                right: {
                    left: {
                        position: {
                            column: 4,
                            line: 0,
                            offset: 4
                        },
                        type: 'VariableExpression',
                        value: 'b'
                    },
                    operator: '*',
                    position: {
                        column: 4,
                        line: 0,
                        offset: 4
                    },
                    right: {
                        left: {
                            argument: {
                                position: {
                                    column: 11,
                                    line: 0,
                                    offset: 11
                                },
                                type: 'VariableExpression',
                                value: 'c'
                            },
                            operator: '++',
                            position: {
                                column: 9,
                                line: 0,
                                offset: 9
                            },
                            prefix: true,
                            type: 'UpdateExpression'
                        },
                        operator: '+',
                        position: {
                            column: 9,
                            line: 0,
                            offset: 9
                        },
                        right: {
                            position: {
                                column: 15,
                                line: 0,
                                offset: 15
                            },
                            type: 'VariableExpression',
                            value: 'b'
                        },
                        type: 'BinaryExpression'
                    },
                    type: 'BinaryExpression'
                },
                type: 'BinaryExpression'
            },
            operator: '/',
            position: {
                column: 0,
                line: 0,
                offset: 0
            },
            right: {
                position: {
                    column: 20,
                    line: 0,
                    offset: 20
                },
                type: 'VariableExpression',
                value: 'd'
            },
            type: 'BinaryExpression'
        });
    });
});