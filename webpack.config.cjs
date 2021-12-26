module.exports = {
    entry:  __dirname + "/src/expression.ts",
    mode: "development",
    output: {
        path:  __dirname + "/dist",
        filename: "expression.js",
        libraryTarget: "umd",
        library: "expression"
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    module: {
       rules: [{test: /\.tsx?$/, use: "ts-loader"}]
    }
}
