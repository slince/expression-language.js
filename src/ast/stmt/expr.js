import Stmt from "../stmt.js";

class ExpressionStatement extends Stmt{
    constructor(expression, position) {
        super(null, position);
        this.type = 'ExpressionStatement';
        this.expression = expression;
    }

    evaluate(context) {
        return this.expression.evaluate(context);
    }
}

export default ExpressionStatement;