import {Expr, Identifier} from "../node";
import Position from "../../position";
import {Runtime} from "../../runtime";

class MemberExpression extends Expr{
    private readonly object: Expr;
    private readonly property: Identifier;
    private readonly computed: boolean;

    constructor(object: Expr, property: Identifier, computed: boolean, position: Position) {
        super(position);
        this.object = object;
        this.property = property;
        this.computed = computed;
    }

    evaluate(runtime: Runtime): any {
        const object = this.object.evaluate(runtime);
        const property = this.property.evaluate(runtime);
        return object[property];
    }

    changeReference(runtime: Runtime, value: any): void {
        const object = this.object.evaluate(runtime);
        const property = this.property.evaluate(runtime);

        if (typeof object[property] !== 'undefined' && typeof object[property] !== 'function') {
            object[property] = value;
            // this.object.changeReference(runtime, object);
        }
    }
}

export default MemberExpression;