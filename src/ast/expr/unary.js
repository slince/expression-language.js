import Expr from "../expr.js";
import {RuntimeError} from "../../errors";

class UnaryExpression extends Expr{
    constructor(operator, target, position) {
        super(position);
        this.type = 'UnaryExpression';
        this.operator = operator;
        this.target = target;
    }

    evaluate(context) {
        let result;
        switch (this.operator) {
            case '++':
                result = this.target.evaluate(context)
                break;
            case '--':
                result = this.target.evaluate(context);
                break;
            case '!':
                result = !Boolean(this.target.evaluate(context))
                break;
            case '+':
                result = this.target.evaluate(context);
                break;
            case '-':
                result = -Number(this.target.evaluate(context));
                break;
            default:
                throw new RuntimeError(`Unrecognized operator ${this.operator}`);
        }
        return result;
    }
}

export default UnaryExpression;