import {SyntaxError} from "./errors";
import Position from "./position";

// token type enum
export const enum TokenType {
    T_EOF, // eof
    T_STR, // abc
    T_NUM, // 123
    T_ID, // foo
    // punctuation
    T_ADD, // +
    T_SUB, // -
    T_MUL, // *
    T_DIV, // /
    T_MOD, // %

    T_AMP,  // &
    T_PIPE, // |
    T_XOR,  // ^
    T_SHL,  // <<
    T_SHR,  // >>

    T_INC, // ++
    T_DEC, // --
    T_NOT, // !
    T_NEQ, // !=
    T_AND, // &&
    T_OR, // ||
    T_ASSIGN, // =
    T_GT, // >
    T_GE, // >=
    T_LT, // <
    T_LE, // <=
    T_EQ, // ==
    T_LPAREN, // (
    T_LBRACKET, // [
    T_LBRACE, // {
    T_RPAREN,  // )
    T_RBRACKET,   // ]
    T_RBRACE,    // }
    T_COMMA, // ,
    T_COLON, // =
    T_SEMICOLON, // ;
    T_DOT, // .
    T_QUESTION, // ?
    T_KW_BEGIN,
    T_KW_NOT, // not
    T_KW_OR, // or
    T_KW_AND, // and
    T_KW_IN, // in
    T_KW_END
}

// token name
export const Tokens: {[key: number]: string} = {};

Tokens[TokenType.T_EOF] = 'eof';
Tokens[TokenType.T_STR] = 'string';
Tokens[TokenType.T_NUM] = 'number';
Tokens[TokenType.T_ID] = 'id';
Tokens[TokenType.T_ADD] = '+';
Tokens[TokenType.T_SUB] = '-';
Tokens[TokenType.T_MUL] = '*';
Tokens[TokenType.T_DIV] = '/';
Tokens[TokenType.T_MOD] = '%';

Tokens[TokenType.T_AMP] = '&';
Tokens[TokenType.T_PIPE] = '|';
Tokens[TokenType.T_XOR] = '^';
Tokens[TokenType.T_SHL] = '<<';
Tokens[TokenType.T_SHR] = '>>';

Tokens[TokenType.T_INC] = '++';
Tokens[TokenType.T_DEC] = '--';
Tokens[TokenType.T_NOT] = '!';
Tokens[TokenType.T_NEQ] = '!=';
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
Tokens[TokenType.T_QUESTION] = '?'
// keywords
Tokens[TokenType.T_KW_NOT] = 'not'
Tokens[TokenType.T_KW_OR] = 'or'
Tokens[TokenType.T_KW_AND] = 'and'
Tokens[TokenType.T_KW_IN] = 'in'

// list all keywords.
const keywords: {[key: string]: TokenType} = {
    'not': TokenType.T_KW_NOT,
    'or': TokenType.T_KW_OR,
    'and': TokenType.T_KW_AND,
    'in': TokenType.T_KW_IN,
};

// binary & unary
const enum OperatorAssociativity {
    Left = 1,
    Right = 2
}

interface OperatorPrecedence{
    precedence: number,
    associativity?: OperatorAssociativity,
}

const defaultOperatorPrecedence: OperatorPrecedence = {
    precedence: -1
}

