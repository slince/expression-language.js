import Node from "./node.js";
import {RuntimeError} from "../errors.js";

class Identifier extends Node{
    constructor(value, position) {
        super(position);
        this.type = 'Identifier';
        this.value = value;
    }

    evaluate(runtime) {
        return this.value;
    }
}

export default Identifier