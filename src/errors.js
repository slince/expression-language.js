
class SyntaxError extends Error{
    constructor(message, position) {
        super(message);
        this.position = position;
    }
}

export default SyntaxError;