// @ts-ignore
import {expr, obj, parse} from "./utils";
import * as ast from "../src/ast/ast";

describe('Parser:Member', ()=> {


    test('property', ()=> {
        expect(obj(expr("object.hello"))).toStrictEqual({
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
        });
    });

    test('method', ()=> {
        expect(obj(expr("object.hello('a')"))).toStrictEqual({
            args: [
                {
                    position: {
                        column: 13,
                        line: 0,
                        offset: 13
                    },
                    raw: 'a',
                    type: 'LiteralExpression',
                    value: 'a'
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
