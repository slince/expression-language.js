# Expression.js

[![Build Status](https://github.com/slince/expression.js/workflows/ci/badge.svg)](https://github.com/slince/expression.js/actions)
[![NPM version](https://img.shields.io/npm/v/expression.js.svg)](https://www.npmjs.com/package/expression.js)

Expression.js is an engine for javascript that can compile and evaluate expressions written in typescript.

# Installation

Install via `npm`.

```bash
npm install expression.js --save
```

or `yarn`.

```bash
yarn addd expression.js
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




