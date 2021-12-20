import Node from "./node";

class Assign extends Node{
    constructor(variable, value, lineno) {
        super(null, lineno);
        this.variable = variable;
        this.value = value;
    }
}

export default Assign;