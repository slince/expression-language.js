# Expression.js

[![Build Status](https://img.shields.io/github/workflow/status/slince/expression.js/ci?style=flat-square)](https://github.com/slince/expression.js/actions)
[![Coverage Status](https://img.shields.io/codecov/c/github/slince/expression.js/master?style=flat-square)](https://codecov.io/github/slince/expression.js)
[![NPM version](https://img.shields.io/npm/v/expression.js.svg?style=flat-square)](https://www.npmjs.com/package/expression.js)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/slince/expression.js/blob/master/LICENSE)

Expression.js is an engine for javascript that can compile and evaluate expressions written in typescript.

# Installation

Install via `npm`.

```bash
npm install expression.js --save
```

or `yarn`.

```bash
yarn add expression.js
```

# Getting Started

Example:

```javascript

import {Evaluator} from "expression.js";

const evaluator = new Evaluator();

// assume your have the following expr.
const expr = "user.ip in allowedIps and user.role is 'admin'";

const context = {
    user: {
        ip: "127.0.0.1",
        role: "admin"
    },
    allowedIps: ["127.0.0.1", "... other ip"]
};

if (evaluator.evaluate(expr, context)) {
    // yes. you're allowed.
    doSomething();
}

```

Supported binary & unary.

Binary

|  Operator |  Sample  |  
| --- | --- |
| `or` | alias of `||`  |
| `||` | `a || b` |
| `and` | alias of `&&`  |
| `&&` | `a && b` |
| `|` | `a | b` |
| `^` | `a ^ b` |
| `&` | `a & b` |
| `==` | `a == b` |
| `===` | `a === b` |
| `is` | alias of `===` |
| `!=` | `a != b` |
| `!==` | `a !== b` |
| `<` | `a < b` |
| `>` | `a > b` |
| `>=` | `a >= b` |
| `<=` | `a <= b` |
| `in` | `10 in [8,10,12]` |
| `<<` | `a << b` |
| `>>` | `a >> b` |
| `+` | `a + b` |
| `-` | `a - b` |
| `~` | `a ~ b` |
| `*` | `a * b` |
| `/` | `a / b` |
| `%` | `a % b` |

Unary

| Operator | Sample|
| --- | --- |
| `+` |  `+10` |
| `-` | `-10` |
| `!` | `!a` |
| `not` | alias of `!` |
| `++` | `++ a` or `a ++`|
| `--` | `-- a` or `a --`|

Function call.

```javascript

evaluator.evaluate('say("hello", "world")', {
    say: function (left, right) {
        return left + ' ' + right;
    }
});

// will output "hello world".
```
Method also supported.

```javascript
evaluator.evaluate('people.say("hello", "world")', {
    people: {
        say: function (left, right) {
            return left + ' ' + right;
        }
    }
});
```

You can write multi expressions, separated by SEMICOLON(;); However, evaluator will only return the value of the last expr.


```javascript
evaluator.evaluate('12; "abc"'); //will ouput "abc"
```

Assign statement is also supported.

```javascript
evaluator.evaluate('a = 10; a + 2'); //will ouput 12
```

## LICENSE

The MIT license. See [MIT](https://opensource.org/licenses/MIT)

