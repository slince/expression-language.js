import Expr from "../expr";

class PropertyAccessExpression extends Expr
{
    constructor(object, property, lineno) {
        super(null, lineno);
        this.object = object;
        this.property = property;
    }

}

export default PropertyAccessExpression;