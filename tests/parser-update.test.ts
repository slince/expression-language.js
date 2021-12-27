// @ts-ignore
import {expr, obj, parse} from "./utils";
import * as ast from "../src/ast/ast";

describe('Parser:update', ()=> {

    test('prefix=true', ()=> {
        expect(obj(expr("++hello"))).toStrictEqual({
            argument: {
                position: {
                    column: 2,
                    line: 0,
                    offset: 2
                },
                type: 'VariableExpression',
                value: 'hello'
            },
            operator: '++',
            position: {
                column: 0,
                line: 0,
                offset: 0
            },
            prefix: true,
            type: 'UpdateExpression'
        });
        expect(obj(expr("--hello"))).toStrictEqual({
            argument: {
                position: {
                    column: 2,
                    line: 0,
                    offset: 2
                },
                type: 'VariableExpression',
                value: 'hello'
            },
            operator: '--',
            position: {
                column: 0,
                line: 0,
                offset: 0
            },
            prefix: true,
            type: 'UpdateExpression'
        });
    });

    test('prefix=false', ()=> {
        expect(obj(expr("hello++"))).toStrictEqual({
            argument: {
                position: {
                    column: 0,
                    line: 0,
                    offset: 0
                },
                type: 'VariableExpression',
                value: 'hello'
            },
            operator: '++',
            position: {
                column: 0,
                line: 0,
                offset: 0
            },
            prefix: false,
            type: 'UpdateExpression'
        });
        expect(obj(expr("hello--"))).toStrictEqual({
            argument: {
                position: {
                    column: 0,
                    line: 0,
                    offset: 0
                },
                type: 'VariableExpression',
                value: 'hello'
            },
            operator: '--',
            position: {
                column: 0,
                line: 0,
                offset: 0
            },
            prefix: false,
            type: 'UpdateExpression'
        });
    });
});
