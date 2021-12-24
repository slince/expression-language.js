import Node from "../node.js";
import {RuntimeError} from "../../errors.js";

class VariableExpression extends Node{
    constructor(value, position) {
        super(null, position);
        this.type = 'Variable';
        this.value = value;
    }

    evaluate(context) {
        if (!context.hasReference(this.value)) {
            throw new RuntimeError(`Undefined Reference, ${this.value} is not defined`, this.position);
        }
        return context.getReference(this.value);
    }
}

export default VariableExpression