
import Expression from "./dist/expression.js";


const code = `!!+--a`;
// const code = `++ b + c++`;

const evaluator = new Expression();

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