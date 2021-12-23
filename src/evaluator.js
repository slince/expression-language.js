import Lexer from "./lexer";
import Parser from "./parser";

class Evaluator{
    evaluate(expression, context){
        const parser = new Parser(new Lexer(expression).lex())
        const node = parser.parse();
        return node.evaluate(context);
    }
}

export default Evaluator;