/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["expression"] = factory();
	else
		root["expression"] = factory();
})(self, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/ast/expr/array.ts":
/*!*******************************!*\
  !*** ./src/ast/expr/array.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node */ \"./src/ast/node.ts\");\n\r\nclass ArrayExpression extends _node__WEBPACK_IMPORTED_MODULE_0__.Expr {\r\n    constructor(elements, position) {\r\n        super(position);\r\n        this.type = 'ArrayExpression';\r\n        this.elements = elements || [];\r\n    }\r\n    addElement(element) {\r\n        this.elements.push(element);\r\n    }\r\n    isEmpty() {\r\n        return this.elements.length === 0;\r\n    }\r\n    evaluate(runtime) {\r\n        return this.elements.map(element => element.evaluate(runtime));\r\n    }\r\n}\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ArrayExpression);\r\n\n\n//# sourceURL=webpack://expression/./src/ast/expr/array.ts?");

/***/ }),

/***/ "./src/ast/expr/binary.ts":
/*!********************************!*\
  !*** ./src/ast/expr/binary.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node */ \"./src/ast/node.ts\");\n/* harmony import */ var _errors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../errors */ \"./src/errors.ts\");\n\r\n\r\nclass BinaryExpression extends _node__WEBPACK_IMPORTED_MODULE_0__.Expr {\r\n    constructor(left, operator, right, position) {\r\n        super(position);\r\n        this.type = 'BinaryExpression';\r\n        this.left = left;\r\n        this.operator = operator;\r\n        this.right = right;\r\n    }\r\n    evaluate(runtime) {\r\n        const left = this.left.evaluate(runtime);\r\n        const right = this.right.evaluate(runtime);\r\n        let result;\r\n        switch (this.operator) {\r\n            case '||':\r\n                result = left || right;\r\n                break;\r\n            case '&&':\r\n                result = left && result;\r\n                break;\r\n            case '|':\r\n                result = left | right;\r\n                break;\r\n            case '^':\r\n                result = left ^ right;\r\n                break;\r\n            case '&':\r\n                result = left & right;\r\n                break;\r\n            case '==':\r\n                result = left == right;\r\n                break;\r\n            case '===':\r\n                result = left === right;\r\n                break;\r\n            case '!=':\r\n                result = left != right;\r\n                break;\r\n            case '!==':\r\n                result = left !== right;\r\n                break;\r\n            case '<':\r\n                result = left < right;\r\n                break;\r\n            case '>':\r\n                result = left > right;\r\n                break;\r\n            case '>=':\r\n                result = left >= right;\r\n                break;\r\n            case '<=':\r\n                result = left <= right;\r\n                break;\r\n            case 'not in':\r\n                result = right.indexOf(left) === -1;\r\n                break;\r\n            case 'in':\r\n                result = right.indexOf(left) > 0;\r\n                break;\r\n            case '+':\r\n                result = left + right;\r\n                break;\r\n            case '-':\r\n                result = left - right;\r\n                break;\r\n            case '~':\r\n                result = '' + left + right;\r\n                break;\r\n            case '*':\r\n                result = left * right;\r\n                break;\r\n            case '/':\r\n                if (0 == right) {\r\n                    throw new _errors__WEBPACK_IMPORTED_MODULE_1__.RuntimeError('Division by zero.', this.right.position);\r\n                }\r\n                result = left / right;\r\n                break;\r\n            case '%':\r\n                if (0 == right) {\r\n                    throw new _errors__WEBPACK_IMPORTED_MODULE_1__.RuntimeError('Modulo by zero.', this.right.position);\r\n                }\r\n                result = left % right;\r\n                break;\r\n        }\r\n        return result;\r\n    }\r\n}\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BinaryExpression);\r\n\n\n//# sourceURL=webpack://expression/./src/ast/expr/binary.ts?");

/***/ }),

/***/ "./src/ast/expr/call.ts":
/*!******************************!*\
  !*** ./src/ast/expr/call.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node */ \"./src/ast/node.ts\");\n\r\nclass CallExpression extends _node__WEBPACK_IMPORTED_MODULE_0__.Expr {\r\n    constructor(callee, args, position) {\r\n        super(position);\r\n        this.callee = callee;\r\n        this.args = args;\r\n    }\r\n    evaluate(runtime) {\r\n        const callee = this.callee.evaluate(runtime);\r\n        const args = this.args.map(arg => arg.evaluate(runtime));\r\n        return callee(args);\r\n    }\r\n}\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CallExpression);\r\n\n\n//# sourceURL=webpack://expression/./src/ast/expr/call.ts?");

/***/ }),

/***/ "./src/ast/expr/literal.ts":
/*!*********************************!*\
  !*** ./src/ast/expr/literal.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node */ \"./src/ast/node.ts\");\n\r\nclass LiteralExpression extends _node__WEBPACK_IMPORTED_MODULE_0__.Expr {\r\n    constructor(value, raw, position) {\r\n        super(position);\r\n        this.type = 'LiteralExpression';\r\n        this.value = value;\r\n        this.raw = raw;\r\n    }\r\n    evaluate(runtime) {\r\n        return this.value;\r\n    }\r\n}\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LiteralExpression);\r\n\n\n//# sourceURL=webpack://expression/./src/ast/expr/literal.ts?");

/***/ }),

/***/ "./src/ast/expr/map.ts":
/*!*****************************!*\
  !*** ./src/ast/expr/map.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node */ \"./src/ast/node.ts\");\n\r\nclass MapExpression extends _node__WEBPACK_IMPORTED_MODULE_0__.Expr {\r\n    constructor(entries, position) {\r\n        super(position);\r\n        this.type = 'MapExpression';\r\n        this.entries = entries || [];\r\n    }\r\n    addElement(key, value) {\r\n        this.entries.push({\r\n            key: key,\r\n            value: value\r\n        });\r\n    }\r\n    isEmpty() {\r\n        return this.entries.length === 0;\r\n    }\r\n    evaluate(runtime) {\r\n        const result = {};\r\n        this.entries.forEach(entry => {\r\n            result[entry.key.evaluate(runtime)] = entry.value.evaluate(runtime);\r\n        });\r\n        return result;\r\n    }\r\n}\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MapExpression);\r\n\n\n//# sourceURL=webpack://expression/./src/ast/expr/map.ts?");

