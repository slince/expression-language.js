import Stmt from "../stmt.js";

class AssignStatement extends Stmt{
    constructor(variable, value, lineno) {
        super(null, lineno);
        this.type = 'AssignStatement';
        this.variable = variable;
        this.value = value;
    }

    evaluate(context) {

    }
}

export default AssignStatement;