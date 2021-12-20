import Expr from "../expr";

class FunctionCallExpression extends Expr{
    constructor(callee, _arguments, lineno) {
        super(null, lineno);
        this.callee = callee;
        this.arguments = _arguments;
    }
}

export default FunctionCallExpression;