import Expr from "../expr.js";

class MapEntry{
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }
}

class MapExpression extends Expr{
    constructor(entries, lineno) {
        super(null, lineno);
        this.type = 'MapExpression';
        this.entries = entries || [];
    }

    addElement(key, value){
        this.entries.push(new MapEntry(key, value));
    }

    isEmpty(){
        return this.entries.length === 0;
    }

    evaluate(context) {
        const result = {};
        this.entries.forEach(entry => {
           result[entry.key.evaluate(context)] = entry.value.evaluate(context)
        });
        return result;
    }
}

export {MapEntry, MapExpression};