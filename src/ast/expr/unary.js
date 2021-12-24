import Expr from "../expr.js";

class UnaryExpression extends Expr{
    constructor(operator, position) {
        super(null, position);
        this.type = 'UnaryExpression';
        this.operator = operator;
    }
}

export default UnaryExpression;