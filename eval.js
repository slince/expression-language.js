import Evaluator from "./src/evaluator.js";


const code = `
1 + 2 +3 + a
`;

const evaluator = new Evaluator();

const result = evaluator.evaluate(code);

console.log(result);
console.log(JSON.stringify(result));