import {TokenType} from "./token";

class Parser{
    constructor(tokens) {
        this.tokens = tokens;
    }

    parse(context){
        const token = this.tokens.current();
        while (token.test(TokenType)) {

        }
    }
}

export default Parser;