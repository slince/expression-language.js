import Node from "./node.js";

class Identifier extends Node{
    constructor(value, lineno) {
        super(null, lineno);
        this.type = 'Identifier';
        this.value = value;
    }

    evaluate(context) {
        return this.value;
    }
}

export default Identifier