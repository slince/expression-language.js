
import {Evaluator} from "./dist/expression.mjs";


// const code = `!!+--a`;
const code = `++ b + c++;c`;

const evaluator = new Evaluator();

const result = evaluator.parse(code);

const result2 = evaluator.evaluate(code, {
    a: {
        read: function(){
            return {a: 10}
        }
    },
    b: 2,
    c: 6
});

// console.log(result);
console.log(JSON.stringify(result), JSON.stringify(result2));