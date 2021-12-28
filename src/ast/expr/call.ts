import {Expr} from "../node";
import Position from "../../position";
import {Runtime} from "../../runtime";

class CallExpression extends Expr{
    private readonly callee: Expr;
    private readonly args: Expr[];

    constructor(callee: Expr, args: Expr[], position: Position) {
        super(position);
        this.type = "CallExpression";
        this.callee = callee;
        this.args = args;
    }

    evaluate(runtime: Runtime): any{
        const callee = this.callee.evaluate(runtime);
        const args = this.args.map(arg => arg.evaluate(runtime))
        return callee(...args);
    }
}

export default CallExpression;