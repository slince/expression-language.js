import Expr from "../expr.js";

class CallExpression extends Expr{
    constructor(callee, args, position) {
        super(position);
        this.callee = callee;
        this.args = args;
    }

    evaluate(context) {
        const callee = this.callee.evaluate(context);
        const args = this.args.map(arg => arg.evaluate(context))
        return callee(args);
    }
}

export default CallExpression;