/***/ }),

/***/ "./src/ast/expr/member.ts":
/*!********************************!*\
  !*** ./src/ast/expr/member.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node */ \"./src/ast/node.ts\");\n/* harmony import */ var _errors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../errors */ \"./src/errors.ts\");\n\r\n\r\nclass MemberExpression extends _node__WEBPACK_IMPORTED_MODULE_0__.Expr {\r\n    constructor(object, property, computed, position) {\r\n        super(position);\r\n        this.object = object;\r\n        this.property = property;\r\n        this.computed = computed;\r\n    }\r\n    evaluate(runtime) {\r\n        const object = this.object.evaluate(runtime);\r\n        const property = this.property.evaluate(runtime);\r\n        return object[property];\r\n    }\r\n    changeRuntime(runtime, value) {\r\n        const object = this.object.evaluate(runtime);\r\n        const property = this.property.evaluate(runtime);\r\n        if (typeof object[property] !== 'undefined' && typeof object[property] !== 'function') {\r\n            object[property] = value;\r\n        }\r\n        else {\r\n            throw new _errors__WEBPACK_IMPORTED_MODULE_1__.RuntimeError('Cannot change reference.');\r\n        }\r\n    }\r\n}\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MemberExpression);\r\n\n\n//# sourceURL=webpack://expression/./src/ast/expr/member.ts?");

/***/ }),

/***/ "./src/ast/expr/unary.ts":
/*!*******************************!*\
  !*** ./src/ast/expr/unary.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node */ \"./src/ast/node.ts\");\n/* harmony import */ var _errors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../errors */ \"./src/errors.ts\");\n\r\n\r\nclass UnaryExpression extends _node__WEBPACK_IMPORTED_MODULE_0__.Expr {\r\n    constructor(operator, argument, position) {\r\n        super(position);\r\n        this.type = 'UnaryExpression';\r\n        this.operator = operator;\r\n        this.argument = argument;\r\n    }\r\n    evaluate(runtime) {\r\n        let result;\r\n        switch (this.operator) {\r\n            case '++':\r\n                result = this.argument.evaluate(runtime);\r\n                break;\r\n            case '--':\r\n                result = this.argument.evaluate(runtime);\r\n                break;\r\n            case '!':\r\n                result = !Boolean(this.argument.evaluate(runtime));\r\n                break;\r\n            case '+':\r\n                result = this.argument.evaluate(runtime);\r\n                break;\r\n            case '-':\r\n                result = -Number(this.argument.evaluate(runtime));\r\n                break;\r\n            default:\r\n                throw new _errors__WEBPACK_IMPORTED_MODULE_1__.RuntimeError(`Unrecognized operator ${this.operator}`);\r\n        }\r\n        return result;\r\n    }\r\n}\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (UnaryExpression);\r\n\n\n//# sourceURL=webpack://expression/./src/ast/expr/unary.ts?");

/***/ }),

/***/ "./src/ast/expr/update.ts":
/*!********************************!*\
  !*** ./src/ast/expr/update.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node */ \"./src/ast/node.ts\");\n\r\nclass UpdateExpression extends _node__WEBPACK_IMPORTED_MODULE_0__.Expr {\r\n    constructor(operator, argument, prefix, position) {\r\n        super(position);\r\n        this.type = 'UpdateExpression';\r\n        this.operator = operator;\r\n        this.argument = argument;\r\n        this.prefix = prefix;\r\n        this.position = position;\r\n    }\r\n    evaluate(runtime) {\r\n        // force convert to number; not assert\r\n        const argument = Number(this.argument.evaluate(runtime));\r\n        let result = argument;\r\n        if (this.prefix) {\r\n            result = argument + 1;\r\n        }\r\n        this.argument.changeRuntime(runtime, result);\r\n        return result;\r\n    }\r\n}\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (UpdateExpression);\r\n\n\n//# sourceURL=webpack://expression/./src/ast/expr/update.ts?");

/***/ }),

/***/ "./src/ast/expr/variable.ts":
/*!**********************************!*\
  !*** ./src/ast/expr/variable.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _errors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../errors */ \"./src/errors.ts\");\n/* harmony import */ var _node__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node */ \"./src/ast/node.ts\");\n\r\n\r\nclass VariableExpression extends _node__WEBPACK_IMPORTED_MODULE_1__.Expr {\r\n    constructor(value, position) {\r\n        super(position);\r\n        this.type = 'Variable';\r\n        this.value = value;\r\n    }\r\n    evaluate(runtime) {\r\n        if (!runtime.hasReference(this.value)) {\r\n            throw new _errors__WEBPACK_IMPORTED_MODULE_0__.RuntimeError(`Undefined Reference, ${this.value} is not defined`, this.position);\r\n        }\r\n        return runtime.getReference(this.value);\r\n    }\r\n    changeRuntime(runtime, value) {\r\n        runtime.setReference(this.value, value);\r\n    }\r\n}\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (VariableExpression);\r\n\n\n//# sourceURL=webpack://expression/./src/ast/expr/variable.ts?");

/***/ }),

/***/ "./src/ast/node.ts":
/*!*************************!*\
  !*** ./src/ast/node.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Root\": () => (/* binding */ Root),\n/* harmony export */   \"Stmt\": () => (/* binding */ Stmt),\n/* harmony export */   \"Expr\": () => (/* binding */ Expr),\n/* harmony export */   \"Identifier\": () => (/* binding */ Identifier)\n/* harmony export */ });\n// root node.\r\nclass Root {\r\n    constructor(position) {\r\n        this.type = 'Node';\r\n        this.position = position;\r\n    }\r\n    evaluate(runtime) {\r\n        // ignore in root node.\r\n    }\r\n}\r\n// all statement\r\nclass Stmt extends Root {\r\n}\r\n// all expression\r\nclass Expr extends Root {\r\n}\r\nclass Identifier extends Root {\r\n    constructor(value, position) {\r\n        super(position);\r\n        this.type = 'Identifier';\r\n        this.value = value;\r\n    }\r\n    evaluate(runtime) {\r\n        return this.value;\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://expression/./src/ast/node.ts?");

