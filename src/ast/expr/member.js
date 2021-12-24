import Expr from "../expr.js";

 class MemberExpression extends Expr{
    constructor(object, property, computed, position) {
        super(position);
        this.object = object;
        this.property = property;
        this.computed = computed;
    }

    evaluate(context) {
        const object = this.object.evaluate(context);
        const property = this.property.evaluate(context);
        return object[property];
    }
}

export default MemberExpression;