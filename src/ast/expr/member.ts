import {Expr, Identifier, RuntimeChanger} from "../node";
import Position from "../../position";
import {Runtime} from "../../runtime";
import {RuntimeError} from "../../errors";

class MemberExpression extends Expr implements RuntimeChanger{
    private readonly object: Expr;
    private readonly property: Identifier;
    private readonly computed: boolean;

    constructor(object: Expr, property: Identifier, computed: boolean, position: Position) {
        super(position);
        this.type = "MemberExpression";
        this.object = object;
        this.property = property;
        this.computed = computed;
    }

    evaluate(runtime: Runtime): any {
        const object = this.object.evaluate(runtime);
        const property = this.property.evaluate(runtime);
        return object[property];
    }

    changeRuntime(runtime: Runtime, value: any): void {
        const object = this.object.evaluate(runtime);
        const property = this.property.evaluate(runtime);
        if (typeof object[property] !== 'undefined' && typeof object[property] !== 'function') {
            object[property] = value;
        } else {
            throw new RuntimeError('Cannot change reference.');
        }
    }
}

export default MemberExpression;