/***/ }),

/***/ "./src/ast/stmt/assign.ts":
/*!********************************!*\
  !*** ./src/ast/stmt/assign.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node */ \"./src/ast/node.ts\");\n\r\nclass AssignStatement extends _node__WEBPACK_IMPORTED_MODULE_0__.Stmt {\r\n    constructor(variable, value, position) {\r\n        super(position);\r\n        this.type = 'AssignStatement';\r\n        this.variable = variable;\r\n        this.value = value;\r\n    }\r\n    evaluate(runtime) {\r\n        // change runtime runtime.\r\n        runtime.setReference(this.variable.evaluate(runtime), this.value.evaluate(runtime));\r\n    }\r\n}\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AssignStatement);\r\n\n\n//# sourceURL=webpack://expression/./src/ast/stmt/assign.ts?");

/***/ }),

/***/ "./src/ast/stmt/block.ts":
/*!*******************************!*\
  !*** ./src/ast/stmt/block.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node */ \"./src/ast/node.ts\");\n\r\nclass BlockStatement extends _node__WEBPACK_IMPORTED_MODULE_0__.Stmt {\r\n    constructor(stmts, position) {\r\n        super(position);\r\n        this.type = 'BlockStatement';\r\n        this.stmts = stmts;\r\n    }\r\n    evaluate(runtime) {\r\n        let evaluated; //return last statement.\r\n        this.stmts.forEach((stmt) => {\r\n            evaluated = stmt.evaluate(runtime);\r\n        });\r\n        return evaluated;\r\n    }\r\n}\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BlockStatement);\r\n\n\n//# sourceURL=webpack://expression/./src/ast/stmt/block.ts?");

/***/ }),

/***/ "./src/ast/stmt/expr.ts":
/*!******************************!*\
  !*** ./src/ast/stmt/expr.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node */ \"./src/ast/node.ts\");\n\r\nclass ExpressionStatement extends _node__WEBPACK_IMPORTED_MODULE_0__.Stmt {\r\n    constructor(expr, position) {\r\n        super(position);\r\n        this.type = 'ExpressionStatement';\r\n        this.expr = expr;\r\n    }\r\n    evaluate(runtime) {\r\n        return this.expr.evaluate(runtime);\r\n    }\r\n}\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ExpressionStatement);\r\n\n\n//# sourceURL=webpack://expression/./src/ast/stmt/expr.ts?");

/***/ }),

/***/ "./src/errors.ts":
/*!***********************!*\
  !*** ./src/errors.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"BaseError\": () => (/* binding */ BaseError),\n/* harmony export */   \"SyntaxError\": () => (/* binding */ SyntaxError),\n/* harmony export */   \"RuntimeError\": () => (/* binding */ RuntimeError)\n/* harmony export */ });\nclass BaseError extends Error {\r\n    constructor(message, position) {\r\n        super(message);\r\n        this.position = position;\r\n    }\r\n}\r\nclass SyntaxError extends BaseError {\r\n}\r\nclass RuntimeError extends BaseError {\r\n}\r\n\n\n//# sourceURL=webpack://expression/./src/errors.ts?");

/***/ }),

/***/ "./src/expression.ts":
/*!***************************!*\
  !*** ./src/expression.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _lexer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lexer */ \"./src/lexer.ts\");\n/* harmony import */ var _parser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parser */ \"./src/parser.ts\");\n/* harmony import */ var _runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./runtime */ \"./src/runtime.ts\");\n\r\n\r\n\r\nclass Expression {\r\n    // Evaluate the expression and return output of the last expr.\r\n    evaluate(source, context) {\r\n        const node = Expression.createParser(source).parse();\r\n        return node.evaluate(Expression.createRuntime(context));\r\n    }\r\n    // parse the ast of the source.\r\n    parse(source) {\r\n        return Expression.createParser(source).parse();\r\n    }\r\n    // tokenize source code.\r\n    lex(source) {\r\n        return Expression.createLexer(source).lex();\r\n    }\r\n    static createRuntime(context) {\r\n        if (typeof context.hasReference === 'function') {\r\n            return context;\r\n        }\r\n        return new _runtime__WEBPACK_IMPORTED_MODULE_2__.GenericRuntime(context);\r\n    }\r\n    static createParser(source) {\r\n        return new _parser__WEBPACK_IMPORTED_MODULE_1__[\"default\"](Expression.createLexer(source).lex());\r\n    }\r\n    static createLexer(source) {\r\n        return new _lexer__WEBPACK_IMPORTED_MODULE_0__[\"default\"](source);\r\n    }\r\n}\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Expression);\r\n\n\n//# sourceURL=webpack://expression/./src/expression.ts?");

/***/ }),

