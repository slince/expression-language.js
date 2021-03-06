var Position = /** @class */ (function () {
    function Position(offset, line, column) {
        this.offset = offset;
        this.line = line;
        this.column = column;
    }
    return Position;
}());

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var BaseError = /** @class */ (function (_super) {
    __extends(BaseError, _super);
    function BaseError(message, position) {
        var _this = _super.call(this, message) || this;
        _this.position = position;
        return _this;
    }
    return BaseError;
}(Error));
var SyntaxError = /** @class */ (function (_super) {
    __extends(SyntaxError, _super);
    function SyntaxError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return SyntaxError;
}(BaseError));
var RuntimeError = /** @class */ (function (_super) {
    __extends(RuntimeError, _super);
    function RuntimeError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return RuntimeError;
}(BaseError));

// token name
var Tokens = {};
Tokens[0 /* T_EOF */] = 'eof';
Tokens[1 /* T_STR */] = 'string';
Tokens[2 /* T_NUM */] = 'number';
Tokens[3 /* T_ID */] = 'id';
Tokens[4 /* T_ADD */] = '+';
Tokens[5 /* T_SUB */] = '-';
Tokens[6 /* T_MUL */] = '*';
Tokens[7 /* T_DIV */] = '/';
Tokens[8 /* T_MOD */] = '%';
Tokens[9 /* T_AMP */] = '&';
Tokens[10 /* T_PIPE */] = '|';
Tokens[11 /* T_XOR */] = '^';
Tokens[12 /* T_SHL */] = '<<';
Tokens[13 /* T_SHR */] = '>>';
Tokens[14 /* T_INC */] = '++';
Tokens[15 /* T_DEC */] = '--';
Tokens[16 /* T_NOT */] = '!';
Tokens[17 /* T_NEQ */] = '!=';
Tokens[18 /* T_STRICT_NEQ */] = '!==';
Tokens[19 /* T_AND */] = '&&';
Tokens[20 /* T_OR */] = '||';
Tokens[21 /* T_ASSIGN */] = '=';
Tokens[22 /* T_GT */] = '>';
Tokens[23 /* T_GE */] = '>=';
Tokens[24 /* T_LT */] = '<';
Tokens[25 /* T_LE */] = '<=';
Tokens[26 /* T_EQ */] = '==';
Tokens[27 /* T_STRICT_EQ */] = '===';
Tokens[28 /* T_LPAREN */] = '(';
Tokens[29 /* T_LBRACKET */] = '[';
Tokens[30 /* T_LBRACE */] = '{';
Tokens[31 /* T_RPAREN */] = ')';
Tokens[32 /* T_RBRACKET */] = ']';
Tokens[33 /* T_RBRACE */] = '}';
Tokens[34 /* T_COMMA */] = ',';
Tokens[35 /* T_COLON */] = ':';
Tokens[36 /* T_SEMICOLON */] = ';';
Tokens[37 /* T_DOT */] = '.';
Tokens[38 /* T_QUESTION */] = '?';
// keywords
Tokens[40 /* T_KW_NOT */] = 'not';
Tokens[41 /* T_KW_OR */] = 'or';
Tokens[42 /* T_KW_AND */] = 'and';
Tokens[43 /* T_KW_IN */] = 'in';
Tokens[44 /* T_KW_IS */] = 'is';
// list all keywords.
var keywords = {
    'not': 40 /* T_KW_NOT */,
    'or': 41 /* T_KW_OR */,
    'and': 42 /* T_KW_AND */,
    'in': 43 /* T_KW_IN */,
    'is': 44 /* T_KW_IS */
};
var defaultOperatorPrecedence = {
    precedence: -1
};
var binaryOperators = {
    'or': { 'precedence': 10, 'associativity': 1 /* Left */ },
    '||': { 'precedence': 10, 'associativity': 1 /* Left */ },
    'and': { 'precedence': 15, 'associativity': 1 /* Left */ },
    '&&': { 'precedence': 15, 'associativity': 1 /* Left */ },
    '|': { 'precedence': 16, 'associativity': 1 /* Left */ },
    '^': { 'precedence': 17, 'associativity': 1 /* Left */ },
    '&': { 'precedence': 18, 'associativity': 1 /* Left */ },
    '==': { 'precedence': 20, 'associativity': 1 /* Left */ },
    '===': { 'precedence': 20, 'associativity': 1 /* Left */ },
    'is': { 'precedence': 20, 'associativity': 1 /* Left */ },
    '!=': { 'precedence': 20, 'associativity': 1 /* Left */ },
    '!==': { 'precedence': 20, 'associativity': 1 /* Left */ },
    '<': { 'precedence': 20, 'associativity': 1 /* Left */ },
    '>': { 'precedence': 20, 'associativity': 1 /* Left */ },
    '>=': { 'precedence': 20, 'associativity': 1 /* Left */ },
    '<=': { 'precedence': 20, 'associativity': 1 /* Left */ },
    'not in': { 'precedence': 20, 'associativity': 1 /* Left */ },
    'in': { 'precedence': 20, 'associativity': 1 /* Left */ },
    '<<': { 'precedence': 25, 'associativity': 1 /* Left */ },
    '>>': { 'precedence': 25, 'associativity': 1 /* Left */ },
    '+': { 'precedence': 30, 'associativity': 1 /* Left */ },
    '-': { 'precedence': 30, 'associativity': 1 /* Left */ },
    '~': { 'precedence': 40, 'associativity': 1 /* Left */ },
    '*': { 'precedence': 60, 'associativity': 1 /* Left */ },
    '/': { 'precedence': 60, 'associativity': 1 /* Left */ },
    '%': { 'precedence': 60, 'associativity': 1 /* Left */ },
};
// keyword utils.
var Keyword = {
    lookup: function (identifier) {
        if (typeof keywords[identifier] !== 'undefined') {
            return keywords[identifier];
        }
        return 3 /* T_ID */;
    },
    isKeyword: function (type) {
        return 39 /* T_KW_BEGIN */ < type && type < 45 /* T_KW_END */;
    }
};
var Token = /** @class */ (function () {
    function Token(type, value, position) {
        this.type = type;
        this.value = value;
        this.position = position;
    }
    // test whether the token match the given token type
    Token.prototype.test = function (type) {
        return this.type === type;
    };
    Token.prototype.testAny = function () {
        var types = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            types[_i] = arguments[_i];
        }
        return types.indexOf(this.type) > -1;
    };
    Token.prototype.isBinaryOperator = function () {
        return typeof binaryOperators[Tokens[this.type]] !== 'undefined';
    };
    Token.prototype.getBinaryPrecedence = function () {
        if (this.isBinaryOperator()) {
            return binaryOperators[Tokens[this.type]];
        }
        return defaultOperatorPrecedence;
    };
    return Token;
}());
var TokenStream = /** @class */ (function () {
    function TokenStream() {
        this.index = 0;
        this.tokens = [];
    }
    TokenStream.prototype.add = function (token) {
        this.tokens.push(token);
    };
    TokenStream.prototype.current = function () {
        return this.tokens[this.index];
    };
    TokenStream.prototype.next = function () {
        return this.tokens[this.index++];
    };
    TokenStream.prototype.look = function (number) {
        return this.tokens[this.index + (number || 1)];
    };
    TokenStream.prototype.count = function () {
        return this.tokens.length;
    };
    TokenStream.prototype.expect = function (type, message) {
        var token = this.current();
        var value = Tokens[type];
        if (!token.test(type)) {
            message = "".concat(message ? message + '. ' : '', "Unexpected token \"").concat(token.type, "\" of value \"").concat(token.value, "\" (\"").concat(type, "\" expected ").concat(value ? 'with value ' + value : '', ").");
            throw new SyntaxError(message, token.position);
        }
        this.next();
        return token;
    };
    TokenStream.prototype.expectOneOf = function () {
        var types = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            types[_i] = arguments[_i];
        }
        var token = this.current();
        if (!token.testAny.apply(token, types)) {
            var values = types.map(function (type) { return Tokens[type] || ''; });
            var message = "Unexpected token \"".concat(token.type, "\" of value \"").concat(token.value, "\" (\"").concat(types.join(','), "\" expected ").concat(values ? 'with value ' + values.join(',') : '', ").");
            throw new SyntaxError(message, token.position);
        }
        this.next();
        return token;
    };
    TokenStream.prototype.eof = function () {
        return this.tokens[this.index].type === 0 /* T_EOF */;
    };
    return TokenStream;
}());

