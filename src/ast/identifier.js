import Node from "./node.js";
import {RuntimeError} from "../errors.js";

class Identifier extends Node{
    constructor(value, position) {
        super(null, position);
        this.type = 'Identifier';
        this.value = value;
    }

    evaluate(context) {
        return this.value;
    }
}

export default Identifier