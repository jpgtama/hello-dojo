/**
 * Created by evan on 9/20/16.
 */

var functionMap = {

    dateSub: function (d1, d2, unit, decimals) {
        d1 = moment(d1);
        d2 = moment(d2);
        return d1.diff(d2, unit);
    },

    max: function (a, b) {
        return Math.max(a, b);
    },

    abs: function (a) {
        return Math.abs(a);
    },

    sqrt: function(a){
        return Math.sqrt(a);
    }

};

////////////////////////////////////////////////////////////////////////////////////////////////
// syntax:
// term = <string> | <number> | <id> | '(' valueExp ')' | function
//
// function = <id> ( '()' | ( '(' paramlist ')' ) )
//
// paramlist = valueExp (',' valueExp )*
//
// factor = term (('*' | '/') term)*
//
// valueExp = factor (('+' | '-') factor)*
//
// assignExp = <id> '=' valueExp
//
// exp = valueExp | assignExp
//
// expList = exp*
//

function Result(type, value) {
    this.isN = type === 'number';
    this.isD = type === 'date';
    this.value = value;
}


function ConstantExp(type, value) {
    // type: number, string
    this.type = type;
    this.value = value;

    this.interpret = function (ctx) {
        if (this.type === 'number') {
            return this.value
        } else if (this.type === 'string') {
            return this.value;
        } else {
            throw 'no other type for constant now';
        }
    }
}

function IdExp(value) {
    this.value = value;

    this.interpret = function (ctx) {

        if (ctx.data) {
            if (this.value in ctx.data) {
                return ctx.data[this.value];
            } else {
                throw 'no value for ' + this.value;
            }
        } else {
            throw 'context.data is needed';
        }

    }
}

function ArithmeticExp(op, left, right) {
    this.op = op;
    this.left = left;
    this.right = right;

    this.interpret = function (ctx) {

        if (!ctx) {
            throw 'context is needed';
        }

        if (!this.left) {
            throw 'no left operand for ' + this.op;
        }

        if (!this.right) {
            throw 'no right operand for ' + this.op;
        }

        var left = this.left.interpret(ctx);
        var right = this.right.interpret(ctx);

        if (this.op === '+') {
            return left + right;
        } else if (this.op === '-') {
            return left - right;
        } else if (this.op === '*') {
            return left * right;

        } else if (this.op === '/') {
            if (right === 0) {
                throw 'divided by 0 error';
            }

            return left / right;
        }
    };
}

function FunctionExp(name, paramlist) {
    if (!(name in functionMap)) {
        throw 'no function with name: ' + name;
    }

    this.name = name;
    this.paramlist = paramlist;

    this.interpret = function (ctx) {
        var f = functionMap[this.name];

        // get param values
        var pv = [];

        if (this.paramlist) {
            for (var i = 0; i < this.paramlist.length; i++) {
                var pe = this.paramlist[i];
                pv.push(pe.interpret(ctx));
            }
        }

        return f.apply({}, pv);
    }

}

function AssignExp(name, valueExp) {
    this.name = name;
    this.valueExp = valueExp;

    this.interpret = function (ctx) {
        var v = this.valueExp.interpret(ctx);

        // add to ctx data
        if(!('data' in ctx)){
            ctx.data = {};
        }

        ctx.data[name] = v;

        return v;
    }

}

function ExpListExp() {
    this.expList = [];

    this.add = function (exp) {
        this.expList.push(exp);
    };

    this.interpret = function (ctx) {

        var lastValue = null;

        for (var i = 0; i < this.expList.length; i++) {
            var exp = this.expList[i];

            lastValue = exp.interpret(ctx);
        }

        return lastValue;
    }


}


//////////////////////////////////////////////////////////////////////////////////////////////////////
//
// get
//
function getString(/* Tokens */tokens) {
    var t = tokens.current();

    if (t && t.type === 'string') {
        var num = t.value;
        tokens.forward();
        return new ConstantExp('string', num);
    }
}

function getNumber(/* Tokens */tokens) {
    var t = tokens.current();

    if (t && t.type === 'number') {
        var num = t.value;
        tokens.forward();
        return new ConstantExp('number', num);
    }
}

function getId(/* Tokens */tokens) {
    var t = tokens.current();

    if (t && t.type === 'id') {
        var value = t.value;
        tokens.forward();
        return new IdExp(value);
    }
}

function getFunction(/* Tokens */tokens) {
    // function = <id> ( '()' | ( '(' paramlist ')' ) )
    var id = getId(tokens);

    if (id) {

        var lb = tokens.next();

        if (lb && lb.value === '(') {
            var rb = tokens.next();

            if (rb === ')') {
                // no param
                return new FunctionExp(id);
            } else {
                tokens.back();
                var paramlist = getParamList(tokens);

                if (paramlist) {

                    rb = tokens.next();

                    if (rb && rb.value === ')') {
                        return new FunctionExp(id.value, paramlist);
                    } else {
                        throw 'no ")" for function param list: ' + id.value;
                    }

                } else {
                    throw 'no param list after function ' + id.value;
                }

            }

        } else {
            // not function, revert back
            tokens.back(2);
            return null;
        }

    }

}