/***/ "./src/lexer.ts":
/*!**********************!*\
  !*** ./src/lexer.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Lexer)\n/* harmony export */ });\n/* harmony import */ var _position__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./position */ \"./src/position.ts\");\n/* harmony import */ var _token__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./token */ \"./src/token.ts\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ \"./src/utils.ts\");\n/* harmony import */ var _errors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./errors */ \"./src/errors.ts\");\n\r\n\r\n\r\n\r\nclass Lexer {\r\n    constructor(source) {\r\n        // original string\r\n        this.source = source;\r\n        this.end = this.source.length;\r\n        if (this.end === 0) {\r\n            throw new _errors__WEBPACK_IMPORTED_MODULE_3__.SyntaxError('The source code cannot be blank');\r\n        }\r\n        this.offset = 0;\r\n        this.line = 1;\r\n        this.column = 0;\r\n    }\r\n    lex() {\r\n        const tokens = new _token__WEBPACK_IMPORTED_MODULE_1__.TokenStream();\r\n        let token;\r\n        while (!this.eof()) {\r\n            // current char.\r\n            const ch = this.current();\r\n            // skip blank char.\r\n            if (ch === ' ' || ch === \"\\n\") {\r\n                this.next();\r\n                continue;\r\n            }\r\n            const position = this.position();\r\n            switch (true) {\r\n                case _utils__WEBPACK_IMPORTED_MODULE_2__[\"default\"].isDigit(ch):\r\n                    token = new _token__WEBPACK_IMPORTED_MODULE_1__.Token(2 /* T_NUM */, this.readNumber(), position);\r\n                    break;\r\n                case ch === '\\'' || ch === '\\\"':\r\n                    token = new _token__WEBPACK_IMPORTED_MODULE_1__.Token(1 /* T_STR */, this.readString(ch), position);\r\n                    break;\r\n                case _utils__WEBPACK_IMPORTED_MODULE_2__[\"default\"].isLetter(ch):\r\n                    token = new _token__WEBPACK_IMPORTED_MODULE_1__.Token(3 /* T_ID */, this.readIdentifier(), position);\r\n                    break;\r\n                default:\r\n                    token = this.lexPunctuation(position);\r\n            }\r\n            tokens.add(token);\r\n        }\r\n        tokens.add(new _token__WEBPACK_IMPORTED_MODULE_1__.Token(0 /* T_EOF */, _token__WEBPACK_IMPORTED_MODULE_1__.Tokens[0], this.position()));\r\n        return tokens;\r\n    }\r\n    lexPunctuation(position) {\r\n        let type, next;\r\n        let ch = this.current();\r\n        switch (ch) {\r\n            case '=':\r\n                type = 16 /* T_ASSIGN */;\r\n                next = this.look();\r\n                if (next === '=') {\r\n                    type = 21 /* T_EQ */;\r\n                    this.next();\r\n                }\r\n                break;\r\n            case '!':\r\n                type = 11 /* T_NOT */;\r\n                next = this.look();\r\n                if (next === '=') {\r\n                    type = 12 /* T_NEQ */;\r\n                    this.next();\r\n                }\r\n                break;\r\n            case '<':\r\n                type = 19 /* T_LT */;\r\n                next = this.look();\r\n                if (next === '=') {\r\n                    type = 20 /* T_LE */;\r\n                    this.next();\r\n                }\r\n                break;\r\n            case '>':\r\n                type = 17 /* T_GT */;\r\n                next = this.look();\r\n                if (next === '=') {\r\n                    type = 18 /* T_GE */;\r\n                    this.next();\r\n                }\r\n                break;\r\n            case '&':\r\n                type = 13 /* T_LEA */;\r\n                next = this.look();\r\n                if (next === '&') {\r\n                    type = 14 /* T_AND */;\r\n                    this.next();\r\n                }\r\n                break;\r\n            case '+':\r\n                type = 4 /* T_ADD */;\r\n                next = this.look();\r\n                if (next === '+') {\r\n                    type = 9 /* T_INC */;\r\n                    this.next();\r\n                }\r\n                break;\r\n            case '-':\r\n                type = 5 /* T_SUB */;\r\n                next = this.look();\r\n                if (next === '-') {\r\n                    type = 10 /* T_DEC */;\r\n                    this.next();\r\n                }\r\n                break;\r\n            case '*':\r\n                type = 6 /* T_MUL */;\r\n                break;\r\n            case '/':\r\n                type = 7 /* T_DIV */;\r\n                break;\r\n            case '%':\r\n                type = 8 /* T_MOD */;\r\n                break;\r\n            case '(':\r\n                type = 22 /* T_LPAREN */;\r\n                break;\r\n            case '[':\r\n                type = 23 /* T_LBRACKET */;\r\n                break;\r\n            case '{':\r\n                type = 24 /* T_LBRACE */;\r\n                break;\r\n            case ')':\r\n                type = 25 /* T_RPAREN */;\r\n                break;\r\n            case ']':\r\n                type = 26 /* T_RBRACKET */;\r\n                break;\r\n            case '}':\r\n                type = 27 /* T_RBRACE */;\r\n                break;\r\n            case ',':\r\n                type = 28 /* T_COMMA */;\r\n                break;\r\n            case ':':\r\n                type = 29 /* T_COLON */;\r\n                break;\r\n            case ';':\r\n                type = 30 /* T_SEMICOLON */;\r\n                break;\r\n            case '.':\r\n                type = 31 /* T_DOT */;\r\n                break;\r\n            case '?':\r\n                type = 32 /* T_QUESTION */;\r\n                break;\r\n            default:\r\n                throw new _errors__WEBPACK_IMPORTED_MODULE_3__.SyntaxError(`Unrecognized punctuation ${ch}`, position);\r\n        }\r\n        this.next();\r\n        return new _token__WEBPACK_IMPORTED_MODULE_1__.Token(type, _token__WEBPACK_IMPORTED_MODULE_1__.Tokens[type], position);\r\n    }\r\n    readNumber() {\r\n        let isFloat = false;\r\n        return this.readIf((ch) => {\r\n            if (ch === \".\") {\r\n                if (isFloat) {\r\n                    return false;\r\n                }\r\n                isFloat = true;\r\n                return true;\r\n            }\r\n            return _utils__WEBPACK_IMPORTED_MODULE_2__[\"default\"].isDigit(ch);\r\n        });\r\n    }\r\n    readString(beginChar) {\r\n        this.next(); // skip first ' or \"\r\n        const buffer = this.readIf((ch) => {\r\n            return ch !== beginChar;\r\n        });\r\n        this.next(); // skip last ' or \"\r\n        return buffer;\r\n    }\r\n    readIdentifier() {\r\n        return this.readIf((ch) => {\r\n            return _utils__WEBPACK_IMPORTED_MODULE_2__[\"default\"].isIdentifier(ch);\r\n        });\r\n    }\r\n    readIf(predicate) {\r\n        const buffer = [];\r\n        while (!this.eof()) {\r\n            const ch = this.next();\r\n            if (predicate(ch)) {\r\n                buffer.push(ch);\r\n                continue;\r\n            }\r\n            this.offset--; // back one if the next is not matched.\r\n            break;\r\n        }\r\n        return buffer.join('');\r\n    }\r\n    next() {\r\n        const ch = this.source.charAt(this.offset++);\r\n        if (ch === \"\\n\") {\r\n            this.line++;\r\n            this.column = 0;\r\n        }\r\n        else {\r\n            this.column++;\r\n        }\r\n        return ch;\r\n    }\r\n    look() {\r\n        return this.source.charAt(this.offset + 1);\r\n    }\r\n    current() {\r\n        return this.source.charAt(this.offset);\r\n    }\r\n    eof() {\r\n        return this.current() === '';\r\n    }\r\n    position() {\r\n        return new _position__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.offset, this.line, this.column);\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://expression/./src/lexer.ts?");

