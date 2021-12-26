import {RuntimeError} from "../../errors";
import {Expr} from "../node";
import Position from "../../position";
import {Runtime} from "../../runtime";

class VariableExpression extends Expr{
    private readonly value: string;

    constructor(value: string, position: Position) {
        super(position);
        this.type = 'Variable';
        this.value = value;
    }

    evaluate(runtime: Runtime): any {
        if (!runtime.hasReference(this.value)) {
            throw new RuntimeError(`Undefined Reference, ${this.value} is not defined`, this.position);
        }
        return runtime.getReference(this.value);
    }

    getReference(runtime: Runtime){
        return runtime.getReference(this.value);
    }

    changeReference(runtime: Runtime, value: any): void {
        runtime.setReference(this.value, value);
    }
}

export default VariableExpression