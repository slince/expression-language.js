import Lexer from "./src/lexer.js";

const code = `
fruit.name == 'apple' ? sell(fruit, 5, "bob") : false
`;

const lexer = new Lexer(code);
const tokens = lexer.lex();

console.log(tokens);