/***/ }),

/***/ "./src/parser.ts":
/*!***********************!*\
  !*** ./src/parser.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Parser)\n/* harmony export */ });\n/* harmony import */ var _errors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./errors */ \"./src/errors.ts\");\n/* harmony import */ var _ast_expr_array__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ast/expr/array */ \"./src/ast/expr/array.ts\");\n/* harmony import */ var _ast_expr_literal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ast/expr/literal */ \"./src/ast/expr/literal.ts\");\n/* harmony import */ var _ast_stmt_assign__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ast/stmt/assign */ \"./src/ast/stmt/assign.ts\");\n/* harmony import */ var _ast_expr_map__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ast/expr/map */ \"./src/ast/expr/map.ts\");\n/* harmony import */ var _ast_expr_binary__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ast/expr/binary */ \"./src/ast/expr/binary.ts\");\n/* harmony import */ var _ast_stmt_expr__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ast/stmt/expr */ \"./src/ast/stmt/expr.ts\");\n/* harmony import */ var _ast_stmt_block__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ast/stmt/block */ \"./src/ast/stmt/block.ts\");\n/* harmony import */ var _ast_expr_variable__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./ast/expr/variable */ \"./src/ast/expr/variable.ts\");\n/* harmony import */ var _ast_expr_member__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./ast/expr/member */ \"./src/ast/expr/member.ts\");\n/* harmony import */ var _ast_expr_call__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./ast/expr/call */ \"./src/ast/expr/call.ts\");\n/* harmony import */ var _ast_expr_update__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./ast/expr/update */ \"./src/ast/expr/update.ts\");\n/* harmony import */ var _ast_expr_unary__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./ast/expr/unary */ \"./src/ast/expr/unary.ts\");\n/* harmony import */ var _ast_node__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./ast/node */ \"./src/ast/node.ts\");\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\nclass Parser {\r\n    constructor(tokens) {\r\n        this.tokens = tokens;\r\n    }\r\n    parse() {\r\n        const token = this.tokens.current();\r\n        const stmts = [];\r\n        while (!this.tokens.eof()) {\r\n            stmts.push(this.parseStatement());\r\n        }\r\n        return new _ast_stmt_block__WEBPACK_IMPORTED_MODULE_7__[\"default\"](stmts, token.position);\r\n    }\r\n    parseStatement() {\r\n        const token = this.tokens.current();\r\n        let stmt;\r\n        if (token.test(3 /* T_ID */) && this.tokens.look().test(16 /* T_ASSIGN */)) {\r\n            stmt = this.parseAssignStatement();\r\n        }\r\n        else if (token.test(24 /* T_LBRACE */) && !this.tokens.look().test(27 /* T_RBRACE */) && !this.tokens.look(2).test(29 /* T_COLON */)) {\r\n            stmt = this.parseBlockStatement();\r\n        }\r\n        else {\r\n            stmt = new _ast_stmt_expr__WEBPACK_IMPORTED_MODULE_6__[\"default\"](this.parseExpression(), token.position);\r\n        }\r\n        if (!this.tokens.current().test(0 /* T_EOF */)) {\r\n            this.tokens.expect(30 /* T_SEMICOLON */);\r\n        }\r\n        return stmt;\r\n    }\r\n    parseBlockStatement() {\r\n        this.tokens.expect(24 /* T_LBRACE */, 'A block must begin with an opening braces');\r\n        const token = this.tokens.current();\r\n        const stmts = [];\r\n        while (!this.tokens.current().test(27 /* T_RBRACE */)) {\r\n            stmts.push(this.parseStatement());\r\n        }\r\n        this.tokens.expect(27 /* T_RBRACE */, 'A block must be closed by a braces');\r\n        return new _ast_stmt_block__WEBPACK_IMPORTED_MODULE_7__[\"default\"](stmts, token.position);\r\n    }\r\n    parseAssignStatement() {\r\n        const token = this.tokens.current();\r\n        const variable = new _ast_node__WEBPACK_IMPORTED_MODULE_13__.Identifier(token.value, token.position);\r\n        return new _ast_stmt_assign__WEBPACK_IMPORTED_MODULE_3__[\"default\"](variable, this.parseExpression(), token.position);\r\n    }\r\n    parseExpression() {\r\n        let expr = this.parsePrimaryExpression();\r\n        if (this.tokens.current().isBinaryOperator()) {\r\n            expr = this.parseBinaryExpression(expr);\r\n        }\r\n        return expr;\r\n    }\r\n    parsePrimaryExpression() {\r\n        const token = this.tokens.current();\r\n        let expr;\r\n        switch (token.type) {\r\n            // constant\r\n            case 1 /* T_STR */:\r\n                expr = new _ast_expr_literal__WEBPACK_IMPORTED_MODULE_2__[\"default\"](token.value, token.value, token.position);\r\n                this.tokens.next();\r\n                break;\r\n            case 2 /* T_NUM */:\r\n                expr = new _ast_expr_literal__WEBPACK_IMPORTED_MODULE_2__[\"default\"](Number(token.value), token.value, token.position);\r\n                this.tokens.next();\r\n                break;\r\n            // identifier\r\n            case 3 /* T_ID */:\r\n                expr = this.parseIdentifierExpression();\r\n                break;\r\n            // punctuation\r\n            case 23 /* T_LBRACKET */:\r\n                expr = this.parseArrayExpression();\r\n                break;\r\n            case 24 /* T_LBRACE */:\r\n                expr = this.parseMapExpression();\r\n                break;\r\n            case 22 /* T_LPAREN */:\r\n                expr = this.parseParenExpression();\r\n                break;\r\n            // unary operator\r\n            case 9 /* T_INC */:\r\n            case 10 /* T_DEC */:\r\n                expr = this.parseUpdateExpression(true);\r\n                break;\r\n            case 11 /* T_NOT */:\r\n            case 4 /* T_ADD */:\r\n            case 5 /* T_SUB */:\r\n                expr = this.parseUnaryExpression();\r\n                break;\r\n            default:\r\n                throw new _errors__WEBPACK_IMPORTED_MODULE_0__.SyntaxError(`Unexpected token \"${token.type}\" of value \"${token.value}\".`);\r\n        }\r\n        return this.parsePosixExpression(expr);\r\n    }\r\n    parsePosixExpression(expr) {\r\n        while (true) {\r\n            const token = this.tokens.current();\r\n            let end = false;\r\n            switch (token.type) {\r\n                case 22 /* T_LPAREN */:\r\n                    expr = new _ast_expr_call__WEBPACK_IMPORTED_MODULE_10__[\"default\"](expr, this.parseArguments(), token.position);\r\n                    break;\r\n                case 31 /* T_DOT */:\r\n                    expr = this.parseObjectExpression(expr);\r\n                    break;\r\n                case 23 /* T_LBRACKET */: // array[1] , map['property']\r\n                    expr = this.parseAccessExpression(expr);\r\n                    break;\r\n                default:\r\n                    if (this.tokens.current().testAny(9 /* T_INC */, 10 /* T_DEC */)) { // unary operator\r\n                        expr = this.parseUpdateExpression(false, expr);\r\n                    }\r\n                    else {\r\n                        end = true;\r\n                    }\r\n            }\r\n            if (end) {\r\n                break;\r\n            }\r\n        }\r\n        return expr;\r\n    }\r\n    parseIdentifierExpression() {\r\n        const token = this.tokens.current();\r\n        let expr;\r\n        switch (token.value) {\r\n            case 'true':\r\n            case 'TRUE':\r\n                expr = new _ast_expr_literal__WEBPACK_IMPORTED_MODULE_2__[\"default\"](true, token.value, token.position);\r\n                break;\r\n            case 'false':\r\n            case 'FALSE':\r\n                expr = new _ast_expr_literal__WEBPACK_IMPORTED_MODULE_2__[\"default\"](false, token.value, token.position);\r\n                break;\r\n            case 'null':\r\n            case 'NULL':\r\n                expr = new _ast_expr_literal__WEBPACK_IMPORTED_MODULE_2__[\"default\"](null, token.value, token.position);\r\n                break;\r\n            default:\r\n                expr = new _ast_expr_variable__WEBPACK_IMPORTED_MODULE_8__[\"default\"](token.value, token.position);\r\n        }\r\n        this.tokens.next();\r\n        return expr;\r\n    }\r\n    parseObjectExpression(object) {\r\n        this.tokens.expect(31 /* T_DOT */);\r\n        const token = this.tokens.expect(3 /* T_ID */);\r\n        const property = new _ast_node__WEBPACK_IMPORTED_MODULE_13__.Identifier(token.value, token.position);\r\n        let expr = new _ast_expr_member__WEBPACK_IMPORTED_MODULE_9__[\"default\"](object, property, false, object.position);\r\n        if (this.tokens.current().test(22 /* T_LPAREN */)) { // method\r\n            expr = new _ast_expr_call__WEBPACK_IMPORTED_MODULE_10__[\"default\"](expr, this.parseArguments(), object.position);\r\n        }\r\n        return expr;\r\n    }\r\n    parseAccessExpression(object) {\r\n        this.tokens.expect(23 /* T_LBRACKET */);\r\n        const property = this.parseExpression();\r\n        this.tokens.expect(26 /* T_RBRACKET */);\r\n        return new _ast_expr_member__WEBPACK_IMPORTED_MODULE_9__[\"default\"](object, property, false, object.position);\r\n    }\r\n    parseBinaryExpression(expr) {\r\n        // a + b * c / d\r\n        // a * b + c\r\n        while (this.tokens.current().isBinaryOperator()) {\r\n            expr = this.doParseBinary(expr);\r\n        }\r\n        return expr;\r\n    }\r\n    doParseBinary(left) {\r\n        const token = this.tokens.current();\r\n        const operator = token.value;\r\n        const currentPrecedence = token.getBinaryPrecedence().precedence;\r\n        // right expr.\r\n        this.tokens.next();\r\n        let right = this.parsePrimaryExpression();\r\n        const nextPrecedence = this.tokens.current().getBinaryPrecedence().precedence;\r\n        if (currentPrecedence < nextPrecedence) {\r\n            right = this.doParseBinary(right);\r\n        }\r\n        return new _ast_expr_binary__WEBPACK_IMPORTED_MODULE_5__[\"default\"](left, operator, right, left.position);\r\n    }\r\n    parseUnaryExpression() {\r\n        // !+-+-+-!!+-10\r\n        const token = this.tokens.current();\r\n        const operator = token.value;\r\n        this.tokens.next();\r\n        const argument = this.parsePrimaryExpression();\r\n        return new _ast_expr_unary__WEBPACK_IMPORTED_MODULE_12__[\"default\"](operator, argument, token.position);\r\n    }\r\n    parseUpdateExpression(prefix, argument) {\r\n        const token = this.tokens.expectOneOf(9 /* T_INC */, 10 /* T_DEC */);\r\n        if (prefix) { // ++a ++a.b ++a.read()\r\n            // ++ a + 1\r\n            // a + b --\r\n            argument = this.parsePrimaryExpression();\r\n        }\r\n        else { // a ++  a.b ++ a.c() ++\r\n        }\r\n        if (!(argument instanceof _ast_expr_variable__WEBPACK_IMPORTED_MODULE_8__[\"default\"]) && !(argument instanceof _ast_expr_member__WEBPACK_IMPORTED_MODULE_9__[\"default\"])) {\r\n            throw new _errors__WEBPACK_IMPORTED_MODULE_0__.SyntaxError('Invalid left-hand side in assignment');\r\n        }\r\n        return new _ast_expr_update__WEBPACK_IMPORTED_MODULE_11__[\"default\"](token.value, argument, prefix, prefix ? token.position : argument.position);\r\n    }\r\n    parseParenExpression() {\r\n        this.tokens.expect(22 /* T_LPAREN */);\r\n        const expr = this.parseExpression();\r\n        this.tokens.expect(25 /* T_RPAREN */);\r\n        return expr;\r\n    }\r\n    parseArrayExpression() {\r\n        const token = this.tokens.current();\r\n        const expr = new _ast_expr_array__WEBPACK_IMPORTED_MODULE_1__[\"default\"]([], token.position);\r\n        while (!this.tokens.current().test(26 /* T_RBRACKET */)) {\r\n            if (!expr.isEmpty()) {\r\n                this.tokens.expect(28 /* T_COMMA */, 'An array element must be followed by a comma');\r\n            }\r\n            expr.addElement(this.parseExpression());\r\n        }\r\n        this.tokens.expect(26 /* T_RBRACKET */, 'An array element must be closed by a brackets');\r\n        return expr;\r\n    }\r\n    parseMapExpression() {\r\n        const token = this.tokens.current();\r\n        this.tokens.expect(24 /* T_LBRACE */, 'A map must begin with an opening braces');\r\n        const expr = new _ast_expr_map__WEBPACK_IMPORTED_MODULE_4__[\"default\"]([], token.position);\r\n        while (!this.tokens.current().test(27 /* T_RBRACE */)) {\r\n            if (!expr.isEmpty()) {\r\n                this.tokens.expect(28 /* T_COMMA */, 'A map must be followed by a comma');\r\n            }\r\n            const key = this.tokens.expect(1 /* T_STR */, 'A map key must be a string');\r\n            this.tokens.expect(29 /* T_COLON */, 'The map key and value must be separated by a colon(:)');\r\n            const value = this.parseExpression();\r\n            expr.addElement(new _ast_expr_literal__WEBPACK_IMPORTED_MODULE_2__[\"default\"](key.value, key.value, key.position), value);\r\n        }\r\n        this.tokens.expect(27 /* T_RBRACE */, 'A map must be closed by a braces');\r\n        return expr;\r\n    }\r\n    parseArguments() {\r\n        // the_foo_func(1, \"foo\")\r\n        const args = [];\r\n        this.tokens.expect(22 /* T_LPAREN */, 'A list of arguments must begin with an opening parenthesis');\r\n        while (!this.tokens.current().test(25 /* T_RPAREN */)) {\r\n            if (args.length > 0) { // the prev arguments is exists.\r\n                this.tokens.expect(28 /* T_COMMA */, 'Arguments must be separated by a comma');\r\n            }\r\n            args.push(this.parseExpression());\r\n        }\r\n        this.tokens.expect(25 /* T_RPAREN */, 'A list of arguments must be closed by a parenthesis');\r\n        return args;\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://expression/./src/parser.ts?");

