import Expr from "../expr.js";

class LiteralExpression extends Expr{
    constructor(value, raw, position) {
        super(null, position);
        this.type = 'LiteralExpression';
        this.value = value;
        this.raw = raw;
    }

    evaluate(context) {
       return this.value;
    }
}

export default LiteralExpression;