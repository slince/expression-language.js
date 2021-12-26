
export default class Position{
    offset: number;
    column: number;
    line: number;
    constructor(offset: number, line: number, column: number) {
        this.offset = offset;
        this.line = line;
        this.column = column;
    }
}
