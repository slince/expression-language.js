import Expr from "../expr.js";
import {RuntimeError} from "../../errors.js";

class PropertyAccessExpression extends Expr{
    constructor(object, property, lineno) {
        super(null, lineno);
        this.type = 'PropertyAccessExpression';
        this.object = object;
        this.property = property;
    }

    evaluate(context) {
        const object = this.object.evaluate(context);
        if (!context.hasVariable(object)) {
            throw new RuntimeError(`Undefined variable ${object}`, this.object.position);
        }
        return context.getVariable(object)[this.property.evaluate(context)];
    }
}

export default PropertyAccessExpression;