import {Tokens, TokenType} from "./token";
import Identifier from "./ast/identifier";
import FunctionCallExpression from "./ast/expr/function_call";
import PropertyAccessExpression from "./ast/expr/property_access";
import ArrayExpression from "./ast/expr/array";
import LiteralExpression from "./ast/expr/literal";
import AssignStatement from "./ast/stmt/assign";
import {MapExpression} from "./ast/expr/map";
import SyntaxError from "./errors";
import BinaryExpression from "./ast/expr/binary";

const OPERATOR_LEFT = 1;
const OPERATOR_RIGHT = 2;
const binaryOperators = {
    'or': {'precedence': 10, 'associativity': OPERATOR_LEFT},
    '||': {'precedence': 10, 'associativity': OPERATOR_LEFT},
    'and': {'precedence': 15, 'associativity': OPERATOR_LEFT},
    '&&': {'precedence': 15, 'associativity': OPERATOR_LEFT},
    '|': {'precedence': 16, 'associativity': OPERATOR_LEFT},
    '^': {'precedence': 17, 'associativity': OPERATOR_LEFT},
    '&': {'precedence': 18, 'associativity': OPERATOR_LEFT},
    '==': {'precedence': 20, 'associativity': OPERATOR_LEFT},
    '!=': {'precedence': 20, 'associativity': OPERATOR_LEFT},
    '<': {'precedence': 20, 'associativity': OPERATOR_LEFT},
    '>': {'precedence': 20, 'associativity': OPERATOR_LEFT},
    '>=': {'precedence': 20, 'associativity': OPERATOR_LEFT},
    '<=': {'precedence': 20, 'associativity': OPERATOR_LEFT},
    'not in': {'precedence': 20, 'associativity': OPERATOR_LEFT},
    'in': {'precedence': 20, 'associativity': OPERATOR_LEFT},
    '..': {'precedence': 25, 'associativity': OPERATOR_LEFT},
    '+': {'precedence': 30, 'associativity': OPERATOR_LEFT},
    '-': {'precedence': 30, 'associativity': OPERATOR_LEFT},
    '~': {'precedence': 40, 'associativity': OPERATOR_LEFT},
    '*': {'precedence': 60, 'associativity': OPERATOR_LEFT},
    '/': {'precedence': 60, 'associativity': OPERATOR_LEFT},
    '%': {'precedence': 60, 'associativity': OPERATOR_LEFT},
    '**': {'precedence': 200, 'associativity': OPERATOR_RIGHT},
};

class Parser{

    constructor(tokens) {
        this.tokens = tokens;
    }

    parse(context){
        const token = this.tokens.current();
        while (token.test(TokenType)) {

        }
    }

    parseExpression(){
        return this.parsePrimaryExpression();
    }

    parsePrimaryExpression(){
        const token = this.tokens.current();
        let node;
        switch (token.type) {
            // constant
            case TokenType.T_STR:
            case TokenType.T_NUM:
                node = new LiteralExpression(token.value, token.value, token.position);
                break;
            // identifier
            case TokenType.T_ID:
                node = this.parseIdentifierExpression();
                break;
            // punctuation
            case TokenType.T_LPAREN:
                node = this.parseArrayExpression(token);
                break;
            case TokenType.T_LBRACE:
                node = this.parseMapExpression(token);
                break;
            default:
                throw new SyntaxError(`Unexpected token "${token.type}" of value "${token.value}".`);
        }

        return node;
    }

