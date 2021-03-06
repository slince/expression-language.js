import {Expr} from "../node";
import {Runtime} from "../../runtime";
import Position from "../../position";

type Literal = boolean|null|number|string;

class LiteralExpression extends Expr{
    private readonly value: Literal;
    private readonly raw: string;

    constructor(value: Literal, raw: string, position: Position) {
        super(position);
        this.type = 'LiteralExpression';
        this.value = value;
        this.raw = raw;
    }

    evaluate(runtime: Runtime): Literal {
       return this.value;
    }
}

export default LiteralExpression;