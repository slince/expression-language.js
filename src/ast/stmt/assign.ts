import {Expr, Identifier, Stmt} from "../node";
import Position from "../../position";
import {Runtime} from "../../runtime";

class AssignStatement extends Stmt{
    private readonly variable: Identifier;
    private readonly value: Expr;

    constructor(variable: Identifier, value: Expr, position: Position) {
        super(position);
        this.type = 'AssignStatement';
        this.variable = variable;
        this.value = value;
    }

    evaluate(runtime: Runtime): void{
        // change runtime runtime.
        runtime.setReference(this.variable.evaluate(runtime), this.value.evaluate(runtime));
    }
}

export default AssignStatement;