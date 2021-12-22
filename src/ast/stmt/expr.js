import Stmt from "../stmt.js";

class ExpressionStatement extends Stmt{
    constructor(expression, lineno) {
        super(null, lineno);
        this.type = 'ExpressionStatement';
        this.expression = expression;
    }
}

export default ExpressionStatement;