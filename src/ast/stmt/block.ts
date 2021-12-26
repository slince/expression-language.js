import {Stmt} from "../node";
import Position from "../../position";
import {Runtime} from "../../runtime";

class BlockStatement extends Stmt{
    private readonly stmts: Stmt[];

    constructor(stmts: Stmt[], position: Position) {
        super(position);
        this.type = 'BlockStatement';
        this.stmts = stmts;
    }

    evaluate(runtime: Runtime): string {
        let evaluated; //return last statement.
        this.stmts.forEach((stmt) => {
            evaluated = stmt.evaluate(runtime);
        })
        return evaluated;
    }
}

export default BlockStatement;