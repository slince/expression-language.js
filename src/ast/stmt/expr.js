import Stmt from "../stmt.js";

class ExpressionStatement extends Stmt{
    constructor(expression, position) {
        super(position);
        this.type = 'ExpressionStatement';
        this.expression = expression;
    }

    evaluate(runtime) {
        return this.expression.evaluate(runtime);
    }
}

export default ExpressionStatement;