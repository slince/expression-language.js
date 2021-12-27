import {TokenStream, TokenType} from "./token";
import {SyntaxError} from "./errors";
import * as ast from "./ast/ast";

export default class Parser{

    tokens: TokenStream;

    constructor(tokens: TokenStream) {
        this.tokens = tokens;
    }

    parse(): ast.BlockStatement{
        const token = this.tokens.current();
        const stmts = [];
        while (!this.tokens.eof()) {
            stmts.push(this.parseStatement());
        }
        return new ast.BlockStatement(stmts, token.position);
    }

    parseStatement(): ast.Stmt{
        const token = this.tokens.current();
        let stmt;
        if (token.test(TokenType.T_ID) && this.tokens.look().test(TokenType.T_ASSIGN)) {
            stmt = this.parseAssignStatement();
        } else if (token.test(TokenType.T_LBRACE) && !this.tokens.look().test(TokenType.T_RBRACE) && !this.tokens.look(2).test(TokenType.T_COLON)) {
            stmt = this.parseBlockStatement();
        } else {
            stmt = new ast.ExpressionStatement(this.parseExpression(), token.position);
        }
        if (!this.tokens.current().test(TokenType.T_EOF)) {
            this.tokens.expect(TokenType.T_SEMICOLON);
        }
        return stmt;
    }

    parseAssignStatement(): ast.AssignStatement{
        const token = this.tokens.current();
        const variable = new ast.Identifier(token.value, token.position);
        this.tokens.next();
        this.tokens.expect(TokenType.T_ASSIGN);
        return new ast.AssignStatement(variable, this.parseExpression(), token.position);
    }

    parseBlockStatement(): ast.BlockStatement{
        this.tokens.expect(TokenType.T_LBRACE, 'A block must begin with an opening braces');
        const token = this.tokens.current();
        const stmts = [];
        while (!this.tokens.current().test(TokenType.T_RBRACE)) {
            stmts.push(this.parseStatement());
        }
        this.tokens.expect(TokenType.T_RBRACE, 'A block must be closed by a braces');
        return new ast.BlockStatement(stmts, token.position);
    }

    parseExpression(): ast.Expr{
        let expr = this.parsePrimaryExpression();
        if (this.tokens.current().isBinaryOperator()) {
            expr = this.parseBinaryExpression(expr);
        }
        return expr;
    }

    parsePrimaryExpression(): ast.Expr{
        const token = this.tokens.current();
        let expr;
        switch (token.type) {
            // constant
            case TokenType.T_STR:
                expr = new ast.LiteralExpression(token.value, token.value, token.position);
                this.tokens.next();
                break;
            case TokenType.T_NUM:
                expr = new ast.LiteralExpression(Number(token.value), token.value, token.position);
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
            // unary operator
            case TokenType.T_INC:
            case TokenType.T_DEC:
                expr = this.parseUpdateExpression(true);
                break;
            case TokenType.T_NOT:
            case TokenType.T_KW_NOT:
            case TokenType.T_ADD:
            case TokenType.T_SUB:
                expr = this.parseUnaryExpression();
                break;
            default:
                throw new SyntaxError(`Unexpected token "${token.type}" of value "${token.value}".`);
        }
        return this.parsePosixExpression(expr);
    }

    parsePosixExpression(expr: ast.Expr): ast.Expr{
        while (true) {
            const token = this.tokens.current();
            let end = false;
            switch (token.type) {
                case TokenType.T_LPAREN:
                    expr = new ast.CallExpression(expr, this.parseArguments(), token.position);
                    break;
                case TokenType.T_DOT:
                    expr = this.parseObjectExpression(expr);
                    break;
                case TokenType.T_LBRACKET: // array[1] , map['property']
                    expr = this.parseAccessExpression(expr);
                     break;
                default:
                    if (this.tokens.current().testAny(TokenType.T_INC, TokenType.T_DEC)) {// unary operator
                        expr = this.parseUpdateExpression(false, expr);
                    } else {
                        end = true;
                    }
            }
            if (end) {
                break;
            }
        }
        return expr;
    }

    parseIdentifierExpression(): ast.Expr{
        const token = this.tokens.current();
        let expr;
        switch (token.value) {
            case 'true':
            case 'TRUE':
                expr = new ast.LiteralExpression(true, token.value, token.position);
                break;
            case 'false':
            case 'FALSE':
                expr = new ast.LiteralExpression(false, token.value, token.position);
                break;
            case 'null':
            case 'NULL':
                expr = new ast.LiteralExpression(null, token.value, token.position);
                break;
            default:
                expr = new ast.VariableExpression(token.value, token.position);
        }
        this.tokens.next();
        return expr;
    }

