import Stmt from "../stmt.js";

class AssignStatement extends Stmt{
    constructor(variable, value, position) {
        super(position);
        this.type = 'AssignStatement';
        this.variable = variable;
        this.value = value;
    }

    evaluate(runtime) {
        // change runtime runtime.
        runtime.setReference(this.variable.evaluate(runtime), this.value.evaluate(runtime));
    }
}

export default AssignStatement;