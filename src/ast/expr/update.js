import Expr from "../expr";

class UpdateExpression extends Expr{
    constructor(operator, argument, prefix, position) {
        super(position);
        this.operator = operator;
        this.argument = argument;
        this.prefix = prefix;
        this.position = position;
    }

    evaluate(runtime) {
        const argument = this.argument.evaluate(runtime);
        let result = argument;
        if (this.prefix) {
            result = argument + 1;
        }
        runtime.setReference(this.argument.value, result);
        return result;
    }
}

export default UpdateExpression;