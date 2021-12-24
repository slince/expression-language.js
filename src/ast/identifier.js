import Node from "./node.js";
import {RuntimeError} from "../errors.js";

class Identifier extends Node{
    constructor(value, lineno) {
        super(null, lineno);
        this.type = 'Identifier';
        this.value = value;
    }

    evaluate(context) {
         if (!context.hasVariable(this.value)) {
             throw new RuntimeError(`Undefined variable ${this.value}`, this.position);
         }
         return context.getVariable(this.value);
    }
}

export default Identifier