import Expr from "../expr.js";

class MapEntry{
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }
}

class MapExpression extends Expr{
    constructor(entries, position) {
        super(position);
        this.type = 'MapExpression';
        this.entries = entries || [];
    }

    addElement(key, value){
        this.entries.push(new MapEntry(key, value));
    }

    isEmpty(){
        return this.entries.length === 0;
    }

    evaluate(runtime) {
        const result = {};
        this.entries.forEach(entry => {
           result[entry.key.evaluate(runtime)] = entry.value.evaluate(runtime)
        });
        return result;
    }
}

export {MapEntry, MapExpression};