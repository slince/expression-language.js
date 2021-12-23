
class SyntaxError extends Error{
    constructor(message, position) {
        super(message);
        this.position = position;
    }
}

class RuntimeError extends Error{
    constructor(message, position) {
        super(message);
        this.position = position;
    }
}

export {SyntaxError, RuntimeError};