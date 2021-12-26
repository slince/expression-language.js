
export default class Position{
    offset: number;
    column: number;
    line: number;
    constructor(offset, line, column) {
        this.offset = offset;
        this.line = line;
        this.column = column;
    }
}
