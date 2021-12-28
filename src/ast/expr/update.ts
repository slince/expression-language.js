import {Expr} from "../node";
import Position from "../../position";
import {Runtime} from "../../runtime";
import MemberExpression from "./member";
import VariableExpression from "./variable";
import {RuntimeError} from "../../errors";

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
    }

    evaluate(runtime: Runtime): number {
        // force convert to number; not assert
        const argument = Number(this.argument.evaluate(runtime));
        let result: number;
        let changed: number;
        switch (this.operator) {
            case '++':
                changed = argument + 1;
                result = this.prefix ? changed : argument;
                break;
            case '--':
                changed = argument - 1;
                result = this.prefix ? changed : argument;
                break;
            default:
                throw new RuntimeError(`Unrecognized operator ${this.operator}`);
        }
        this.argument.changeRuntime(runtime, changed);
        return result;
    }
}

export default UpdateExpression;