var Utils = {
    isDigit: function (ch) {
        return /[0-9]/i.test(ch);
    },
    isLetter: function (ch) {
        return /[a-z_]/i.test(ch);
    },
    isIdentifier: function (ch) {
        return /\w/i.test(ch);
    }
};

var Lexer = /** @class */ (function () {
    function Lexer(source) {
        // original string
        this.source = source;
        this.end = this.source.length;
        if (this.end === 0) {
            throw new SyntaxError('The source code cannot be blank');
        }
        this.offset = 0;
        this.line = 0;
        this.column = 0;
    }
    Lexer.prototype.lex = function () {
        var tokens = new TokenStream();
        var token;
        while (!this.eof()) {
            // current char.
            var ch = this.current();
            // skip blank char.
            if (ch === ' ' || ch === "\n") {
                this.next();
                continue;
            }
            var position = this.position();
            switch (true) {
                case Utils.isDigit(ch):
                    token = new Token(2 /* T_NUM */, this.readNumber(), position);
                    break;
                case ch === '\'' || ch === '\"':
                    token = new Token(1 /* T_STR */, this.readString(ch), position);
                    break;
                case Utils.isLetter(ch):
                    var identifier = this.readIdentifier();
                    var type = Keyword.lookup(identifier);
                    token = new Token(type, identifier, position);
                    break;
                default:
                    token = this.lexPunctuation(position);
            }
            tokens.add(token);
        }
        tokens.add(new Token(0 /* T_EOF */, Tokens[0 /* T_EOF */], this.position()));
        return tokens;
    };
    Lexer.prototype.lexPunctuation = function (position) {
        var type, next;
        var ch = this.current();
        switch (ch) {
            case '=':
                type = 21 /* T_ASSIGN */;
                if (this.look() === '=') {
                    type = 26 /* T_EQ */;
                    this.next();
                    if (this.look() === '=') {
                        type = 27 /* T_STRICT_EQ */;
                        this.next();
                    }
                }
                break;
            case '!':
                type = 16 /* T_NOT */;
                if (this.look() === '=') {
                    type = 17 /* T_NEQ */;
                    this.next();
                    if (this.look() === '=') {
                        type = 18 /* T_STRICT_NEQ */;
                        this.next();
                    }
                }
                break;
            case '<':
                type = 24 /* T_LT */;
                next = this.look();
                if (next === '=') {
                    type = 25 /* T_LE */;
                    this.next();
                }
                else if (next === '<') {
                    type = 12 /* T_SHL */;
                    this.next();
                }
                break;
            case '>':
                type = 22 /* T_GT */;
                next = this.look();
                if (next === '=') {
                    type = 23 /* T_GE */;
                    this.next();
                }
                else if (next === '>') {
                    type = 13 /* T_SHR */;
                    this.next();
                }
                break;
            case '&':
                type = 9 /* T_AMP */;
                next = this.look();
                if (next === '&') {
                    type = 19 /* T_AND */;
                    this.next();
                }
                break;
            case '+':
                type = 4 /* T_ADD */;
                next = this.look();
                if (next === '+') {
                    type = 14 /* T_INC */;
                    this.next();
                }
                break;
            case '-':
                type = 5 /* T_SUB */;
                next = this.look();
                if (next === '-') {
                    type = 15 /* T_DEC */;
                    this.next();
                }
                break;
            case '*':
                type = 6 /* T_MUL */;
                break;
            case '/':
                type = 7 /* T_DIV */;
                break;
            case '%':
                type = 8 /* T_MOD */;
                break;
            case '|':
                type = 10 /* T_PIPE */;
                break;
            case '^':
                type = 11 /* T_XOR */;
                break;
            case '(':
                type = 28 /* T_LPAREN */;
                break;
            case '[':
                type = 29 /* T_LBRACKET */;
                break;
            case '{':
                type = 30 /* T_LBRACE */;
                break;
            case ')':
                type = 31 /* T_RPAREN */;
                break;
            case ']':
                type = 32 /* T_RBRACKET */;
                break;
            case '}':
                type = 33 /* T_RBRACE */;
                break;
            case ',':
                type = 34 /* T_COMMA */;
                break;
            case ':':
                type = 35 /* T_COLON */;
                break;
            case ';':
                type = 36 /* T_SEMICOLON */;
                break;
            case '.':
                type = 37 /* T_DOT */;
                break;
            case '?':
                type = 38 /* T_QUESTION */;
                break;
            default:
                throw new SyntaxError("Unrecognized punctuation ".concat(ch), position);
        }
        this.next();
        return new Token(type, Tokens[type], position);
    };
    Lexer.prototype.readNumber = function () {
        var isFloat = false;
        return this.readIf(function (ch) {
            if (ch === ".") {
                if (isFloat) {
                    return false;
                }
                isFloat = true;
                return true;
            }
            return Utils.isDigit(ch);
        });
    };
    Lexer.prototype.readString = function (beginChar) {
        this.next(); // skip first ' or "
        var buffer = this.readIf(function (ch) {
            return ch !== beginChar;
        });
        this.next(); // skip last ' or "
        return buffer;
    };
    Lexer.prototype.readIdentifier = function () {
        return this.readIf(function (ch) {
            return Utils.isIdentifier(ch);
        });
    };
    Lexer.prototype.readIf = function (predicate) {
        var buffer = [];
        while (!this.eof()) {
            var ch = this.next();
            if (predicate(ch)) {
                buffer.push(ch);
                continue;
            }
            this.offset--; // back one if the next is not matched.
            this.column--;
            break;
        }
        return buffer.join('');
    };
    Lexer.prototype.next = function () {
        var ch = this.source.charAt(this.offset++);
        if (ch === "\n") {
            this.line++;
            this.column = 0;
        }
        else {
            this.column++;
        }
        return ch;
    };
    Lexer.prototype.look = function () {
        return this.source.charAt(this.offset + 1);
    };
    Lexer.prototype.current = function () {
        return this.source.charAt(this.offset);
    };
    Lexer.prototype.eof = function () {
        return this.current() === '';
    };
    Lexer.prototype.position = function () {
        return new Position(this.offset, this.line, this.column);
    };
    return Lexer;
}());

