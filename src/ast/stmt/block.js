import Stmt from "../stmt.js";

class BlockStatement extends Stmt{
    constructor(body, lineno) {
        super(null, lineno);
        this.body = body;
    }
}

export default BlockStatement;