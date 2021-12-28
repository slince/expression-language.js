import Lexer from "./lexer";
import Parser from "./parser";
import {GenericRuntime, Runtime} from "./runtime";

class Evaluator{

    // Evaluate the expression and return output of the last expr.
    evaluate(source: string, context?: {[key: string]: any} | Runtime){
        const node = Evaluator.createParser(source).parse();
        return node.evaluate(Evaluator.createRuntime(context || {}));
    }

    // parse the ast of the source.
    parse(source: string){
        return Evaluator.createParser(source).parse();
    }

    // tokenize source code.
    lex(source: string){
        return Evaluator.createLexer(source).lex();
    }

    private static createRuntime(context: {[key: string]: any} | Runtime): Runtime{
        if (typeof (context as Runtime).hasReference === 'function') {
            return context as Runtime;
        }
        return new GenericRuntime(context);
    }

    private static createParser(source: string): Parser{
        return  new Parser(Evaluator.createLexer(source).lex());
    }

    private static createLexer(source: string): Lexer{
        return new Lexer(source);
    }
}

export default Evaluator;