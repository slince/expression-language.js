import Position from "./position";

export class SyntaxError extends Error{
    position: Position;

    constructor(message: string, position?: Position) {
        super(message);
        this.position = position;
    }
}

export class RuntimeError extends Error{
    position: Position;
    constructor(message: string, position?: Position) {
        super(message);
        this.position = position;
    }
}
