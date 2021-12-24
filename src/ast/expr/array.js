import Expr from "../expr.js";

class ArrayExpression extends Expr{
    constructor(elements, position) {
        super(null, position);
        this.type = 'ArrayExpression';
        this.elements = elements || [];
    }

    addElement(element){
        this.elements.push(element);
    }

    isEmpty(){
        return this.elements.length === 0;
    }

    evaluate(context) {
        return this.elements.map(element => element.evaluate(context));
    }
}

export default ArrayExpression;