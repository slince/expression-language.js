import Evaluator from "./src/evaluator.js";


// const code = `!!+-a`;
const code = `a + b / c`;

const evaluator = new Evaluator();

const result = evaluator.parse(code, {
      a: {
          read: function(){
              return {a: 10}
          }
      }
});

// console.log(result);
console.log(JSON.stringify(result));