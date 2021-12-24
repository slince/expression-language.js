import Expr from "../expr.js";

class PropertyAccessExpression extends Expr{
    constructor(object, property, position) {
        super(null, position);
        this.type = 'PropertyAccessExpression';
        this.object = object;
        this.property = property;
    }

    evaluate(context) {
        const object = this.object.evaluate(context);
        return object[this.property.evaluate(context)];
    }
}

export default PropertyAccessExpression;