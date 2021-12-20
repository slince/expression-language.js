import Node from "./node.js";

class Identifier extends Node{
    constructor(name, lineno) {
        super(null, lineno);
        this.name = name;
    }
}

export default Identifier