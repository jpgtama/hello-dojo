function Calculator(exprStr) {
    this.tokens = new Tokens(Lexer(exprStr));

    console.table(this.tokens.tokenArray);

    this.exp = getExp(this.tokens);

    console.log(this.exp);

    this.run = function(ctx) {
        var result = this.exp.interpret(ctx);
        console.log('result: ', result);
        return result;
    }

    var leftTokens = this.tokens.left();
    console.log('left tokens: ', leftTokens);

    if (leftTokens.length > 0) {
        var msg = 'wrong things: ' + leftTokens.map(function(t) {
            return t.value
        }).join(',');
        throw msg;
    }

}

function Result(type, value) {
    this.isN = type === 'number';
    this.isD = type === 'date';
    this.value = value;
}

// 1.Term = <数字> | <变量> | “(”Exp”)”

// 2.Factor = Term ((“*” | “/”) Term)*

// 3.Exp = Factor ((“+” | “-”) Factor)*

function Expression(op, left, right, isNum, isVar, nv) {
    this.op = op;
    this.left = left;
    this.right = right;
    this.isNum = isNum;
    this.isVar = isVar;
    this.nv = nv;

    this.interpret = function(ctx) {
        if (this.isNum) {
            return new Result('number', parseInt(this.nv));
        } else if (this.isVar) {
            if (this.nv in ctx.data) {
                return new Result('date', ctx.data[this.nv]);
            } else {
                throw 'no value for ' + this.nv;
            }
        }

        if (!this.left) {
            throw 'no left operand for ' + this.op;
        }

        if (!this.right) {
            throw 'no right operand for ' + this.op;
        }

        var left = this.left.interpret(ctx);
        var right = this.right.interpret(ctx);

        var interpretValue = null;

        if (this.op === '+') {
            // Date + Date is invalid
            if (left.isD && right.isD) {
                throw 'Can\'t add two dates: ' + this.left.nv + ' + ' + this.right.nv;
            }

            if (left.isD && right.isN) {
                var date = moment(left.value);
                date.add(right.value, ctx.unit);
                return new Result('date', date.valueOf());
            }

            if (left.isN && right.isD) {
                var date = moment(right.value);
                date.add(left.value, ctx.unit);
                return new Result('date', date.valueOf());
            }

            if (left.isN && right.isN) {
                return new Result('number', left.value + right.value);
            }
        } else if (this.op === '-') {
            // Number - Data is invalid
            if (left.isN && right.isD) {
                throw 'Can\'t sub a number with a date' + ', ' + left.value + ' - ' + right.value;
            }

            if (left.isD && right.isD) {
                var d1 = moment(left.value);
                var d2 = moment(right.value);
                return new Result('number', d1.diff(d2, ctx.unit));
            }

            if (left.isD && right.isN) {
                var date = moment(left.value);
                date.subtract(right.value, ctx.unit);
                return new Result('date', date.valueOf());
            }

            if (left.isN && right.isN) {
                return new Result('number', left.value - right.value);
            }
        } else if (this.op === '*') {
            // only number * number is valid
            if (left.isN && right.isN) {
                return new Result('number', left.value * right.value);
            } else {
                throw 'only number * number is valid';
            }

        } else if (this.op === '/') {
            if (right.value === 0) {
                throw 'divided by 0 error';
            }

            // only number / number is valid
            if (left.isN && right.isN) {
                return new Result('number', left.value / right.value);
            } else {
                throw 'only number / number is valid';
            }
        }
    };

    this.getLisp = function() {
        if (this.isNum) {
            return parseInt(this.nv);
        } else if (this.isVar) {
            return this.nv;
        }

        if (!this.left) {
            throw 'no left operand for ' + this.op;
        }

        if (!this.right) {
            throw 'no right operand for ' + this.op;
        }

        return '(' + this.op + ' ' + this.left.getLisp() + ' ' + this.right.getLisp() + ')';
    }

}

function getNumber(/* Tokens */tokens) {
    var t = tokens.current();

    if (t && t.isN) {
        var num = t.value;
        tokens.forward();
        return new Expression(null, null, null, true, null, num);
    }
}

function getVar(/* Tokens */tokens) {
    var t = tokens.current();

    if (t && t.isV) {
        var num = t.value;
        tokens.forward();
        return new Expression(null, null, null, null, true, num);
    }
}

function getTerm(/* Tokens */tokens) {
    // Term = <数字> | <变量> | “(”Exp”)”
    var term = getNumber(tokens);

    if (term) {
        return term;
    }

    term = getVar(tokens);

    if (term) {
        return term;
    }

    var token = tokens.current();

    if (token && token.isLB) {
        tokens.forward();
        var exp = getExp(tokens);

        token = tokens.current();
        if (token.isRB) {
            tokens.forward();
            return exp;
        } else {
            throw 'need RB here.';
        }
    }
}

