import Lexer from "./lexer";
import Parser from "./parser";
import {GenericRuntime, Runtime} from "./runtime";

class Expression{

    // Evaluate the expression and return output of the last expr.
    evaluate(source: string, context: {} | Runtime){
        const node = Expression.createParser(source).parse();
        return node.evaluate(Expression.createRuntime(context));
    }

    // parse the ast of the source.
    parse(source: string){
        return Expression.createParser(source).parse();
    }

    // tokenize source code.
    lex(source: string){
        return Expression.createLexer(source).lex();
    }

    private static createRuntime(context: {} | Runtime): Runtime{
        if (typeof (context as Runtime).hasReference === 'function') {
            return context as Runtime;
        }
        return new GenericRuntime(context);
    }

    private static createParser(source: string): Parser{
        return  new Parser(Expression.createLexer(source).lex());
    }

    private static createLexer(source: string): Lexer{
        return new Lexer(source);
    }
}

export default Expression;