import Expr from "../expr.js";
import {RuntimeError} from "../../errors.js";

class FunctionCallExpression extends Expr{
    constructor(callee, _arguments, position) {
        super(null, position);
        this.type = 'FunctionCallExpression';
        this.callee = callee;
        this.arguments = _arguments;
    }

    evaluate(context) {
        const callee = this.callee.evaluate(context);
        const args = this.arguments.map(arg => arg.evaluate(context))
        return callee(args);
    }
}

export default FunctionCallExpression;