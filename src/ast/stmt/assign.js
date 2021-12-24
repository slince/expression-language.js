import Stmt from "../stmt.js";

class AssignStatement extends Stmt{
    constructor(variable, value, position) {
        super(position);
        this.type = 'AssignStatement';
        this.variable = variable;
        this.value = value;
    }

    evaluate(context) {
        // change runtime context.
        context.setReference(this.variable.evaluate(context), this.value.evaluate(context));
    }
}

export default AssignStatement;