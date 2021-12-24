import Expr from "../expr.js";

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
        const args = this.arguments.map(arg => arg.evaluate(context))
        return object[this.method.evaluate(context)](args)
    }
}

export default MethodCallExpression;