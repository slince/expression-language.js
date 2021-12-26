import {Expr} from "../node";
import Position from "../../position";
import {Runtime} from "../../runtime";
import LiteralExpression from "./literal";

class MapEntry{
    readonly key: LiteralExpression;
    readonly value: any;

    constructor(key: LiteralExpression, value: any) {
        this.key = key;
        this.value = value;
    }
}

class MapExpression extends Expr{
    private entries: MapEntry[];

    constructor(entries: MapEntry[], position: Position) {
        super(position);
        this.type = 'MapExpression';
        this.entries = entries || [];
    }

    addElement(key: LiteralExpression, value: any){
        this.entries.push(new MapEntry(key, value));
    }

    isEmpty(): boolean{
        return this.entries.length === 0;
    }

    evaluate(runtime: Runtime): {} {
        const result = {};
        this.entries.forEach(entry => {
           result[entry.key.evaluate(runtime) as string] = entry.value.evaluate(runtime)
        });
        return result;
    }
}

export default MapExpression;