// @ts-ignore
import {expr, obj, parse} from "./utils";
import * as ast from "../src/ast/ast";

describe('Parser:Call', ()=> {

    test('function call', ()=> {
        expect(obj(expr("hello(123, 'abc')"))).toStrictEqual({
            args: [
                {
                    position: {
                        column: 6,
                        line: 0,
                        offset: 6
                    },
                    raw: '123',
                    type: 'LiteralExpression',
                    value: 123
                },
                {
                    position: {
                        column: 11,
                        line: 0,
                        offset: 11
                    },
                    raw: 'abc',
                    type: 'LiteralExpression',
                    value: 'abc'
                }
            ],
            callee: {
                position: {
                    column: 0,
                    line: 0,
                    offset: 0
                },
                type: 'VariableExpression',
                value: 'hello'
            },
            position: {
                column: 5,
                line: 0,
                offset: 5
            },
            type: 'CallExpression'
        });
    });

    test('method call', ()=> {
        expect(obj(expr("object.hello(123, 'abc')"))).toStrictEqual({
            args: [
                {
                    position: {
                        column: 13,
                        line: 0,
                        offset: 13
                    },
                    raw: '123',
                    type: 'LiteralExpression',
                    value: 123
                },
                {
                    position: {
                        column: 18,
                        line: 0,
                        offset: 18
                    },
                    raw: 'abc',
                    type: 'LiteralExpression',
                    value: 'abc'
                }
            ],
            callee: {
                computed: false,
                object: {
                    position: {
                        column: 0,
                        line: 0,
                        offset: 0
                    },
                    type: 'VariableExpression',
                    value: 'object'
                },
                position: {
                    column: 0,
                    line: 0,
                    offset: 0
                },
                property: {
                    position: {
                        column: 7,
                        line: 0,
                        offset: 7
                    },
                    type: 'Identifier',
                    value: 'hello'
                },
                type: 'MemberExpression'
            },
            position: {
                column: 0,
                line: 0,
                offset: 0
            },
            type: 'CallExpression'
        });
    });
});