    parseIdentifierExpression(){
        const token = this.tokens.current();
        let node;
        this.tokens.next();
        switch (token.value) {
            case 'true':
            case 'TRUE':
                node = new LiteralExpression(true, token.value, token.position);
                break;
            case 'false':
            case 'FALSE':
                node = new LiteralExpression(false, token.value, token.position);
                break;
            case 'null':
            case 'NULL':
                node = new LiteralExpression(null, token.value, token.position);
                break;
            default:
                const identifier = new Identifier(token.value, token.position);
                const next = this.tokens.current();
                if (next.test(TokenType.T_ASSIGN)) {     // fruit = 'apple';
                    node = new AssignStatement(identifier, this.parseExpression(), token.position);
                } else if (next.test(TokenType.T_LPAREN)) {  // sell_fruit(fruit, 'bob')
                    node = new FunctionCallExpression(identifier, this.parseArguments(), token.position);
                } else if (next.test(TokenType.T_DOT)) {     // fruit.name
                    node = new PropertyAccessExpression(identifier, this.parseExpression(), token.position);
                } else if (typeof binaryOperators[Tokens[next.type]] !== 'undefined') {
                    // a + b / c * d
                    // a + b + c + d
                    while (typeof binaryOperators[Tokens[this.tokens.current().type]] !== 'undefined') {
                        const current = this.tokens.current();
                        this.tokens.next();
                        const expr = new BinaryExpression(identifier, Tokens[current.type], this.parseExpression());
                    }
                }
        }
        return node;
    }

    parseBinaryExpression(precedence, left){
        // a + b * c / d
        // a * b + c
        while (typeof binaryOperators[Tokens[this.tokens.current().type]] !== 'undefined') {
            const operator = Tokens[this.tokens.current().type];
            const currentPrecedence = this.currentTokenPrecedence();
            if (currentPrecedence < precedence) {
                break;
            }
            this.tokens.next();
            let right = this.parsePrimaryExpression();

            const nextPrecedence = this.currentTokenPrecedence();
            if (currentPrecedence < nextPrecedence) {
                right = this.parseBinaryExpression(currentPrecedence, right);
            }
            left = new BinaryExpression(left, operator, right);
        }
        return left;
    }

    currentTokenPrecedence(){
        const current = this.tokens.current();
        if (typeof binaryOperators[Tokens[current.type]] !== 'undefined') {
            return binaryOperators[Tokens[current.type]].precedence;
        }
        return -1;
    }

    parseArrayExpression(token){
        const node = new ArrayExpression([], token.position);
        while (!this.tokens.current().test(TokenType.T_RBRACKET)) {
            if (!node.isEmpty()) {
                this.tokens.expect(TokenType.T_COMMA, null, 'An array element must be followed by a comma');
            }
            node.addElement(this.parseExpression());
        }
        this.tokens.expect(TokenType.T_RBRACKET, null, 'An array element must be closed by a brackets');
        return node;
    }

    parseMapExpression(token){
        this.tokens.expect(TokenType.T_LBRACE, null, 'A map must begin with an opening braces');
        const node = new MapExpression([], token.position);
        while (!this.tokens.current().test(TokenType.T_RBRACE)) {
            if (!node.isEmpty()) {
                this.tokens.expect(TokenType.T_COMMA, null, 'A map must be followed by a comma');
            }
            const key = this.tokens.expect(TokenType.T_STR, null, 'A map key must be a string');
            this.tokens.expect(TokenType.T_COLON, null, 'The map key and value must be separated by a colon(:)');
            const value = this.parseExpression();
            node.addElement(new LiteralExpression(key.value, key.value, key.position), value);
        }
        this.tokens.expect(TokenType.T_RBRACE, null, 'A map must be closed by a braces');
        return node;
    }

    parseArguments(){
        // the_foo_func(1, "foo")
        const args = [];
        this.tokens.expect(TokenType.T_LPAREN, null, 'A list of arguments must begin with an opening parenthesis');
        while (!this.tokens.current().test(TokenType.T_RPAREN)) {
            if (args.length > 0) { // the prev arguments is exists.
                this.tokens.expect(TokenType.T_COMMA, null, 'Arguments must be separated by a comma');
            }
            args.push(this.parseExpression());
        }
        this.tokens.expect(TokenType.T_RPAREN, null, 'A list of arguments must be closed by a parenthesis');
        return args;
    }
}

export default Parser;