const binaryOperators: {[key: string]: OperatorPrecedence} = {
    'or': {'precedence': 10, 'associativity': OperatorAssociativity.Left},
    '||': {'precedence': 10, 'associativity': OperatorAssociativity.Left},
    'and': {'precedence': 15, 'associativity': OperatorAssociativity.Left},
    '&&': {'precedence': 15, 'associativity': OperatorAssociativity.Left},
    '|': {'precedence': 16, 'associativity': OperatorAssociativity.Left},
    '^': {'precedence': 17, 'associativity': OperatorAssociativity.Left},
    '&': {'precedence': 18, 'associativity': OperatorAssociativity.Left},
    '==': {'precedence': 20, 'associativity': OperatorAssociativity.Left},
    '!=': {'precedence': 20, 'associativity': OperatorAssociativity.Left},
    '<': {'precedence': 20, 'associativity': OperatorAssociativity.Left},
    '>': {'precedence': 20, 'associativity': OperatorAssociativity.Left},
    '>=': {'precedence': 20, 'associativity': OperatorAssociativity.Left},
    '<=': {'precedence': 20, 'associativity': OperatorAssociativity.Left},
    'not in': {'precedence': 20, 'associativity': OperatorAssociativity.Left},
    'in': {'precedence': 20, 'associativity': OperatorAssociativity.Left},
    '<<': {'precedence': 25, 'associativity': OperatorAssociativity.Left},
    '>>': {'precedence': 25, 'associativity': OperatorAssociativity.Left},
    '+': {'precedence': 30, 'associativity': OperatorAssociativity.Left},
    '-': {'precedence': 30, 'associativity': OperatorAssociativity.Left},
    '~': {'precedence': 40, 'associativity': OperatorAssociativity.Left},
    '*': {'precedence': 60, 'associativity': OperatorAssociativity.Left},
    '/': {'precedence': 60, 'associativity': OperatorAssociativity.Left},
    '%': {'precedence': 60, 'associativity': OperatorAssociativity.Left},
};

const unaryOperators: {[key: string]: OperatorPrecedence} = {
    'not': {'precedence': 50},
    '!': {'precedence': 50},
    '-': {'precedence': 500},
    '+': {'precedence': 500},
    '--': {'precedence': 500},
    '++': {'precedence': 500},
};

// keyword utils.
export const Keyword = {
    lookup: function(identifier: string): TokenType {
        if (typeof keywords[identifier] !== 'undefined') {
            return keywords[identifier];
        }
        return TokenType.T_ID;
    },
    isKeyword(type: TokenType): boolean{
        return TokenType.T_KW_BEGIN < type && type < TokenType.T_KW_END
    }
};

export class Token{
    type: TokenType;
    value: string;
    position: Position;

    constructor(type: TokenType, value: string, position: Position) {
        this.type = type;
        this.value = value;
        this.position = position;
    }

    // test whether the token match the given token type
    test(type: TokenType){
        return this.type === type;
    }

    testAny(...types: TokenType[]){
        return types.indexOf(this.type) > -1;
    }

    isBinaryOperator(): boolean{
        return typeof binaryOperators[Tokens[this.type]] !== 'undefined';
    }

    getBinaryPrecedence(): OperatorPrecedence{
        if (this.isBinaryOperator()) {
            return binaryOperators[Tokens[this.type]];
        }
        return defaultOperatorPrecedence;
    }
}

export class TokenStream{
    index: number;
    tokens: Token[];

    constructor() {
        this.index = 0;
        this.tokens = [];
    }

    add(token: Token){
        this.tokens.push(token);
    }

    current(): Token{
        return this.tokens[this.index];
    }

    next(): Token{
        return this.tokens[this.index ++]
    }

    look(number?: number): Token{
        return this.tokens[this.index + (number || 1)];
    }

    expect(type: TokenType, message?: string): Token {
        const token = this.current();
        const value = Tokens[type];
        if (!token.test(type)) {
            message = `${message ? message+'. ' : ''}Unexpected token "${token.type}" of value "${token.value}" ("${type}" expected ${value ? 'with value ' + value : ''}).`;
            throw new SyntaxError(message, token.position);
        }
        this.next();
        return token;
    }

    expectOneOf(...types: TokenType[]) {
        const token = this.current();
        if (!token.testAny(...types)) {
            const values = types.map((type)=>Tokens[type] || '');
            const message = `Unexpected token "${token.type}" of value "${token.value}" ("${types.join(',')}" expected ${values ? 'with value ' + values.join(',') : ''}).`;
            throw new SyntaxError(message, token.position);
        }
        this.next();
        return token;
    }

    eof(): boolean{
        return this.tokens[this.index].type === TokenType.T_EOF;
    }
}