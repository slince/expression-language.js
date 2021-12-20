import Stmt from "../stmt.js";

class AssignStatement extends Stmt{
    constructor(variable, value, lineno) {
        super(null, lineno);
        this.variable = variable;
        this.value = value;
    }
}

export default AssignStatement;