// root node.
var Root = /** @class */ (function () {
    function Root(position) {
        this.type = 'Node';
        this.position = position;
    }
    Root.prototype.evaluate = function (runtime) {
        // ignore in root node.
    };
    return Root;
}());
// all statement
var Stmt = /** @class */ (function (_super) {
    __extends(Stmt, _super);
    function Stmt() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Stmt;
}(Root));
// all expression
var Expr = /** @class */ (function (_super) {
    __extends(Expr, _super);
    function Expr() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Expr;
}(Root));
var Identifier = /** @class */ (function (_super) {
    __extends(Identifier, _super);
    function Identifier(value, position) {
        var _this = _super.call(this, position) || this;
        _this.type = 'Identifier';
        _this.value = value;
        return _this;
    }
    Identifier.prototype.evaluate = function (runtime) {
        return this.value;
    };
    return Identifier;
}(Root));

var AssignStatement = /** @class */ (function (_super) {
    __extends(AssignStatement, _super);
    function AssignStatement(variable, value, position) {
        var _this = _super.call(this, position) || this;
        _this.type = 'AssignStatement';
        _this.variable = variable;
        _this.value = value;
        return _this;
    }
    AssignStatement.prototype.evaluate = function (runtime) {
        // change runtime runtime.
        runtime.setReference(this.variable.evaluate(runtime), this.value.evaluate(runtime));
    };
    return AssignStatement;
}(Stmt));

