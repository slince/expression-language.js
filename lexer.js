import Lexer from "./src/lexer.js";
import Parser from "./src/parser.js";

const code = `
fruit.name == 'apple' ? sell(fruit, 5, "bob") : false
`;

const lexer = new Lexer(code);
const tokens = lexer.lex();

const parser = new Parser(tokens);
const stmts = parser.parse();
console.log(tokens, stmts);
console.log(JSON.stringify(stmts));