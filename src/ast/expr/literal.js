import Expr from "../expr.js";

class LiteralExpression extends Expr{
    constructor(value, raw, position) {
        super(position);
        this.type = 'LiteralExpression';
        this.value = value;
        this.raw = raw;
    }

    evaluate(runtime) {
       return this.value;
    }
}

export default LiteralExpression;