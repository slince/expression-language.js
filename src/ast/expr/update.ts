import {Expr} from "../node";
import Position from "../../position";
import {Runtime} from "../../runtime";
import MemberExpression from "./member";
import VariableExpression from "./variable";

type Variable = VariableExpression | MemberExpression;

class UpdateExpression extends Expr{
    private readonly operator: string;
    private readonly argument: Variable;
    private readonly prefix: boolean;

    constructor(operator: string, argument: Variable, prefix: boolean, position: Position) {
        super(position);
        this.type = 'UpdateExpression';
        this.operator = operator;
        this.argument = argument;
        this.prefix = prefix;
        this.position = position;
    }

    evaluate(runtime: Runtime): number {
        // force convert to number; not assert
        const argument = Number(this.argument.evaluate(runtime));
        let result = argument;
        if (this.prefix) {
            result = argument + 1;
        }
        this.argument.changeRuntime(runtime, result);
        return result;
    }
}

export default UpdateExpression;