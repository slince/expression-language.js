import Expr from "../expr.js";

class LiteralExpression extends Expr{
    constructor(value, raw, lineno) {
        super(null, lineno);
        this.type = 'LiteralExpression';
        this.value = value;
        this.raw = raw;
    }

    evaluate(context) {
        return this.value;
    }
}

export default LiteralExpression;