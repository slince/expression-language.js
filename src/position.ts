
export default class Position{
    readonly offset: number;
    readonly column: number;
    readonly line: number;
    constructor(offset: number, line: number, column: number) {
        this.offset = offset;
        this.line = line;
        this.column = column;
    }
}