var BlockStatement = /** @class */ (function (_super) {
    __extends(BlockStatement, _super);
    function BlockStatement(stmts, position) {
        var _this = _super.call(this, position) || this;
        _this.type = 'BlockStatement';
        _this.stmts = stmts;
        return _this;
    }
    BlockStatement.prototype.evaluate = function (runtime) {
        var evaluated; //return last statement.
        this.stmts.forEach(function (stmt) {
            evaluated = stmt.evaluate(runtime);
        });
        return evaluated;
    };
    return BlockStatement;
}(Stmt));

var ExpressionStatement = /** @class */ (function (_super) {
    __extends(ExpressionStatement, _super);
    function ExpressionStatement(expr, position) {
        var _this = _super.call(this, position) || this;
        _this.type = 'ExpressionStatement';
        _this.expr = expr;
        return _this;
    }
    ExpressionStatement.prototype.evaluate = function (runtime) {
        return this.expr.evaluate(runtime);
    };
    return ExpressionStatement;
}(Stmt));

var ArrayExpression = /** @class */ (function (_super) {
    __extends(ArrayExpression, _super);
    function ArrayExpression(elements, position) {
        var _this = _super.call(this, position) || this;
        _this.type = 'ArrayExpression';
        _this.elements = elements || [];
        return _this;
    }
    ArrayExpression.prototype.addElement = function (element) {
        this.elements.push(element);
    };
    ArrayExpression.prototype.isEmpty = function () {
        return this.elements.length === 0;
    };
    ArrayExpression.prototype.evaluate = function (runtime) {
        return this.elements.map(function (element) { return element.evaluate(runtime); });
    };
    return ArrayExpression;
}(Expr));

