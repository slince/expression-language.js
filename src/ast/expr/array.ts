import {Expr} from "../node";
import Position from "../../position";
import {Runtime} from "../../runtime";

class ArrayExpression extends Expr{
    private readonly elements: Expr[];

    constructor(elements: Expr[], position: Position) {
        super(position);
        this.type = 'ArrayExpression';
        this.elements = elements || [];
    }

    addElement(element: Expr): void{
        this.elements.push(element);
    }

    isEmpty(): boolean{
        return this.elements.length === 0;
    }

    evaluate(runtime: Runtime): any {
        return this.elements.map(element => element.evaluate(runtime));
    }
}

export default ArrayExpression;