// @ts-ignore
import {json, lex, obj} from "./utils";
import {TokenType} from "../src/token";

describe('Lexer', ()=>{

   // simple token
   test('simple string', ()=>{
      const expr = "simple string";
      const tokens = lex(expr);
      expect(tokens.current().value).toStrictEqual("simple");
      expect(tokens.look(1).value).toStrictEqual("string");
   });

   test('simple binary', ()=>{
      const expr = "a +";
      const tokens = lex(expr);
      expect(tokens.count()).toStrictEqual(3);
      expect(obj(tokens.current())).toStrictEqual({
         position: {
            column: 0,
            line: 0,
            offset: 0
         },
         type: TokenType.T_ID,
         value: "a"
      });
      expect(obj(tokens.look())).toStrictEqual({
         position: {
            column: 2,
            line: 0,
            offset: 2
         },
         type: TokenType.T_ADD,
         value: "+"
      });

   });

   test('simple unary', ()=>{
      const expr = "!+-!!a";
      const tokens = lex(expr);
      expect(tokens.count()).toStrictEqual(7);
      expect(obj(tokens.current())).toStrictEqual({
         position: {
            column: 0,
            line: 0,
            offset: 0
         },
         type: TokenType.T_NOT,
         value: "!"
      });
      expect(obj(tokens.look(2))).toStrictEqual({
         position: {
            column: 2,
            line: 0,
            offset: 2
         },
         type: TokenType.T_SUB,
         value: "-"
      });
   });

   test('simple keyword', ()=>{
      const expr = "not(a in b)";
      const tokens = lex(expr);
      expect(tokens.count()).toStrictEqual(7);
      expect(obj(tokens.current())).toStrictEqual({
         position: {
            column: 0,
            line: 0,
            offset: 0
         },
         type: TokenType.T_KW_NOT,
         value: "not"
      });
      expect(obj(tokens.look(3))).toStrictEqual({
         position: {
            column: 6,
            line: 0,
            offset: 6
         },
         type: TokenType.T_KW_IN,
         value: "in"
      });
   });

   test('simple method', ()=>{
      const expr = "a.read(b,c)";
      const tokens = lex(expr);
      expect(tokens.count()).toStrictEqual(9);
      expect(obj(tokens.look(2))).toStrictEqual({
         position: {
            column: 2,
            line: 0,
            offset: 2
         },
         type: TokenType.T_ID,
         value: "read"
      });
   });


   test('lex with multi line', ()=>{
      const expr = `
hello;
world;
      `;
      const tokens = lex(expr);
      expect(tokens.count()).toStrictEqual(5);
      expect(obj(tokens.look(2))).toStrictEqual({
         position: {
            column: 0,
            line: 2,
            offset: 8
         },
         type: TokenType.T_ID,
         value: "world"
      });
   });
})

