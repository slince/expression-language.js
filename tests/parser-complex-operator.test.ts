// @ts-ignore
import {expr, obj, parse} from "./utils";

describe('Parser: Complex operator', ()=> {

    test('complex binary & unary & paren', ()=> {
        expect(obj(expr("a + b * c / d"))).toStrictEqual('');
    });
});