var BinaryExpression = /** @class */ (function (_super) {
    __extends(BinaryExpression, _super);
    function BinaryExpression(left, operator, right, position) {
        var _this = _super.call(this, position) || this;
        _this.type = 'BinaryExpression';
        _this.left = left;
        _this.operator = operator;
        _this.right = right;
        return _this;
    }
    BinaryExpression.prototype.evaluate = function (runtime) {
        var left = this.left.evaluate(runtime);
        var right = this.right.evaluate(runtime);
        var result;
        switch (this.operator) {
            case '||':
            case 'or':
                result = left || right;
                break;
            case '&&':
            case 'and':
                result = left && right;
                break;
            case '|':
                result = left | right;
                break;
            case '^':
                result = left ^ right;
                break;
            case '&':
                result = left & right;
                break;
            case '==':
                result = left == right;
                break;
            case '===':
            case 'is':
                result = left === right;
                break;
            case '!=':
                result = left != right;
                break;
            case '!==':
                result = left !== right;
                break;
            case '<':
                result = left < right;
                break;
            case '>':
                result = left > right;
                break;
            case '>=':
                result = left >= right;
                break;
            case '<=':
                result = left <= right;
                break;
            case 'not in':
                result = right.indexOf(left) === -1;
                break;
            case 'in':
                result = right.indexOf(left) > -1;
                break;
            case '+':
                result = left + right;
                break;
            case '-':
                result = left - right;
                break;
            case '~':
                result = '' + left + right;
                break;
            case '*':
                result = left * right;
                break;
            case '/':
                if (0 == right) {
                    throw new RuntimeError('Division by zero.', this.right.position);
                }
                result = left / right;
                break;
            case '%':
                if (0 == right) {
                    throw new RuntimeError('Modulo by zero.', this.right.position);
                }
                result = left % right;
                break;
        }
        return result;
    };
    return BinaryExpression;
}(Expr));

var CallExpression = /** @class */ (function (_super) {
    __extends(CallExpression, _super);
    function CallExpression(callee, args, position) {
        var _this = _super.call(this, position) || this;
        _this.type = "CallExpression";
        _this.callee = callee;
        _this.args = args;
        return _this;
    }
    CallExpression.prototype.evaluate = function (runtime) {
        var callee = this.callee.evaluate(runtime);
        var args = this.args.map(function (arg) { return arg.evaluate(runtime); });
        return callee.apply(void 0, args);
    };
    return CallExpression;
}(Expr));

var LiteralExpression = /** @class */ (function (_super) {
    __extends(LiteralExpression, _super);
    function LiteralExpression(value, raw, position) {
        var _this = _super.call(this, position) || this;
        _this.type = 'LiteralExpression';
        _this.value = value;
        _this.raw = raw;
        return _this;
    }
    LiteralExpression.prototype.evaluate = function (runtime) {
        return this.value;
    };
    return LiteralExpression;
}(Expr));

var MapExpression = /** @class */ (function (_super) {
    __extends(MapExpression, _super);
    function MapExpression(entries, position) {
        var _this = _super.call(this, position) || this;
        _this.type = 'MapExpression';
        _this.entries = entries || [];
        return _this;
    }
    MapExpression.prototype.addElement = function (key, value) {
        this.entries.push({
            key: key,
            value: value
        });
    };
    MapExpression.prototype.isEmpty = function () {
        return this.entries.length === 0;
    };
    MapExpression.prototype.evaluate = function (runtime) {
        var result = {};
        this.entries.forEach(function (entry) {
            result[entry.key.evaluate(runtime)] = entry.value.evaluate(runtime);
        });
        return result;
    };
    return MapExpression;
}(Expr));

var MemberExpression = /** @class */ (function (_super) {
    __extends(MemberExpression, _super);
    function MemberExpression(object, property, computed, position) {
        var _this = _super.call(this, position) || this;
        _this.type = "MemberExpression";
        _this.object = object;
        _this.property = property;
        _this.computed = computed;
        return _this;
    }
    MemberExpression.prototype.evaluate = function (runtime) {
        var object = this.object.evaluate(runtime);
        var property = this.property.evaluate(runtime);
        return object[property];
    };
    MemberExpression.prototype.changeRuntime = function (runtime, value) {
        var object = this.object.evaluate(runtime);
        var property = this.property.evaluate(runtime);
        if (typeof object[property] !== 'undefined' && typeof object[property] !== 'function') {
            object[property] = value;
        }
        else {
            throw new RuntimeError('Cannot change reference.');
        }
    };
    return MemberExpression;
}(Expr));

