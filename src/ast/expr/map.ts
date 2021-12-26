import {Expr} from "../node";
import Position from "../../position";
import {Runtime} from "../../runtime";
import LiteralExpression from "./literal";

interface MapEntry{
    readonly key: LiteralExpression;
    readonly value: any;
}

class MapExpression extends Expr{
    private entries: MapEntry[];

    constructor(entries: MapEntry[], position: Position) {
        super(position);
        this.type = 'MapExpression';
        this.entries = entries || [];
    }

    addElement(key: LiteralExpression, value: any){
        this.entries.push({
            key: key,
            value: value
        });
    }

    isEmpty(): boolean{
        return this.entries.length === 0;
    }

    evaluate(runtime: Runtime): {} {
        const result: {[key: string]: any} = {};
        this.entries.forEach(entry => {
           result[entry.key.evaluate(runtime) as string] = entry.value.evaluate(runtime)
        });
        return result;
    }
}

export default MapExpression;