import Expr from "../expr.js";

 class MemberExpression extends Expr{
    constructor(object, property, computed, position) {
        super(position);
        this.object = object;
        this.property = property;
        this.computed = computed;
    }

    evaluate(runtime) {
        const object = this.object.evaluate(runtime);
        const property = this.property.evaluate(runtime);
        return object[property];
    }
}

export default MemberExpression;