import Expr from "../expr.js";

class UnaryExpression extends Expr{
    constructor(operator, lineno) {
        super(null, lineno);
        this.type = 'UnaryExpression';
        this.operator = operator;
    }
}

export default UnaryExpression;