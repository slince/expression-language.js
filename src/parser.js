import {TokenType} from "./token.js";
import Identifier from "./ast/identifier.js";
import FunctionCallExpression from "./ast/expr/function_call.js";
import PropertyAccessExpression from "./ast/expr/property_access.js";
import ArrayExpression from "./ast/expr/array.js";
import LiteralExpression from "./ast/expr/literal.js";
import AssignStatement from "./ast/stmt/assign.js";
import {MapExpression} from "./ast/expr/map.js";
import {SyntaxError} from "./errors.js";
import BinaryExpression from "./ast/expr/binary.js";
import ExpressionStatement from "./ast/stmt/expr.js";
import MethodCallExpression from "./ast/expr/method_call.js";
import BlockStatement from "./ast/stmt/block.js";

class Parser{

    constructor(tokens) {
        this.tokens = tokens;
    }

    parse(){
        const token = this.tokens.current();
        const stmts = [];
        while (!this.tokens.eof()) {
            stmts.push(this.parseStatement());
        }
        return new BlockStatement(stmts, token.position);
    }

    parseStatement(){
        const token = this.tokens.current();
        let stmt;
        if (token.test(TokenType.T_ID) && this.tokens.look().test(TokenType.T_ASSIGN)) {
            stmt = this.parseAssignStatement();
        } else if (token.test(TokenType.T_LBRACE) && !this.tokens.look().test(TokenType.T_RBRACE) && !this.tokens.look(2).test(TokenType.T_COLON)) {
            stmt = this.parseBlockStatement();
        } else {
            stmt = new ExpressionStatement(this.parseExpression(), token.position);
        }
        if (!this.tokens.current().test(TokenType.T_EOF)) {
            this.tokens.expect(TokenType.T_SEMICOLON);
        }
        return stmt;
    }

    parseBlockStatement(){
        this.tokens.expect(TokenType.T_LBRACE, 'A block must begin with an opening braces');
        const token = this.tokens.current();
        const stmts = [];
        while (!this.tokens.current().test(TokenType.T_RBRACE)) {
            stmts.push(this.parseStatement());
        }
        this.tokens.expect(TokenType.T_RBRACE, 'A block must be closed by a braces');
        return new BlockStatement(stmts, token.position);
    }

    parseAssignStatement(){
        const token = this.tokens.current();
        const variable = new Identifier(token.value, token.position);
        return new AssignStatement(variable, this.parseExpression(), token.lineno);
    }

    parseExpression(){
        let expr = this.parsePrimaryExpression();
        while (this.tokens.current().isOperator()) {
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
                expr = new LiteralExpression(token.value, token.value, token.position);
                this.tokens.next();
                break;
            case TokenType.T_NUM:
                expr = new LiteralExpression(Number(token.value), token.value, token.position);
                this.tokens.next();
                break;
            // identifier
            case TokenType.T_ID:
                expr = this.parseIdentifierExpression();
                break;
            // punctuation
            case TokenType.T_LBRACKET:
                expr = this.parseArrayExpression();
                break;
            case TokenType.T_LBRACE:
                expr = this.parseMapExpression();
                break;
            case TokenType.T_LPAREN:
                expr = this.parseParenExpression();
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
                expr = this.parseObjectExpression(expr);
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

    parseObjectExpression(object){
        const token = this.tokens.current();
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
        while (this.tokens.current().isOperator()) {
            const token = this.tokens.current();
            const operator = token.value;
            const currentPrecedence = token.getPrecedence();
            if (currentPrecedence < precedence) {
                break;
            }
            this.tokens.next();
            let right = this.parsePrimaryExpression();
            const nextPrecedence = this.tokens.current().getPrecedence();
            if (currentPrecedence < nextPrecedence) {
                right = this.parseBinaryExpression(currentPrecedence, right);
            }

            left = new BinaryExpression(left, operator, right);
            precedence = currentPrecedence;
        }
        return left;
    }

    parseParenExpression(){
        this.tokens.expect(TokenType.T_LPAREN);
        const expr = this.parseExpression();
        this.tokens.expect(TokenType.T_RPAREN);
        return expr;
    }

    parseArrayExpression(){
        const token = this.tokens.current();
        const expr = new ArrayExpression([], token.position);
        while (!this.tokens.current().test(TokenType.T_RBRACKET)) {
            if (!expr.isEmpty()) {
                this.tokens.expect(TokenType.T_COMMA, 'An array element must be followed by a comma');
            }
            expr.addElement(this.parseExpression());
        }
        this.tokens.expect(TokenType.T_RBRACKET, 'An array element must be closed by a brackets');
        return expr;
    }

    parseMapExpression(){
        const token = this.tokens.current();
        this.tokens.expect(TokenType.T_LBRACE, 'A map must begin with an opening braces');
        const expr = new MapExpression([], token.position);
        while (!this.tokens.current().test(TokenType.T_RBRACE)) {
            if (!expr.isEmpty()) {
                this.tokens.expect(TokenType.T_COMMA, 'A map must be followed by a comma');
            }
            const key = this.tokens.expect(TokenType.T_STR, 'A map key must be a string');
            this.tokens.expect(TokenType.T_COLON, 'The map key and value must be separated by a colon(:)');
            const value = this.parseExpression();
            expr.addElement(new LiteralExpression(key.value, key.value, key.position), value);
        }
        this.tokens.expect(TokenType.T_RBRACE, 'A map must be closed by a braces');
        return expr;
    }

    parseArguments(){
        // the_foo_func(1, "foo")
        const args = [];
        this.tokens.expect(TokenType.T_LPAREN, 'A list of arguments must begin with an opening parenthesis');
        while (!this.tokens.current().test(TokenType.T_RPAREN)) {
            if (args.length > 0) { // the prev arguments is exists.
                this.tokens.expect(TokenType.T_COMMA, 'Arguments must be separated by a comma');
            }
            args.push(this.parseExpression());
        }
        this.tokens.expect(TokenType.T_RPAREN, 'A list of arguments must be closed by a parenthesis');
        return args;
    }
}

export default Parser;