import Expr from "../expr.js";

class CallExpression extends Expr{
    constructor(callee, args, position) {
        super(position);
        this.callee = callee;
        this.args = args;
    }

    evaluate(runtime) {
        const callee = this.callee.evaluate(runtime);
        const args = this.args.map(arg => arg.evaluate(runtime))
        return callee(args);
    }
}

export default CallExpression;