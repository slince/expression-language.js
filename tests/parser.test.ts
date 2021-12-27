// @ts-ignore
import {expr, obj, parse} from "./utils";
import * as ast from "../src/ast/ast";

describe('Parser', ()=> {

    test('stmt wrapper', () => {
        const code = `a + b`;
        expect(parse(code)).toBeInstanceOf(ast.BlockStatement);
    });

    test('variable', ()=> {
        expect(obj(expr("hello"))).toStrictEqual({
            type: "VariableExpression",
            value: "hello",
            raw: "hello",
            position: {
                column: 0,
                line: 0,
                offset: 0
            }
        });
    });
});
