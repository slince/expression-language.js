import Expr from "../expr.js";

class BinaryExpression extends Expr{

    constructor(left, operator, right, lineno) {
        super([], lineno);
        this.left = left;
        this.operator = operator;
        this.right = right;
    }

}

export default BinaryExpression;