function getParamList(/* Tokens */tokens) {
    // paramlist = exp (',' exp )*
    var exp = getValueExp(tokens);

    if (exp) {

        var paramlist = [
            exp
        ];

        while (tokens.hasNext()) {

            var cm = tokens.next();

            if (cm.value === ',') {

                var nexp = getValueExp(tokens);

                if (nexp) {
                    paramlist.push(nexp);
                } else {
                    throw 'no exp after ,';
                }

            } else {
                tokens.back();
                break;
            }

        }

        return paramlist;
    }

}

function getTerm(/* Tokens */tokens) {
    // Term = <string> | <数字> | Function | <变量> | “(”Exp”)”

    var term = getString(tokens);

    if (term) {
        return term;
    }

    var term = getNumber(tokens);

    if (term) {
        return term;
    }

    var f = getFunction(tokens);

    if (f) {
        return f;
    }

    term = getId(tokens);

    if (term) {

        var next = tokens.current();

        if( !next ||  '(='.indexOf(next.value)=== -1){
            return term;
        }else{
            tokens.back();
        }
    }

    var token = tokens.current();

    if (token.value === '(') {
        tokens.forward();
        var exp = getValueExp(tokens);

        token = tokens.current();
        if (token.value === ')') {
            tokens.forward();
            return exp;
        } else {
            throw 'need ) here.';
        }
    }
}

function getFactor(tokens) {
    // Factor = Term ((“*” | “/”) Term)*

    var factor = getTerm(tokens);

    while (tokens.hasNext()) {
        var op = null;

        var token = tokens.current();

        if (token.value === '*') {
            op = '*';
        } else if (token.value === '/') {
            op = '/';
        } else {
            break;
        }

        if (op) {
            tokens.forward();
            var term = getTerm(tokens);
            if (term) {
                factor = new ArithmeticExp(op, factor, term);
            } else {
                throw 'need two operands for ' + op;
            }
        }
    }

    return factor;
}

function getValueExp(/* Tokens */tokens) {
    // Exp = Factor ((“+” | “-”) Factor)*
    var exp = getFactor(tokens);

    while (tokens.hasNext()) {
        var op = null;

        var token = tokens.current();

        if (token.value === '+') {
            op = '+';
        } else if (token.value === '-') {
            op = '-';
        } else {
            break;
        }

        if (op) {
            tokens.forward();
            var factor = getFactor(tokens);
            if (factor) {
                exp = new ArithmeticExp(op, exp, factor);
            } else {
                throw 'need two operands for ' + op;
            }
        }
    }

    return exp;
}

function getAssignExp(/* Tokens */tokens) {
    // assignExp ::= <id> "=" <valueExp>

    var id = getId(tokens);

    if (id) {

        var eq = tokens.next();

        if (eq) {
            if (eq.value === '=') {
                var valueExp = getValueExp(tokens);

                if (valueExp) {
                    return new AssignExp(id.value, valueExp);
                } else {
                    throw 'no value exp after =';
                }


            } else {
                tokens.back(2);
                return;
            }
        } else {
            tokens.back();
            return;
        }


    }
}


function getExp(/* Tokens */tokens) {
    // exp = valueExp | assignExp
    var exp = getValueExp(tokens);

    if (exp) {
        return exp;
    }

    exp = getAssignExp(tokens);

    return exp;


}


function getExpList(/* Tokens */tokens) {
    // expList = exp (, exp )*
    var expListExp = new ExpListExp();

    var exp = getExp(tokens);
    if(exp){
        expListExp.add(exp);

        while(tokens.hasNext()){
            var comma = tokens.next();

            if(comma.value === ','){
                exp = getExp(tokens);

                if(exp){
                    expListExp.add(exp);
                }else{
                    throw 'no exp after ,';
                }

            }else{
                throw 'no , after exp';
            }
        }
    }

    return expListExp;
}

function Tokens(tokenArray) {
    this.tokenArray = tokenArray;

    this.index = 0;

    this.next = function () {
        return this.tokenArray[this.index++];
    };

    this.hasNext = function () {
        return this.index < this.tokenArray.length;
    };

    this.current = function () {
        return this.tokenArray[this.index];
    };

    this.forward = function () {
        this.index++;
        return this;
    };

    this.back = function (n) {
        n = n || 1;
        n = Math.max(n, 1);

        this.index -= n;
        return this;
    };

    this.left = function () {
        var tmp = [];
        var index = this.index;
        if (index < this.tokenArray.length) {
            tmp.push(this.tokenArray[index++]);
        }

        return tmp;
    }
}

function Parser(/* Array */tokenArray) {
    var tokens = new Tokens(tokenArray);

    return getExpList(tokens);
}
