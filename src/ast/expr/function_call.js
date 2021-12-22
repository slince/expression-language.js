import Expr from "../expr.js";

class FunctionCallExpression extends Expr{
    constructor(callee, _arguments, lineno) {
        super(null, lineno);
        this.type = 'FunctionCallExpression';
        this.callee = callee;
        this.arguments = _arguments;
    }
}

export default FunctionCallExpression;