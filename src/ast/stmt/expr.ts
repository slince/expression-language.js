import {Expr, Stmt} from "../node";
import Position from "../../position";

class ExpressionStatement extends Stmt{
    private readonly expr: Expr;

    constructor(expr: Expr, position: Position) {
        super(position);
        this.type = 'ExpressionStatement';
        this.expr = expr;
    }

    evaluate(runtime): any{
        return this.expr.evaluate(runtime);
    }
}

export default ExpressionStatement;