function getFactor(tokens) {
    // Factor = Term ((“*” | “/”) Term)*

    var factor = getTerm(tokens);

    while (tokens.hasNext()) {
        var op = null;

        var token = tokens.current();

        if (token.isS && token.value === '*') {
            op = '*';
        } else if (token.isS && token.value === '/') {
            op = '/';
        } else {
            break;
        }

        if (op) {
            tokens.forward();
            var term = getTerm(tokens);
            if (term) {
                factor = new Expression(op, factor, term);
            } else {
                throw 'need two operands for ' + op;
            }
        }
    }

    return factor;
}

function getExp(tokens) {
    // Exp = Factor ((“+” | “-”) Factor)*

    var exp = getFactor(tokens);

    while (tokens.hasNext()) {
        var op = null;

        var token = tokens.current();

        if (token.isS && token.value === '+') {
            op = '+';
        } else if (token.isS && token.value === '-') {
            op = '-';
        } else {
            break;
        }

        if (op) {
            tokens.forward();
            var factor = getFactor(tokens);
            if (factor) {
                exp = new Expression(op, exp, factor);
            } else {
                throw 'need two operands for ' + op;
            }
        }
    }

    return exp;

}

function Tokens(tokenArray) {
    this.tokenArray = tokenArray;

    this.index = 0;

    this.next = function() {
        return this.tokenArray[this.index++];
    };

    this.hasNext = function() {
        return this.index < this.tokenArray.length;
    };

    this.current = function() {
        return this.tokenArray[this.index];
    }

    this.forward = function() {
        this.index++;
        return this;
    }

    this.back = function() {
        this.index--;
        return this;
    }

    this.left = function() {
        var tmp = [];
        var index = this.index;
        if (index < this.tokenArray.length) {
            tmp.push(this.tokenArray[index++]);
        }

        return tmp;
    }
}

function Token(type, value) {
    // S for Symbol '+', '-', V for variables, N for number, B for ()
    this.type = type;
    this.value = value;

    if (this.type === 'S') {
        this.isS = true;
    } else if (this.type === 'V') {
        this.isV = true;
    } else if (this.type === 'N') {
        this.isN = true;
    } else if (this.type === 'B' && this.value === '(') {
        this.isB = this.isLB = true;
    } else if (this.type === 'B' && this.value === ')') {
        this.isB = this.isRB = true;
    }
}

function Lexer(str) {

    var input = new Input(str);

    var tokens = [];

    // parse
    var t = null;
    while (input.index < input.str.length) {
        if ((t = Symbol(input)) || (t = Variable(input)) || (t = Num(input)) || (t = Brackets(input))) {
            tokens.push(t);
        } else if ((t = Space(input))) {
            // ignore space
        } else {
            throw 'Invalid token at: ' + input.index;
        }
    }

    return tokens;
}

function Input(str) {
    this.index = 0;
    this.str = str;
}

function Space(/* Input */input) {
    var c = input.str.charAt(input.index);
    if (c === ' ') {
        input.index++;
        return c;
    }
}

function Brackets(/* Input */input) {
    var c = input.str.charAt(input.index);
    if ('()'.indexOf(c) !== -1) {
        input.index++;
        return new Token('B', c);
    }
}

function Symbol(/* Input */input) {
    var c = input.str.charAt(input.index);
    if ('+-*/'.indexOf(c) !== -1) {
        input.index++;
        return new Token('S', c);
    }
}

function Variable(/* Input */input) {
    // 
    var index = input.index;

    var state = 0;
    while (index < input.str.length) {
        var c = input.str.charAt(index);

        if (state === 0 && /[a-zA-Z]/.test(c)) {
            state = 1;
        } else if (state === 1 && /[a-zA-Z0-9]/.test(c)) {
            state = 1;
        } else {
            break;
        }

        index++;
    }

    // check state
    if (state === 0) {
        return null;
    } else if (state !== 0 || index === input.str.length) {
        // success
        var t = input.str.substring(input.index, index);
        input.index = index;
        return new Token('V', t);
    }
}

function Num(/* Input */input) {
    // 
    var index = input.index;

    var state = 0;
    while (index < input.str.length) {
        var c = input.str.charAt(index);

        if (state === 0 && /[0-9]/.test(c)) {
            state = 1;
        } else if (state === 1 && /[0-9]/.test(c)) {
            state = 1;
        } else {
            break;
        }

        index++;
    }

    // check state
    if (state === 0) {
        return null;
    } else if (state !== 0 || index === input.str.length) {
        // success
        var t = input.str.substring(input.index, index);
        input.index = index;
        return new Token('N', t);
    }
}
