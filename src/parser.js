import {TokenType} from "./token";
import Assign from "./ast/assign";
import Identifier from "./ast/identifier";
import FunctionCallExpression from "./ast/expr/function_call";

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

        const token = this.tokens.current();
        let node;
        switch (token.type) {
            case TokenType.T_ID:
                const identifier = new Identifier(token.value, token.position);
                const next = this.tokens.look();
                if (next.test(TokenType.T_ASSIGN)) {     // fruit = a + b;
                    node = new Assign(identifier, this.parseExpression(), token.position);
                } else if (next.test(TokenType.T_LPAREN)) {
                    this.tokens.next();
                    node = new FunctionCallExpression(identifier, this.parseArguments(), token.position);
                }
                break;
        }

        return node;
    }


    parseArguments(){
        // the_foo_func(1, "foo")
        const args = [];
        this.tokens.expect(TokenType.T_LPAREN, null, 'A list of arguments must begin with an opening parenthesis');
        while (!this.tokens.test(TokenType.T_RPAREN)) {
            if (args.length > 0) { // the prev arguments is exists.
                this.tokens.expect(TokenType.T_COMMA, null, 'Arguments must be separated by a comma');
            }
            args.push(this.parseExpression());
        }
        return args;
    }
}

export default Parser;