var UnaryExpression = /** @class */ (function (_super) {
    __extends(UnaryExpression, _super);
    function UnaryExpression(operator, argument, position) {
        var _this = _super.call(this, position) || this;
        _this.type = 'UnaryExpression';
        _this.operator = operator;
        _this.argument = argument;
        return _this;
    }
    UnaryExpression.prototype.evaluate = function (runtime) {
        var result;
        switch (this.operator) {
            case '!':
            case 'not':
                result = !Boolean(this.argument.evaluate(runtime));
                break;
            case '+':
                result = this.argument.evaluate(runtime);
                break;
            case '-':
                result = -Number(this.argument.evaluate(runtime));
                break;
            default:
                throw new RuntimeError("Unrecognized operator ".concat(this.operator));
        }
        return result;
    };
    return UnaryExpression;
}(Expr));

var UpdateExpression = /** @class */ (function (_super) {
    __extends(UpdateExpression, _super);
    function UpdateExpression(operator, argument, prefix, position) {
        var _this = _super.call(this, position) || this;
        _this.type = 'UpdateExpression';
        _this.operator = operator;
        _this.argument = argument;
        _this.prefix = prefix;
        return _this;
    }
    UpdateExpression.prototype.evaluate = function (runtime) {
        // force convert to number; not assert
        var argument = Number(this.argument.evaluate(runtime));
        var result;
        var changed;
        switch (this.operator) {
            case '++':
                changed = argument + 1;
                result = this.prefix ? changed : argument;
                break;
            case '--':
                changed = argument - 1;
                result = this.prefix ? changed : argument;
                break;
            default:
                throw new RuntimeError("Unrecognized operator ".concat(this.operator));
        }
        this.argument.changeRuntime(runtime, changed);
        return result;
    };
    return UpdateExpression;
}(Expr));

var VariableExpression = /** @class */ (function (_super) {
    __extends(VariableExpression, _super);
    function VariableExpression(value, position) {
        var _this = _super.call(this, position) || this;
        _this.type = 'VariableExpression';
        _this.value = value;
        return _this;
    }
    VariableExpression.prototype.evaluate = function (runtime) {
        if (!runtime.hasReference(this.value)) {
            throw new RuntimeError("Undefined Reference, ".concat(this.value, " is not defined"), this.position);
        }
        return runtime.getReference(this.value);
    };
    VariableExpression.prototype.changeRuntime = function (runtime, value) {
        runtime.setReference(this.value, value);
    };
    return VariableExpression;
}(Expr));

