import Expr from "../expr.js";

class LiteralExpression extends Expr{
    constructor(value, raw, lineno) {
        super(null, lineno);
        this.value = value;
        this.raw = raw;
    }
}

export default LiteralExpression;