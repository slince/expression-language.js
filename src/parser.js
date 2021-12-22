import {Token, Tokens, TokenType} from "./token.js";
import Identifier from "./ast/identifier.js";
import FunctionCallExpression from "./ast/expr/function_call.js";
import PropertyAccessExpression from "./ast/expr/property_access.js";
import ArrayExpression from "./ast/expr/array.js";
import LiteralExpression from "./ast/expr/literal.js";
import AssignStatement from "./ast/stmt/assign.js";
import {MapExpression} from "./ast/expr/map.js";
import SyntaxError from "./errors.js";
import BinaryExpression from "./ast/expr/binary.js";
import ExpressionStatement from "./ast/stmt/expr.js";
import MethodCallExpression from "./ast/expr/method_call.js";

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

    parse(){
        return this.parseBlock();
    }

    parseBlock(){
        const stmts = [];
        while (!this.tokens.eof()) {
            stmts.push(this.parseStatement());
        }
        return stmts;
    }

    parseStatement(){
        const token = this.tokens.current();
        let stmt;
        if (token.test(TokenType.T_ID) && this.tokens.look().test(TokenType.T_ASSIGN)) {
            stmt = this.parseAssignStatement();
        } else {
            stmt = new ExpressionStatement(this.parseExpression(), token.position);
        }
        this.tokens.expect(TokenType.T_SEMICOLON);
        return stmt;
    }

    parseAssignStatement(){
        const token = this.tokens.current();
        const variable = new LiteralExpression(token.value, token.value, token.position);
        return new AssignStatement(variable, this.parseExpression(), token.lineno);
    }

    parseExpression(){
        let expr = this.parsePrimaryExpression();
        while (this.isOperatorToken()) {
            expr = this.parseBinaryExpression(0, expr);
        }
        return expr;
    }

    parsePrimaryExpression(){
        const token = this.tokens.current();
        let expr;
        switch (token.type) {
            // constant
            case TokenType.T_STR:
            case TokenType.T_NUM:
                expr = new LiteralExpression(token.value, token.value, token.position);
                this.tokens.next();
                break;
            // identifier
            case TokenType.T_ID:
                expr = this.parseIdentifierExpression();
                break;
            // punctuation
            case TokenType.T_LBRACKET:
                expr = this.parseArrayExpression(token);
                break;
            case TokenType.T_LBRACE:
                expr = this.parseMapExpression(token);
                break;
            default:
                throw new SyntaxError(`Unexpected token "${token.type}" of value "${token.value}".`);
        }
        expr = this.parsePosixExpression(expr);
        return expr;
    }

    parsePosixExpression(expr){
        while (true) {
            const token = this.tokens.current();
            if (token.test(TokenType.T_LPAREN)) {
                expr = new FunctionCallExpression(expr, this.parseArguments(), token.position);
            } else if (token.test(TokenType.T_DOT)) {
                expr = this.parseObjectExpression(token, expr);
            } else {
                break;
            }
        }
        return expr;
    }

    parseIdentifierExpression(){
        const token = this.tokens.current();
        let expr;
        switch (token.value) {
            case 'true':
            case 'TRUE':
                expr = new LiteralExpression(true, token.value, token.position);
                break;
            case 'false':
            case 'FALSE':
                expr = new LiteralExpression(false, token.value, token.position);
                break;
            case 'null':
            case 'NULL':
                expr = new LiteralExpression(null, token.value, token.position);
                break;
            default:
                expr = new Identifier(token.value, token.position);
        }
        this.tokens.next();
        return expr;
    }

    parseObjectExpression(token, object){
        this.tokens.expect(TokenType.T_DOT);
        const member = this.tokens.expect(TokenType.T_ID);
        let expr;
        if (this.tokens.current().test(TokenType.T_LPAREN)) { // object method
            expr = new MethodCallExpression(object, member, this.parseArguments(), token.position);
        } else {
            expr = new PropertyAccessExpression(object, member, token.position);
        }
        return expr;
    }

    parseBinaryExpression(precedence, left){
        // a + b * c / d
        // a * b + c
        while (this.isOperatorToken()) {
            const operator = Tokens[this.tokens.current().type];
            const tokenPrecedence = this.currentTokenPrecedence();
            if (tokenPrecedence < precedence) {
                break;
            }
            this.tokens.next();
            let right = this.parsePrimaryExpression();
            const nextPrecedence = this.currentTokenPrecedence();
            if (tokenPrecedence < nextPrecedence) {
                right = this.parseBinaryExpression(tokenPrecedence, right);
            }

            left = new BinaryExpression(left, operator, right);
            precedence = tokenPrecedence;
        }
        return left;
    }

    isOperatorToken(){
        return typeof binaryOperators[Tokens[this.tokens.current().type]] !== 'undefined';
    }

    currentTokenPrecedence(){
        const current = this.tokens.current();
        if (typeof binaryOperators[Tokens[current.type]] !== 'undefined') {
            return binaryOperators[Tokens[current.type]].precedence;
        }
        return -1;
    }

    parseArrayExpression(token){
        const expr = new ArrayExpression([], token.position);
        while (!this.tokens.current().test(TokenType.T_RBRACKET)) {
            if (!expr.isEmpty()) {
                this.tokens.expect(TokenType.T_COMMA, null, 'An array element must be followed by a comma');
            }
            expr.addElement(this.parseExpression());
        }
        this.tokens.expect(TokenType.T_RBRACKET, null, 'An array element must be closed by a brackets');
        return expr;
    }

    parseMapExpression(token){
        this.tokens.expect(TokenType.T_LBRACE, null, 'A map must begin with an opening braces');
        const expr = new MapExpression([], token.position);
        while (!this.tokens.current().test(TokenType.T_RBRACE)) {
            if (!expr.isEmpty()) {
                this.tokens.expect(TokenType.T_COMMA, null, 'A map must be followed by a comma');
            }
            const key = this.tokens.expect(TokenType.T_STR, null, 'A map key must be a string');
            this.tokens.expect(TokenType.T_COLON, null, 'The map key and value must be separated by a colon(:)');
            const value = this.parseExpression();
            expr.addElement(new LiteralExpression(key.value, key.value, key.position), value);
        }
        this.tokens.expect(TokenType.T_RBRACE, null, 'A map must be closed by a braces');
        return expr;
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