// @ts-ignore
import {eval2, json, lex, obj} from "./utils";
import {TokenType} from "../src/token";
import {RuntimeError} from "../src/errors";

describe('Evaluator', ()=> {

    test('simple literal', ()=>{

        expect(eval2('12')).toStrictEqual(12);
        expect(eval2('12.35')).toStrictEqual(12.35);
        expect(eval2('"abc"')).toStrictEqual("abc");
        expect(eval2('true')).toStrictEqual(true);
        expect(eval2('false')).toStrictEqual(false);
        expect(eval2('null')).toStrictEqual(null);

    })

    test('simple variable', ()=>{
        expect(eval2('a', {a: 12})).toStrictEqual(12);
        expect(eval2('{"a": "b", "c": 10}')).toStrictEqual({
            a: "b",
            c: 10
        });
        expect(eval2('[1,2,"a"]')).toStrictEqual([1,2,"a"]);
    })

    test("operator", ()=>{
        expect(eval2('a+b', {a: 10, b: 12})).toStrictEqual(22);
        expect(eval2('a+a+2', {a: 10})).toStrictEqual(22);
        expect(eval2('a+a*2/b', {a: 10, b: 10})).toStrictEqual(12);
        expect(eval2('a*(b+2)', {a: 10, b: 10})).toStrictEqual(120);

    })

    test("bit operator", ()=>{
        expect(eval2('a | b', {a: 10, b: 12})).toStrictEqual(14);
        expect(eval2('a ^ b', {a: 10, b: 12})).toStrictEqual(6);
        expect(eval2('a & b', {a: 10, b: 12})).toStrictEqual(8);
    })

    test("logic operator", ()=>{
        expect(eval2('a > b', {a: 10, b: 12})).toStrictEqual(false);
        expect(eval2('a < b', {a: 10, b: 12})).toStrictEqual(true);
        expect(eval2('a <= b', {a: 10, b: 10})).toStrictEqual(true);
        expect(eval2('a in b', {a: 10, b: [10, 12]})).toStrictEqual(true);
    })


    test("unary", ()=>{
        expect(eval2('+a', {a: 10})).toStrictEqual(10);
        expect(eval2('-a', {a: 10})).toStrictEqual(-10);
        expect(eval2('!a', {a: false})).toStrictEqual(true);
        expect(eval2('not a', {a: false})).toStrictEqual(true);
    })

    test("update", ()=>{
        expect(eval2('++a', {a: 10})).toStrictEqual(11);
        expect(eval2('a++', {a: 10})).toStrictEqual(10);
        expect(eval2('a++;a', {a: 10})).toStrictEqual(11);
        expect(eval2('--a', {a: 10})).toStrictEqual(9);
        expect(eval2('a--', {a: 10})).toStrictEqual(10);
        expect(eval2('a--;a', {a: 10})).toStrictEqual(9);

        expect(eval2('++a.b', {a: {b: 12}})).toStrictEqual(13);
        expect(eval2('a.b++;a.b', {a: {b: 12}})).toStrictEqual(13);
        expect(eval2('--a.b', {a: {b: 12}})).toStrictEqual(11);
        expect(eval2('a.b--;a.b', {a: {b: 12}})).toStrictEqual(11);
    })

    test('member', ()=>{
        expect(eval2('a.b', {a: {b: 12}})).toStrictEqual(12);
        expect(eval2('a.b()', {a: {b: ()=>{return 12}}})).toStrictEqual(12);

    })

    test('call', ()=>{
        expect(eval2('a.b(12)', {a: {b: (a: number)=>a}})).toStrictEqual(12);
        expect(eval2('say("hello", "world")', {say: (left: string, right: string)=> left + right})).toStrictEqual("helloworld");
    })

    test("stmt", ()=>{
        expect(eval2('a;b', {a: 10, b: 12})).toStrictEqual(12);
        expect(eval2('a;a+2', {a: 10})).toStrictEqual(12);
        expect(eval2('a=10;a+2')).toStrictEqual(12);
        expect(eval2('a=10;b=a+2;b')).toStrictEqual(12);

        expect(eval2('c=++a.b;c', {a: {b: 12}})).toStrictEqual(13);
        try {
            eval2('c=++a.c', {a: {b: 12}})
        } catch (error) {
            expect(error).toBeInstanceOf(RuntimeError);
        }
    })
});