/***/ }),

/***/ "./src/position.ts":
/*!*************************!*\
  !*** ./src/position.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Position)\n/* harmony export */ });\nclass Position {\r\n    constructor(offset, line, column) {\r\n        this.offset = offset;\r\n        this.line = line;\r\n        this.column = column;\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://expression/./src/position.ts?");

/***/ }),

/***/ "./src/runtime.ts":
/*!************************!*\
  !*** ./src/runtime.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"GenericRuntime\": () => (/* binding */ GenericRuntime)\n/* harmony export */ });\nclass GenericRuntime {\r\n    constructor(context) {\r\n        this.context = new Map;\r\n        for (let key in context) {\r\n            this.context.set(key, context[key]);\r\n        }\r\n    }\r\n    hasReference(property) {\r\n        return this.context.has(property);\r\n    }\r\n    getReference(property) {\r\n        return this.context.get(property);\r\n    }\r\n    setReference(property, value) {\r\n        this.context.set(property, value);\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://expression/./src/runtime.ts?");

/***/ }),

/***/ "./src/token.ts":
/*!**********************!*\
  !*** ./src/token.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Tokens\": () => (/* binding */ Tokens),\n/* harmony export */   \"Token\": () => (/* binding */ Token),\n/* harmony export */   \"TokenStream\": () => (/* binding */ TokenStream)\n/* harmony export */ });\n/* harmony import */ var _errors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./errors */ \"./src/errors.ts\");\n\r\n// token name\r\nconst Tokens = {};\r\nTokens[0 /* T_EOF */] = 'eof';\r\nTokens[1 /* T_STR */] = 'string';\r\nTokens[2 /* T_NUM */] = 'number';\r\nTokens[3 /* T_ID */] = 'id';\r\nTokens[4 /* T_ADD */] = '+';\r\nTokens[5 /* T_SUB */] = '-';\r\nTokens[6 /* T_MUL */] = '*';\r\nTokens[7 /* T_DIV */] = '/';\r\nTokens[8 /* T_MOD */] = '%';\r\nTokens[9 /* T_INC */] = '++';\r\nTokens[10 /* T_DEC */] = '--';\r\nTokens[11 /* T_NOT */] = '!';\r\nTokens[12 /* T_NEQ */] = '!=';\r\nTokens[13 /* T_LEA */] = '&';\r\nTokens[14 /* T_AND */] = '&&';\r\nTokens[15 /* T_OR */] = '||';\r\nTokens[16 /* T_ASSIGN */] = '=';\r\nTokens[17 /* T_GT */] = '>';\r\nTokens[18 /* T_GE */] = '>=';\r\nTokens[19 /* T_LT */] = '<';\r\nTokens[20 /* T_LE */] = '<=';\r\nTokens[21 /* T_EQ */] = '==';\r\nTokens[22 /* T_LPAREN */] = '(';\r\nTokens[23 /* T_LBRACKET */] = '[';\r\nTokens[24 /* T_LBRACE */] = '{';\r\nTokens[25 /* T_RPAREN */] = ')';\r\nTokens[26 /* T_RBRACKET */] = ']';\r\nTokens[27 /* T_RBRACE */] = '}';\r\nTokens[28 /* T_COMMA */] = ',';\r\nTokens[29 /* T_COLON */] = ':';\r\nTokens[30 /* T_SEMICOLON */] = ';';\r\nTokens[31 /* T_DOT */] = '.';\r\nTokens[32 /* T_QUESTION */] = '?';\r\nconst defaultOperatorPrecedence = {\r\n    precedence: -1\r\n};\r\nconst binaryOperators = {\r\n    'or': { 'precedence': 10, 'associativity': 1 /* Left */ },\r\n    '||': { 'precedence': 10, 'associativity': 1 /* Left */ },\r\n    'and': { 'precedence': 15, 'associativity': 1 /* Left */ },\r\n    '&&': { 'precedence': 15, 'associativity': 1 /* Left */ },\r\n    '|': { 'precedence': 16, 'associativity': 1 /* Left */ },\r\n    '^': { 'precedence': 17, 'associativity': 1 /* Left */ },\r\n    '&': { 'precedence': 18, 'associativity': 1 /* Left */ },\r\n    '==': { 'precedence': 20, 'associativity': 1 /* Left */ },\r\n    '!=': { 'precedence': 20, 'associativity': 1 /* Left */ },\r\n    '<': { 'precedence': 20, 'associativity': 1 /* Left */ },\r\n    '>': { 'precedence': 20, 'associativity': 1 /* Left */ },\r\n    '>=': { 'precedence': 20, 'associativity': 1 /* Left */ },\r\n    '<=': { 'precedence': 20, 'associativity': 1 /* Left */ },\r\n    'not in': { 'precedence': 20, 'associativity': 1 /* Left */ },\r\n    'in': { 'precedence': 20, 'associativity': 1 /* Left */ },\r\n    '..': { 'precedence': 25, 'associativity': 1 /* Left */ },\r\n    '+': { 'precedence': 30, 'associativity': 1 /* Left */ },\r\n    '-': { 'precedence': 30, 'associativity': 1 /* Left */ },\r\n    '~': { 'precedence': 40, 'associativity': 1 /* Left */ },\r\n    '*': { 'precedence': 60, 'associativity': 1 /* Left */ },\r\n    '/': { 'precedence': 60, 'associativity': 1 /* Left */ },\r\n    '%': { 'precedence': 60, 'associativity': 1 /* Left */ },\r\n    '**': { 'precedence': 200, 'associativity': 2 /* Right */ },\r\n};\r\nconst unaryOperators = {\r\n    'not': { 'precedence': 50 },\r\n    '!': { 'precedence': 50 },\r\n    '-': { 'precedence': 500 },\r\n    '+': { 'precedence': 500 },\r\n    '--': { 'precedence': 500 },\r\n    '++': { 'precedence': 500 },\r\n};\r\nclass Token {\r\n    constructor(type, value, position) {\r\n        this.type = type;\r\n        this.value = value;\r\n        this.position = position;\r\n    }\r\n    // test whether the token match the given token type\r\n    test(type) {\r\n        return this.type === type;\r\n    }\r\n    testAny(...types) {\r\n        return types.indexOf(this.type) > -1;\r\n    }\r\n    isBinaryOperator() {\r\n        return typeof binaryOperators[Tokens[this.type]] !== 'undefined';\r\n    }\r\n    getBinaryPrecedence() {\r\n        if (this.isBinaryOperator()) {\r\n            return binaryOperators[Tokens[this.type]];\r\n        }\r\n        return defaultOperatorPrecedence;\r\n    }\r\n}\r\nclass TokenStream {\r\n    constructor() {\r\n        this.index = 0;\r\n        this.tokens = [];\r\n    }\r\n    add(token) {\r\n        this.tokens.push(token);\r\n    }\r\n    current() {\r\n        return this.tokens[this.index];\r\n    }\r\n    next() {\r\n        return this.tokens[this.index++];\r\n    }\r\n    look(number) {\r\n        return this.tokens[this.index + (number || 1)];\r\n    }\r\n    expect(type, message) {\r\n        const token = this.current();\r\n        const value = Tokens[type];\r\n        if (!token.test(type)) {\r\n            message = `${message ? message + '. ' : ''}Unexpected token \"${token.type}\" of value \"${token.value}\" (\"${type}\" expected ${value ? 'with value ' + value : ''}).`;\r\n            throw new _errors__WEBPACK_IMPORTED_MODULE_0__.SyntaxError(message, token.position);\r\n        }\r\n        this.next();\r\n        return token;\r\n    }\r\n    expectOneOf(...types) {\r\n        const token = this.current();\r\n        if (!token.testAny(...types)) {\r\n            const values = types.map((type) => Tokens[type] || '');\r\n            const message = `Unexpected token \"${token.type}\" of value \"${token.value}\" (\"${types.join(',')}\" expected ${values ? 'with value ' + values.join(',') : ''}).`;\r\n            throw new _errors__WEBPACK_IMPORTED_MODULE_0__.SyntaxError(message, token.position);\r\n        }\r\n        this.next();\r\n        return token;\r\n    }\r\n    eof() {\r\n        return this.tokens[this.index].type === 0 /* T_EOF */;\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://expression/./src/token.ts?");

/***/ }),

/***/ "./src/utils.ts":
/*!**********************!*\
  !*** ./src/utils.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\r\n    isDigit: function (ch) {\r\n        return /[0-9]/i.test(ch);\r\n    },\r\n    isLetter: function (ch) {\r\n        return /[a-z_]/i.test(ch);\r\n    },\r\n    isIdentifier: function (ch) {\r\n        return /\\w/i.test(ch);\r\n    }\r\n});\r\n\n\n//# sourceURL=webpack://expression/./src/utils.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/expression.ts");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});