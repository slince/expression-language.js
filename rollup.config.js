import json from '@rollup/plugin-json';
import typescript from '@rollup/plugin-typescript';

const outputDir = "dist";

export default {
    input: "./src/expression.ts",
    output: [
        {
            file: `${outputDir}/expression.js`,
            format: "umd",
            name: "expression",
        },
        {
            file: `${outputDir}/expression.mjs`,
            format: "module",
            name: "expression",
        }
    ],
    plugins: [json(), typescript({target: "es5"})]
}