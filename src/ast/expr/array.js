import Expr from "../expr.js";

class ArrayExpression extends Expr{
    constructor(elements, position) {
        super(position);
        this.type = 'ArrayExpression';
        this.elements = elements || [];
    }

    addElement(element){
        this.elements.push(element);
    }

    isEmpty(){
        return this.elements.length === 0;
    }

    evaluate(runtime) {
        return this.elements.map(element => element.evaluate(runtime));
    }
}

export default ArrayExpression;