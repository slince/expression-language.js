
import {Evaluator} from "./dist/expression.mjs";


// const code = `!!+--a`;
const code = `a in b`;

const evaluator = new Evaluator();

const result = evaluator.parse(code);

const result2 = evaluator.evaluate(code, {
    // a: function(a) { return a},
    d2: {
        a: 10
    },
    a: 10,
    b: [10, 12],
    c: 6,
    d: {
        c: [1,2,3,4,5]
    }
});

// console.log(result);
console.log(JSON.stringify(result), JSON.stringify(result2));