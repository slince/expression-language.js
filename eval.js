import Evaluator from "./src/evaluator.js";


const code = `!!+--a`;
// const code = `++ b + c++`;

const evaluator = new Evaluator();

const result = evaluator.parse(code, {
    a: {
      read: function(){
          return {a: 10}
      }
    },
    b: 2,
    c: 6
});


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