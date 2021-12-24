import Expr from "../expr.js";
import {RuntimeError} from "../../errors";

class UnaryExpression extends Expr{
    constructor(operator, target, position) {
        super(position);
        this.type = 'UnaryExpression';
        this.operator = operator;
        this.target = target;
    }

    evaluate(runtime) {
        let result;
        switch (this.operator) {
            case '++':
                result = this.target.evaluate(runtime)
                break;
            case '--':
                result = this.target.evaluate(runtime);
                break;
            case '!':
                result = !Boolean(this.target.evaluate(runtime))
                break;
            case '+':
                result = this.target.evaluate(runtime);
                break;
            case '-':
                result = -Number(this.target.evaluate(runtime));
                break;
            default:
                throw new RuntimeError(`Unrecognized operator ${this.operator}`);
        }
        return result;
    }
}

export default UnaryExpression;