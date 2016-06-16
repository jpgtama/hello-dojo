/**
 * Created by evan on 2016/6/9.
 */

// get data
// structure:
// {
//        ch:
//        en:
//        ans:
// }
var data = [];

// order: ef - english first, cf - chinese first
var order = 'ef';

var ps = document.querySelectorAll('div.article div.body p ');

// check even
var isEven = ps.length % 2;

if (isEven !== 0) {
    throw new Error('Not even sentence!!!');
}


for (var i = 0; i < ps.length; i++) {
    var en, ch;
    if (order === 'ef') {
        en = ps[i].innerHTML;
        ch = ps[++i].innerHTML;
    } else {
        ch = ps[i].innerHTML;
        en = ps[++i].innerHTML;
    }

    //
    var d = {
        en: en,
        ch: ch,
        ans: false
    };
    data.push(d);

}

var chinese = document.getElementById('chinese');
var english = document.getElementById('english');

chinese.innerText = data[1].ch;
english.innerText = data[1].en;


var SentenceModel;
SentenceModel = function (s) {
    // the original sentence
    this.s = s;
    // the word tree
    this.word_tree = null;
    // word sequence
    this.word_sequence = null;

    // get word tree
    this.splitSentence();
    // flatten word tree -> word sequence
    this.flattenWordTree();
};

SentenceModel.prototype.declaredClass = 'SentenceModel';
SentenceModel.prototype.punctuationList = [',', '.', ':', ';', '"', '...', '!', ' - ', '?', '/', '(', ')', '[', ']', '{', '}'];

SentenceModel.prototype.splitString = function (/*String*/s, /*char*/p) {
    // ====================================
    // split a string sentence into array using punctuation p
    // return an array if it contains p
    // return the original string if it doesn't contain p
    // ====================================
    var ret = [];
    var index = s.indexOf(p);
    if (index != -1) {
        // split this string into 3 parts: a, b, c
        var a = s.substring(0, index);
        // split again if this string contains p
        if (a.indexOf(p) != -1) {
            a = this.splitString(a, p);
        }

        var b = s.substr(index, p.length);

        var c = s.substring(index + p.length);
        // split again if this string contains p
        if (c.indexOf(p) != -1) {
            c = this.splitString(c, p);
        }

        // push the 3 parts into array
        ret.push(a);
        ret.push(b);
        ret.push(c);

        return ret;
    }

    return s;
};


SentenceModel.prototype.splitArray = function (a, p) {
    // ====================================
    // split the string in an array
    // the array must be a 3-elements arary, the middle one is a punctuation
    // ====================================

    if (Array.isArray(a) && a.length === 3) {

        // left
        if (Array.isArray(a[0])) {
            a[0] = this.splitArray(a[0], p);
        } else if (typeof a[0] === 'string') {
            a[0] = this.splitString(a[0], p);
        }

        // right
        if (Array.isArray(a[2])) {
            a[2] = this.splitArray(a[2], p);
        } else if (typeof a[2] === 'string') {
            a[2] = this.splitString(a[2], p);
        }
    }

    return a;
};


SentenceModel.prototype.split = function (as, p) {
    // ====================================
    // split a string or array, using only one punctuation
    // ====================================
    if (Array.isArray(as)) {
        return this.splitArray(as, p);
    } else if (typeof as === 'string') {
        return this.splitString(as, p);
    }

    return as;
};

SentenceModel.prototype.getContainedPunctuation = function () {
    // ====================================
    // get contained punctuation in this sentence
    // ====================================
    var cp;

    if(this.s){
        cp = this.punctuationList.filter(function (p) {
            return this.s.indexOf(p) !== -1;
        }, this);
    }

    return cp;
};


SentenceModel.prototype.splitSentence = function () {
    // ====================================
    // split sentence using punctuation list
    // ====================================

    var cp = this.getContainedPunctuation();


    this.word_tree = this.s;
    cp.forEach(function (p) {
        this.word_tree = this.split(this.word_tree, p);
    }, this);
};

SentenceModel.prototype.isTripleArray = function (a) {
    // ====================================
    // check is a 3 elements array
    // ====================================
    if(Array.isArray(a) && a.length === 3){
        return true;
    }else{
        return false;
    }
};

SentenceModel.prototype.isString = function (s) {
    // ====================================
    // check is a string
    // ====================================
  return typeof s === 'string';
};


SentenceModel.prototype.getLeaf = function (node) {
    // ====================================
    // get all the leaves and chain them to an array
    // ====================================
    if(this.isTripleArray(node)){
        var a = this.getLeaf(node[0]);

        // we don't need to handle b, as b is the punctuation
        var b = [node[1]];

        var c = this.getLeaf(node[2]);

        return a.concat(b).concat(c);
    }else if(this.isString(node)){
        // trip space & split by space
        node = node.trim();

        if(node.length>0){
            return node.split(/\s+/);
        }else{
            return [];
        }
    }
};


SentenceModel.prototype.flattenWordTree = function () {
    // ====================================
    // flatten word tree
    // ====================================
    this.word_sequence = this.getLeaf(this.word_tree);
};


SentenceModel.prototype.equals = function (sm) {
    // ====================================
    // check two sentence model if the same, if is, return nothing, else return the difference or error if any.
    // ====================================

    if(!sm){
        // null error
        return 'null parameter';
    }else if(sm.declaredClass !== 'SentenceModel'){
        // not the same class
        return 'not the class: SentenceModel';
    }else if(sm.declaredClass === 'SentenceModel'){
        // the same class
        var minLength = Math.min(this.word_sequence.length, sm.word_sequence.length);

        // check difference under min length
        for(var i=0;i<minLength;i++){
            if(this.word_sequence[i] !== sm.word_sequence[i]){
                return  sm.word_sequence[i];
            }
        }

        if(this.word_sequence.length !== sm.word_sequence.length){
            return 'not the same length';
        }
    }else{
        // other error
        return 'other error';
    }
};


SentenceModel.prototype.unitTest = function () {

    // ====================================
    // unit test
    // ====================================

    // 1. check word sequence length
    var s = 'Hello, I am Mike. And what it means - it is ok/not-ok. But he/she/me/them is not the thing-after. ';
    var sm = new SentenceModel(s);

    // TODO need to finish UT

    console.log(sm);

};