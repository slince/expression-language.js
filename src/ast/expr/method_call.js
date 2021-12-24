import Expr from "../expr.js";
import {RuntimeError} from "../../errors.js";

class MethodCallExpression extends Expr{
    constructor(object, method, _arguments, position) {
        super(null, position);
        this.type = 'MethodCallExpression';
        this.object = object;
        this.method = method;
        this.arguments = _arguments;
    }

    evaluate(context) {
        const object = this.object.evaluate(context);
        if (!context.hasVariable(object)) {
            throw new RuntimeError(`Undefined variable ${object}`, this.object.position);
        }
        const args = this.arguments.map(arg => arg.evaluate(context))
        return context.getVariable(object)[this.method.evaluate(context)](args)
    }
}

export default MethodCallExpression;