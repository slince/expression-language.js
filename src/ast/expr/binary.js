import Expr from "../expr.js";
import {RuntimeError} from "../../errors.js";

class BinaryExpression extends Expr{

    constructor(left, operator, right, position) {
        super([], position);
        this.type = 'BinaryExpression';
        this.left = left;
        this.operator = operator;
        this.right = right;
    }

    evaluate(context) {
        const left = this.left.evaluate(context);
        const right = this.right.evaluate(context);
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
            case '/':
                if (0 == right) {
                    throw new RuntimeError('Division by zero.', this.right.position);
                }

                result = left / right;
            case '%':
                if (0 == right) {
                    throw new RuntimeError('Modulo by zero.', this.right.position);
                }

                result = left % right;
        }
        // console.log(this.right);
        return result;
    }
}

export default BinaryExpression;