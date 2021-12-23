import Stmt from "../stmt.js";

class BlockStatement extends Stmt{
    constructor(stmts, lineno) {
        super(null, lineno);
        this.type = 'BlockStatement';
        this.stmts = stmts;
    }

    evaluate(context) {
        let evaluated; //return last statement.
        this.stmts.forEach((stmt) => {
            evaluated = stmt.evaluate(context);
        })
        return evaluated;
    }
}

export default BlockStatement;