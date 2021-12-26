import Position from "./position";

export class BaseError extends Error{
    position?: Position;

    constructor(message: string, position?: Position) {
        super(message);
        this.position = position;
    }
}

export class SyntaxError extends BaseError{
}

export class RuntimeError extends BaseError{
}
