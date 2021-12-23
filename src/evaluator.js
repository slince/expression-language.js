import Lexer from "./lexer.js";
import Parser from "./parser.js";

class Context{

    constructor(context) {
        context = context || {};
        this.functions = Object.assign({}, context.functions || {});
        this.variables =  Object.assign({}, context.variables || {});
    }

    setFunction(name, func){
        if (typeof func !== 'function') {
            throw new Error('The func must be a function');
        }
        this.functions[name] = func;
    }

    hasFunction(name){
        return typeof this.functions[name] !== 'undefined';
    }

    getFunction(name){
        return typeof this.functions[name];
    }

    setVariable(name, variable){
        this.variables[name] = variable;
    }

    hasVariable(name){
        return typeof this.variables[name] !== 'undefined';
    }

    getVariable(name){
        return typeof this.variables[name];
    }
}

class Evaluator{
    evaluate(expression, context){
        context = new Context(context);
        const node = this.createParser(expression).parse();
        return node.evaluate(context);
    }

    parse(expression){
        return this.createParser(expression).parse();
    }

    createParser(source){
        return  new Parser(new Lexer(source).lex());
    }
}

export default Evaluator;