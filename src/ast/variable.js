import Node from "./node.js";
import {RuntimeError} from "../errors";

class Variable extends Node{
    constructor(value, position) {
        super(null, position);
        this.type = 'Variable';
        this.value = value;
    }

    evaluate(context) {
        if (!context.hasVariable(this.value)) {
            throw new RuntimeError(`Undefined variable ${this.value}`, this.position);
        }
        return context.getVariable(this.value);
    }
}

export default Variable