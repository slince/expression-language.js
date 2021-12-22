import Stmt from "../stmt.js";

class BlockStatement extends Stmt{
    constructor(stmts, lineno) {
        super(null, lineno);
        this.type = 'BlockStatement';
        this.stmts = stmts;
    }
}

export default BlockStatement;