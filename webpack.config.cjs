module.exports = {
    entry:  __dirname + "/src/expression.js",
    output: {
        path:  __dirname + "/dist",
        filename: "expression.js",
        libraryTarget: "umd",
        library: "expression"
    }
}
