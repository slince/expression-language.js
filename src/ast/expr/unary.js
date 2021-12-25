import Expr from "../expr.js";
import {RuntimeError} from "../../errors.js";

class UnaryExpression extends Expr{
    constructor(operator, argument, position) {
        super(position);
        this.type = 'UnaryExpression';
        this.operator = operator;
        this.argument = argument;
    }

    evaluate(runtime) {
        let result;
        switch (this.operator) {
            case '++':
                result = this.argument.evaluate(runtime)
                break;
            case '--':
                result = this.argument.evaluate(runtime);
                break;
            case '!':
                result = !Boolean(this.argument.evaluate(runtime))
                break;
            case '+':
                result = this.argument.evaluate(runtime);
                break;
            case '-':
                result = -Number(this.argument.evaluate(runtime));
                break;
            default:
                throw new RuntimeError(`Unrecognized operator ${this.operator}`);
        }
        return result;
    }
}

export default UnaryExpression;