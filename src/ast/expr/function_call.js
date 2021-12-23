import Expr from "../expr.js";
import {RuntimeError} from "../../errors";

class FunctionCallExpression extends Expr{
    constructor(callee, _arguments, lineno) {
        super(null, lineno);
        this.type = 'FunctionCallExpression';
        this.callee = callee;
        this.arguments = _arguments;
    }

    evaluate(context) {
        const callee = this.callee.evaluate(context);
        if (!context.hasFunction(callee)) {
            throw new RuntimeError(`Undefined function ${callee}`, this.callee.position);
        }
        const args = this.arguments.map(arg => arg.evaluate(context))
        return context.getFunction(callee)(arguments);
    }
}

export default FunctionCallExpression;