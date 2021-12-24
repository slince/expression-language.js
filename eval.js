import Evaluator from "./src/evaluator.js";


const code = `
1 + 2 + 3 + a
`;

const evaluator = new Evaluator();

const result = evaluator.evaluate(code, {
  variables: {
      'a': 10
  }
});

console.log(result);
// console.log(JSON.stringify(result));