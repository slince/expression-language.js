import {Expr} from "../node";
import {RuntimeError} from "../../errors";
import Position from "../../position";
import {Runtime} from "../../runtime";

class BinaryExpression extends Expr{
    private readonly left: Expr;
    private readonly operator: string;
    private readonly right: Expr;

    constructor(left: Expr, operator: string, right: Expr, position: Position) {
        super(position);
        this.type = 'BinaryExpression';
        this.left = left;
        this.operator = operator;
        this.right = right;
    }

    evaluate(runtime: Runtime): any{
        const left = this.left.evaluate(runtime);
        const right = this.right.evaluate(runtime);
        let result;
        switch (this.operator) {
            case '||':
                result = left || right
                break;
            case '&&':
                result = left && result;
                break;
            case '|':
                result = left | right;
                break;
            case '^':
                result = left ^ right;
                break;
            case '&':
                result = left & right;
                break;
            case '==':
                result = left == right;
                break;
            case '===':
                result = left === right;
                break;
            case '!=':
                result = left != right;
                break;
            case '!==':
                result = left !== right;
                break;
            case '<':
                result = left < right;
                break;
            case '>':
                result = left > right;
                break;
            case '>=':
                result = left >= right;
                break;
            case '<=':
                result = left <= right;
                break;
            case 'not in':
                result = right.indexOf(left) === -1;
                break;
            case 'in':
                result = right.indexOf(left) > 0;
                break;
            case '+':
                result = left + right;
                break;
            case '-':
                result = left - right;
                break;
            case '~':
                result = '' + left + right;
                break;
            case '*':
                result = left * right;
                break;
            case '/':
                if (0 == right) {
                    throw new RuntimeError('Division by zero.', this.right.position);
                }
                result = left / right;
                break;
            case '%':
                if (0 == right) {
                    throw new RuntimeError('Modulo by zero.', this.right.position);
                }
                result = left % right;
                break;
        }
        return result;
    }
}

export default BinaryExpression;