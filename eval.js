import Evaluator from "./src/evaluator.js";


const code = `
1 + 2 +3
`;

const evaluator = new Evaluator();

const result = evaluator.parse(code);

// console.log(result);
console.log(JSON.stringify(result));