    parseObjectExpression(object: ast.Expr): ast.Expr{
        this.tokens.expect(TokenType.T_DOT);
        const token = this.tokens.expect(TokenType.T_ID);
        const property = new ast.Identifier(token.value, token.position);
        let expr: ast.Expr = new ast.MemberExpression(object, property, false, object.position)
        if (this.tokens.current().test(TokenType.T_LPAREN)) { // method
            expr = new ast.CallExpression(expr, this.parseArguments(), object.position);
        }
        return expr;
    }

    parseAccessExpression(object: ast.Expr): ast.MemberExpression{
        this.tokens.expect(TokenType.T_LBRACKET);
        const property = this.parseExpression();
        this.tokens.expect(TokenType.T_RBRACKET);
        return new ast.MemberExpression(object, property as ast.Identifier, false, object.position)
    }

    parseBinaryExpression(expr: ast.Expr): ast.BinaryExpression{
        // a + b * c / d
        // a * b + c
        while (this.tokens.current().isBinaryOperator()) {
            expr = this.doParseBinary(expr);
        }
        return expr as ast.BinaryExpression;
    }

    doParseBinary(left: ast.Expr): ast.BinaryExpression{
        const token = this.tokens.current();
        const operator = token.value;
        const currentPrecedence = token.getBinaryPrecedence().precedence;

        // right expr.
        this.tokens.next();
        let right = this.parsePrimaryExpression();
        const nextPrecedence = this.tokens.current().getBinaryPrecedence().precedence;
        if (currentPrecedence < nextPrecedence) {
            right = this.doParseBinary(right);
        }
        return new ast.BinaryExpression(left, operator, right, left.position);
    }

    parseUnaryExpression(): ast.UnaryExpression{
        // !+-+-+-!!+-10
        const token = this.tokens.current();
        const operator = token.value;
        this.tokens.next();
        const argument = this.parsePrimaryExpression();
        return new ast.UnaryExpression(operator, argument, token.position);
    }

    parseUpdateExpression(prefix: boolean, argument ?: ast.Expr): ast.UpdateExpression {
        const token = this.tokens.expectOneOf(TokenType.T_INC, TokenType.T_DEC);
        if (prefix) {  // ++a ++a.b ++a.read()
            // ++ a + 1
            // a + b --
            argument = this.parsePrimaryExpression();
        } else {  // a ++  a.b ++ a.c() ++
        }
        if (!(argument instanceof ast.VariableExpression) && !(argument instanceof ast.MemberExpression)) {
            throw new SyntaxError('Invalid left-hand side in assignment');
        }
        return new ast.UpdateExpression (token.value, argument, prefix, prefix ? token.position : argument.position)
    }

    parseParenExpression(): ast.Expr{
        this.tokens.expect(TokenType.T_LPAREN);
        const expr = this.parseExpression();
        this.tokens.expect(TokenType.T_RPAREN);
        return expr;
    }

    parseArrayExpression(): ast.ArrayExpression {
        const token = this.tokens.current();
        const expr = new ast.ArrayExpression ([], token.position);
        this.tokens.expect(TokenType.T_LBRACKET, 'An array must begin with an opening brackets');
        while (!this.tokens.current().test(TokenType.T_RBRACKET)) {
            if (!expr.isEmpty()) {
                this.tokens.expect(TokenType.T_COMMA, 'An array element must be followed by a comma');
            }
            expr.addElement(this.parseExpression());
        }
        this.tokens.expect(TokenType.T_RBRACKET, 'An array must be closed by a brackets');
        return expr;
    }

    parseMapExpression(): ast.MapExpression {
        const token = this.tokens.current();
        this.tokens.expect(TokenType.T_LBRACE, 'A map must begin with an opening braces');
        const expr = new ast.MapExpression ([], token.position);
        while (!this.tokens.current().test(TokenType.T_RBRACE)) {
            if (!expr.isEmpty()) {
                this.tokens.expect(TokenType.T_COMMA, 'A map must be followed by a comma');
            }
            const key = this.tokens.expect(TokenType.T_STR, 'A map key must be a string');
            this.tokens.expect(TokenType.T_COLON, 'The map key and value must be separated by a colon(:)');
            const value = this.parseExpression();
            expr.addElement(new ast.LiteralExpression(key.value, key.value, key.position), value);
        }
        this.tokens.expect(TokenType.T_RBRACE, 'A map must be closed by a braces');
        return expr;
    }

    parseArguments(): ast.Expr[]{
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