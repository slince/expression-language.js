import Lexer from "./src/lexer.js";

const code = `
apple.name == 'pear' && sell(apple)
`;

const lexer = new Lexer(code);
const tokens = lexer.lex();

console.log(tokens);