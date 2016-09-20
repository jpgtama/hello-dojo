/**
 * Created by evan on 9/20/16.
 */
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
    };

    this.forward = function() {
        this.index++;
        return this;
    };

    this.back = function() {
        this.index--;
        return this;
    };

    this.left = function() {
        var tmp = [];
        var index = this.index;
        if (index < this.tokenArray.length) {
            tmp.push(this.tokenArray[index++]);
        }

        return tmp;
    }
}

function Token(type, value, startPosition) {
    // S for Symbol '+-*/(),'
    // I for identifier,
    // N for number
    this.type = type;
    this.value = value;
    this.sp = startPosition;

    if (this.type === 'S') {
        this.isS = true;
    } else if (this.type === 'I') {
        this.isI = true;
    } else if (this.type === 'N') {
        this.isN = true;
    }
}

function Lexer(str) {

    if(!str){
        throw 'parameter is empty';
    }

    var input = new Input(str);

    var tokens = [];

    // parse
    var t = null;
    while (input.index < input.str.length) {
        if ((t = Symbol(input)) || (t = Identifier(input)) || (t = Num(input)) ) {
            tokens.push(t);
        } else if ((t = Space(input))) {
            // ignore space
        } else {
            throw 'Invalid character at '+input.index+': ' + input.current();
        }
    }

    return tokens;
}

function Input(str) {
    this.index = 0;
    this.str = str;
    this.current = function(){
        return this.str.charAt(this.index);
    }
}

function Space(/* Input */input) {
    var c = input.str.charAt(input.index);
    if (c === ' ') {
        input.index++;
        return c;
    }
}


function Symbol(/* Input */input) {
    var c = input.str.charAt(input.index);
    if ('+-*/(),'.indexOf(c) !== -1) {
        var token = new Token('S', c, input.index);
        input.index++;
        return token;
    }
}

function Identifier(/* Input */input) {
    //
    var index = input.index;

    var state = 0;
    while (index < input.str.length) {
        var c = input.str.charAt(index);

        if (state === 0 && /[a-zA-Z]/.test(c)) {
            state = 1;
        } else if (state === 1 && /[a-zA-Z0-9_]/.test(c)) {
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
        var token = new Token('I', t, input.index);
        input.index = index;
        return token;
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
        var token = new Token('N', t, input.index);
        input.index = index;
        return token;
    }
}