import {Expr} from "../node";
import {Runtime} from "../../runtime";
import {Literal} from "../ast";

class LiteralExpression extends Expr{
    private readonly value: Literal;
    private readonly raw: string;

    constructor(value: Literal, raw: string, position) {
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