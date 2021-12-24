import Expr from "../expr";

class UpdateExpression extends Expr{
    constructor(operator, argument, prefix, position) {
        super(position);
        this.operator = operator;
        this.argument = argument;
        this.prefix = prefix;
        this.position = position;
    }

    evaluate(context) {
        const argument = this.argument.evaluate(context);
        let result = argument;
        if (this.prefix) {
            result = argument + 1;
        }
        context.setReference(this.argument.value, result);
        return result;
    }
}

export default UpdateExpression;