import Node from "../node.js";
import {RuntimeError} from "../../errors.js";

class VariableExpression extends Node{
    constructor(value, position) {
        super(position);
        this.type = 'Variable';
        this.value = value;
    }

    evaluate(runtime) {
        if (!runtime.hasReference(this.value)) {
            throw new RuntimeError(`Undefined Reference, ${this.value} is not defined`, this.position);
        }
        return runtime.getReference(this.value);
    }
}

export default VariableExpression