import {Expr} from "../node";
import {RuntimeError} from "../../errors";
import Position from "../../position";
import {Runtime} from "../../runtime";


class UnaryExpression extends Expr{
    private readonly operator: string;
    private readonly argument: Expr;

    constructor(operator: string, argument: Expr, position: Position) {
        super(position);
        this.type = 'UnaryExpression';
        this.operator = operator;
        this.argument = argument;
    }

    evaluate(runtime: Runtime): any{
        let result;
        switch (this.operator) {
            case '++':
                result = this.argument.evaluate(runtime)
                break;
            case '--':
                result = this.argument.evaluate(runtime);
                break;
            case '!':
            case 'not':
                result = !Boolean(this.argument.evaluate(runtime))
                break;
            case '+':
                result = this.argument.evaluate(runtime);
                break;
            case '-':
                result = -Number(this.argument.evaluate(runtime));
                break;
            default:
                throw new RuntimeError(`Unrecognized operator ${this.operator}`);
        }
        return result;
    }
}

export default UnaryExpression;