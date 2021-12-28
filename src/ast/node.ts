import Position from "../position";
import {Runtime} from "../runtime";

export interface Node {
    readonly type: string;
    readonly position: Position;
    evaluate(runtime: Runtime): any;
}

export interface RuntimeChanger{
    changeRuntime(runtime: Runtime, value: any): void;
}

// root node.
export class Root implements Node{
    type: string;
    readonly position: Position;

    constructor(position: Position) {
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

    constructor(value: string, position: Position) {
        super(position);
        this.type = 'Identifier';
        this.value = value;
    }

    evaluate(runtime: Runtime): string{
        return this.value;
    }
}
