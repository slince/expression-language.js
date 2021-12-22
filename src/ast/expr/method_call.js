import Expr from "../expr.js";

class MethodCallExpression extends Expr{
    constructor(object, method, _arguments, lineno) {
        super(null, lineno);
        this.type = 'MethodCallExpression';
        this.object = object;
        this.method = method;
        this.arguments = _arguments;
    }
}

export default MethodCallExpression;