var Parser = /** @class */ (function () {
    function Parser(tokens) {
        this.tokens = tokens;
    }
    Parser.prototype.parse = function () {
        var token = this.tokens.current();
        var stmts = [];
        while (!this.tokens.eof()) {
            stmts.push(this.parseStatement());
        }
        return new BlockStatement(stmts, token.position);
    };
    Parser.prototype.parseStatement = function () {
        var token = this.tokens.current();
        var stmt;
        if (token.test(3 /* T_ID */) && this.tokens.look().test(21 /* T_ASSIGN */)) {
            stmt = this.parseAssignStatement();
        }
        else if (token.test(30 /* T_LBRACE */) && !this.tokens.look().test(33 /* T_RBRACE */) && !this.tokens.look(2).test(35 /* T_COLON */)) {
            stmt = this.parseBlockStatement();
        }
        else {
            stmt = new ExpressionStatement(this.parseExpression(), token.position);
        }
        if (!this.tokens.current().test(0 /* T_EOF */)) {
            this.tokens.expect(36 /* T_SEMICOLON */);
        }
        return stmt;
    };
    Parser.prototype.parseAssignStatement = function () {
        var token = this.tokens.current();
        var variable = new Identifier(token.value, token.position);
        this.tokens.next();
        this.tokens.expect(21 /* T_ASSIGN */);
        return new AssignStatement(variable, this.parseExpression(), token.position);
    };
    Parser.prototype.parseBlockStatement = function () {
        this.tokens.expect(30 /* T_LBRACE */, 'A block must begin with an opening braces');
        var token = this.tokens.current();
        var stmts = [];
        while (!this.tokens.current().test(33 /* T_RBRACE */)) {
            stmts.push(this.parseStatement());
        }
        this.tokens.expect(33 /* T_RBRACE */, 'A block must be closed by a braces');
        return new BlockStatement(stmts, token.position);
    };
    Parser.prototype.parseExpression = function () {
        var expr = this.parsePrimaryExpression();
        if (this.tokens.current().isBinaryOperator()) {
            expr = this.parseBinaryExpression(expr);
        }
        return expr;
    };
    Parser.prototype.parsePrimaryExpression = function () {
        var token = this.tokens.current();
        var expr;
        switch (token.type) {
            // constant
            case 1 /* T_STR */:
                expr = new LiteralExpression(token.value, token.value, token.position);
                this.tokens.next();
                break;
            case 2 /* T_NUM */:
                expr = new LiteralExpression(Number(token.value), token.value, token.position);
                this.tokens.next();
                break;
            // identifier
            case 3 /* T_ID */:
                expr = this.parseIdentifierExpression();
                break;
            // punctuation
            case 29 /* T_LBRACKET */:
                expr = this.parseArrayExpression();
                break;
            case 30 /* T_LBRACE */:
                expr = this.parseMapExpression();
                break;
            case 28 /* T_LPAREN */:
                expr = this.parseParenExpression();
                break;
            // unary operator
            case 14 /* T_INC */:
            case 15 /* T_DEC */:
                expr = this.parseUpdateExpression(true);
                break;
            case 16 /* T_NOT */:
            case 40 /* T_KW_NOT */:
            case 4 /* T_ADD */:
            case 5 /* T_SUB */:
                expr = this.parseUnaryExpression();
                break;
            default:
                throw new SyntaxError("Unexpected token \"".concat(token.type, "\" of value \"").concat(token.value, "\"."));
        }
        return this.parsePosixExpression(expr);
    };
    Parser.prototype.parsePosixExpression = function (expr) {
        while (true) {
            var token = this.tokens.current();
            var end = false;
            switch (token.type) {
                case 28 /* T_LPAREN */:
                    expr = new CallExpression(expr, this.parseArguments(), token.position);
                    break;
                case 37 /* T_DOT */:
                    expr = this.parseObjectExpression(expr);
                    break;
                case 29 /* T_LBRACKET */: // array[1] , map['property']
                    expr = this.parseAccessExpression(expr);
                    break;
                default:
                    if (this.tokens.current().testAny(14 /* T_INC */, 15 /* T_DEC */)) { // unary operator
                        expr = this.parseUpdateExpression(false, expr);
                    }
                    else {
                        end = true;
                    }
            }
            if (end) {
                break;
            }
        }
        return expr;
    };
    Parser.prototype.parseIdentifierExpression = function () {
        var token = this.tokens.current();
        var expr;
        switch (token.value) {
            case 'true':
            case 'TRUE':
                expr = new LiteralExpression(true, token.value, token.position);
                break;
            case 'false':
            case 'FALSE':
                expr = new LiteralExpression(false, token.value, token.position);
                break;
            case 'null':
            case 'NULL':
                expr = new LiteralExpression(null, token.value, token.position);
                break;
            default:
                expr = new VariableExpression(token.value, token.position);
        }
        this.tokens.next();
        return expr;
    };
    Parser.prototype.parseObjectExpression = function (object) {
        this.tokens.expect(37 /* T_DOT */);
        var token = this.tokens.expect(3 /* T_ID */);
        var property = new Identifier(token.value, token.position);
        var expr = new MemberExpression(object, property, false, object.position);
        if (this.tokens.current().test(28 /* T_LPAREN */)) { // method
            expr = new CallExpression(expr, this.parseArguments(), object.position);
        }
        return expr;
    };
    Parser.prototype.parseAccessExpression = function (object) {
        this.tokens.expect(29 /* T_LBRACKET */);
        var property = this.parseExpression();
        this.tokens.expect(32 /* T_RBRACKET */);
        return new MemberExpression(object, property, false, object.position);
    };
    Parser.prototype.parseBinaryExpression = function (expr) {
        // a + b * c / d
        // a * b + c
        while (this.tokens.current().isBinaryOperator()) {
            expr = this.doParseBinary(expr, -1);
        }
        return expr;
    };
    Parser.prototype.doParseBinary = function (left, prevPrecedence) {
        while (this.tokens.current().isBinaryOperator()) {
            var token = this.tokens.current();
            var operator = token.value;
            var currentPrecedence = token.getBinaryPrecedence().precedence;
            // if the current less than prev, don't consume token.
            if (currentPrecedence < prevPrecedence) {
                break;
            }
            // right expr.
            this.tokens.next();
            var right = this.parsePrimaryExpression();
            var nextPrecedence = this.tokens.current().getBinaryPrecedence().precedence;
            if (currentPrecedence < nextPrecedence) {
                right = this.doParseBinary(right, currentPrecedence);
            }
            prevPrecedence = currentPrecedence;
            left = new BinaryExpression(left, operator, right, left.position);
        }
        return left;
    };
    Parser.prototype.parseUnaryExpression = function () {
        // !+-+-+-!!+-10
        var token = this.tokens.current();
        var operator = token.value;
        this.tokens.next();
        var argument = this.parsePrimaryExpression();
        return new UnaryExpression(operator, argument, token.position);
    };
    Parser.prototype.parseUpdateExpression = function (prefix, argument) {
        var token = this.tokens.expectOneOf(14 /* T_INC */, 15 /* T_DEC */);
        if (prefix) { // ++a ++a.b ++a.read()
            // ++ a + 1
            // a + b --
            argument = this.parsePrimaryExpression();
        }
        if (!(argument instanceof VariableExpression) && !(argument instanceof MemberExpression)) {
            throw new SyntaxError('Invalid left-hand side in assignment');
        }
        return new UpdateExpression(token.value, argument, prefix, prefix ? token.position : argument.position);
    };
    Parser.prototype.parseParenExpression = function () {
        this.tokens.expect(28 /* T_LPAREN */);
        var expr = this.parseExpression();
        this.tokens.expect(31 /* T_RPAREN */);
        return expr;
    };
    Parser.prototype.parseArrayExpression = function () {
        var token = this.tokens.current();
        var expr = new ArrayExpression([], token.position);
        this.tokens.expect(29 /* T_LBRACKET */, 'An array must begin with an opening brackets');
        while (!this.tokens.current().test(32 /* T_RBRACKET */)) {
            if (!expr.isEmpty()) {
                this.tokens.expect(34 /* T_COMMA */, 'An array element must be followed by a comma');
            }
            expr.addElement(this.parseExpression());
        }
        this.tokens.expect(32 /* T_RBRACKET */, 'An array must be closed by a brackets');
        return expr;
    };
    Parser.prototype.parseMapExpression = function () {
        var token = this.tokens.current();
        this.tokens.expect(30 /* T_LBRACE */, 'A map must begin with an opening braces');
        var expr = new MapExpression([], token.position);
        while (!this.tokens.current().test(33 /* T_RBRACE */)) {
            if (!expr.isEmpty()) {
                this.tokens.expect(34 /* T_COMMA */, 'A map must be followed by a comma');
            }
            var key = this.tokens.expect(1 /* T_STR */, 'A map key must be a string');
            this.tokens.expect(35 /* T_COLON */, 'The map key and value must be separated by a colon(:)');
            var value = this.parseExpression();
            expr.addElement(new LiteralExpression(key.value, key.value, key.position), value);
        }
        this.tokens.expect(33 /* T_RBRACE */, 'A map must be closed by a braces');
        return expr;
    };
    Parser.prototype.parseArguments = function () {
        // the_foo_func(1, "foo")
        var args = [];
        this.tokens.expect(28 /* T_LPAREN */, 'A list of arguments must begin with an opening parenthesis');
        while (!this.tokens.current().test(31 /* T_RPAREN */)) {
            if (args.length > 0) { // the prev arguments is exists.
                this.tokens.expect(34 /* T_COMMA */, 'Arguments must be separated by a comma');
            }
            args.push(this.parseExpression());
        }
        this.tokens.expect(31 /* T_RPAREN */, 'A list of arguments must be closed by a parenthesis');
        return args;
    };
    return Parser;
}());

