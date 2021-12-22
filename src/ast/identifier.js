import Node from "./node.js";

class Identifier extends Node{
    constructor(name, lineno) {
        super(null, lineno);
        this.type = 'Identifier';
        this.name = name;
    }
}

export default Identifier