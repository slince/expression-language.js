import Expr from "../expr.js";

class ArrayExpression extends Expr{
    constructor(elements, lineno) {
        super(null, lineno);
        this.elements = elements || [];
    }

    addElement(element){
        this.elements.push(element);
    }

    isEmpty(){
        return this.elements.length === 0;
    }
}

export default ArrayExpression;