// @ts-ignore
import {parse} from "./utils";
import * as ast from "../src/ast/ast";

describe('Parser', ()=> {
    test('stmt wrapper', () => {
        const code = `a + b`;
        expect(parse(code)).toBeInstanceOf(ast.BlockStatement);
    });
});