var GenericRuntime = /** @class */ (function () {
    function GenericRuntime(context) {
        this.context = new Map;
        for (var key in context) {
            this.context.set(key, context[key]);
        }
    }
    GenericRuntime.prototype.hasReference = function (property) {
        return this.context.has(property);
    };
    GenericRuntime.prototype.getReference = function (property) {
        return this.context.get(property);
    };
    GenericRuntime.prototype.setReference = function (property, value) {
        this.context.set(property, value);
    };
    return GenericRuntime;
}());

var Evaluator = /** @class */ (function () {
    function Evaluator() {
    }
    // Evaluate the expression and return output of the last expr.
    Evaluator.prototype.evaluate = function (source, context) {
        var node = Evaluator.createParser(source).parse();
        return node.evaluate(Evaluator.createRuntime(context || {}));
    };
    // parse the ast of the source.
    Evaluator.prototype.parse = function (source) {
        return Evaluator.createParser(source).parse();
    };
    // tokenize source code.
    Evaluator.prototype.lex = function (source) {
        return Evaluator.createLexer(source).lex();
    };
    Evaluator.createRuntime = function (context) {
        if (typeof context.hasReference === 'function') {
            return context;
        }
        return new GenericRuntime(context);
    };
    Evaluator.createParser = function (source) {
        return new Parser(Evaluator.createLexer(source).lex());
    };
    Evaluator.createLexer = function (source) {
        return new Lexer(source);
    };
    return Evaluator;
}());

export { Evaluator, GenericRuntime, Lexer, Parser };
