import Stmt from "../stmt.js";

class BlockStatement extends Stmt{
    constructor(stmts, position) {
        super(position);
        this.type = 'BlockStatement';
        this.stmts = stmts;
    }

    evaluate(runtime) {
        let evaluated; //return last statement.
        this.stmts.forEach((stmt) => {
            evaluated = stmt.evaluate(runtime);
        })
        return evaluated;
    }
}

export default BlockStatement;