// @ts-ignore
import {expr, obj, parse} from "./utils";

describe('Parser: Complex operator', ()=> {

    test('complex binary', ()=> {
        expect(obj(expr("a + b * c / d"))).toStrictEqual({
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
                        position: {
                            column: 8,
                            line: 0,
                            offset: 8
                        },
                        type: 'VariableExpression',
                        value: 'c'
                    },
                    type: 'BinaryExpression'
                },
                operator: '/',
                position: {
                    column: 4,
                    line: 0,
                    offset: 4
                },
                right: {
                    position: {
                        column: 12,
                        line: 0,
                        offset: 12
                    },
                    type: 'VariableExpression',
                    value: 'd'
                },
                type: 'BinaryExpression'
            },
            type: 'BinaryExpression'
        });
    });

    test('complex binary & unary & paren', ()=> {
        expect(obj(expr("a + b * (++c + d) / e"))).toStrictEqual({
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
                            value: 'd'
                        },
                        type: 'BinaryExpression'
                    },
                    type: 'BinaryExpression'
                },
                operator: '/',
                position: {
                    column: 4,
                    line: 0,
                    offset: 4
                },
                right: {
                    position: {
                        column: 20,
                        line: 0,
                        offset: 20
                    },
                    type: 'VariableExpression',
                    value: 'e'
                },
                type: 'BinaryExpression'
            },
            type: 'BinaryExpression'
        });
    });
});
