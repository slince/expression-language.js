import SyntaxError from "./errors.js";

// token type enum
const TokenType = {
    T_EOF: 0, // eof
    T_STR: 1, // abc
    T_NUM: 2, // 123
    T_ID: 3, // foo
    T_ADD: 4, // +
    T_SUB: 5, // -
    T_MUL: 6, // *
    T_DIV: 7, // /
    T_MOD: 8, // %
    T_INC: 9, // ++
    T_DEC: 10, // --
    T_NOT: 11, // !
    T_NEQ: 12, // !=
    T_LEA: 13, // &
    T_AND: 14, // &&
    T_OR: 15, // ||
    T_ASSIGN: 16, // =
    T_GT: 17, // >
    T_GE: 18, // >=
    T_LT: 19, // <
    T_LE: 20, // <=
    T_EQ: 21, // ==
    T_LPAREN: 22, // (
    T_LBRACKET: 23, // [
    T_LBRACE: 24, // {
    T_RPAREN: 25,  // )
    T_RBRACKET: 26,   // ]
    T_RBRACE: 27,    // }
    T_COMMA: 28, // ,
    T_COLON: 29, // :
    T_SEMICOLON: 30, // ;
    T_DOT: 31, // .
    T_QUESTION_MARK: 32, // ?
};

// token name
const Tokens = {};
Tokens[TokenType.T_EOF] = 'eof';
Tokens[TokenType.T_STR] = 'string';
Tokens[TokenType.T_NUM] = 'number';
Tokens[TokenType.T_ID] = 'id';
Tokens[TokenType.T_ADD] = '+';
Tokens[TokenType.T_SUB] = '-';
Tokens[TokenType.T_MUL] = '*';
Tokens[TokenType.T_DIV] = '/';
Tokens[TokenType.T_MOD] = '%';
Tokens[TokenType.T_INC] = '++';
Tokens[TokenType.T_DEC] = '--';
Tokens[TokenType.T_NOT] = '!';
Tokens[TokenType.T_NEQ] = '!=';
Tokens[TokenType.T_LEA] = '&';
Tokens[TokenType.T_AND] = '&&';
Tokens[TokenType.T_OR] = '||';
Tokens[TokenType.T_ASSIGN] = '=';
Tokens[TokenType.T_GT] = '>';
Tokens[TokenType.T_GE] = '>=';
Tokens[TokenType.T_LT] = '<';
Tokens[TokenType.T_LE] = '<=';
Tokens[TokenType.T_EQ] = '==';
Tokens[TokenType.T_LPAREN] = '(';
Tokens[TokenType.T_LBRACKET] = '[';
Tokens[TokenType.T_LBRACE] = '{';
Tokens[TokenType.T_RPAREN] = ')';
Tokens[TokenType.T_RBRACKET] = ']';
Tokens[TokenType.T_RBRACE] = '}';
Tokens[TokenType.T_COMMA] = ',';
Tokens[TokenType.T_COLON] = ':';
Tokens[TokenType.T_SEMICOLON] = ';';
Tokens[TokenType.T_DOT] = '.';
Tokens[TokenType.T_QUESTION_MARK] = '?'

class Token
{
    constructor(type, value, position) {
        this.type = type;
        this.value = value;
        this.position = position;
    }

    test(type){
        return this.type === type;
    }
}

class TokenStream{

    constructor() {
        this.index = 0;
        this.tokens = [];
    }

    add(token){
        this.tokens.push(token);
    }

    current(){
        return this.tokens[this.index];
    }

    next(){
        return this.tokens[this.index ++]
    }

    look(){
        return this.tokens[this.index + 1];
    }

    expect(type, value,  message) {
        let token = this.current();
        if (!token.test(type, value)) {
            const message = `${message ? message+'. ' : ''}Unexpected token "${token.type}" of value "${token.value}" ("${type}" expected ${value ? 'with value ' + value : ''}}).`;
            throw new SyntaxError(message, token.position);
        }
        this.next();
        return token;
    }

    eof(){
        return this.tokens[this.index].type === TokenType.T_EOF;
    }
}

export {TokenType, Tokens, Token, TokenStream}