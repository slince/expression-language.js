import Position from "../position";
import {Runtime} from "../runtime";

interface Node {
    type: string;
    position: Position;
    evaluate(runtime: Runtime): any;
}

interface RuntimeChanger{
    changeReference(reference: string, value: any): void;
}

// root node.
export class Root implements Node{
    type: string;
    position: Position;

    constructor(position) {
        this.type = 'Node';
        this.position = position;
    }

    evaluate(runtime: Runtime): any{
        // ignore in root node.
    }
}

// all statement
export class Stmt extends Root{

}

// all expression
export class Expr extends Root{
}

export class Identifier extends Root{
    private readonly value: string;

    constructor(value: string, position) {
        super(position);
        this.type = 'Identifier';
        this.value = value;
    }

    evaluate(runtime: Runtime): string{
        return this.value;
    }
}
