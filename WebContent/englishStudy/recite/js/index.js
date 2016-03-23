/**
 * author: evan hu. Date: 2016 3 22
 */

/**
 * main
 */
function main() {
    // load article
    loadArticle();

    // split article
    splitArticle();

    // initial index
    initIndex();

    // prepare read area
    prepareReadArea(this.data);

    // prepare practice area
    preparePracticeArea(this.practiceData);
}

main();

/**
 * initial index
 */
function initIndex() {
    this.currentIndex = [];
    this.nextIndex = [
        0,
        0,
        0
    ];

    // practice index
    this.nextCharacterIndex = [
        0,
        0,
        0,
        0
    ]; // for practice
}

/**
 * loadArticle
 */
function loadArticle() {
    this.article = {};
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            article.content = xhttp.responseText;
        }
    };
    xhttp.open("GET", "articles/martin.txt", false);
    xhttp.send();
}

/**
 * splitArticle
 */
function splitArticle() {
    // 3 dimension array to store words
    this.data = splitStringWithMultipleSpliters(article.content, [
        '\n',
        '.',
        ' '
    ]);

    // 4 dimension array to store every character
    this.practiceData = splitStringWithMultipleSpliters(article.content, [
        '\n',
        '.',
        ' ',
        ''
    ]);
}

/**
 * splitStringInArray
 * 
 * @param arr
 * @param spliter
 */
function splitStringInArray(arr, spliter) {
    for (var i = 0; i < arr.length; i++) {
        // recursive call
        if (typeof arr[i] !== 'string') {
            splitStringInArray(arr[i], spliter);
        } else {
            // string
            var s = arr[i];
            arr[i] = [];

            s.split(spliter).forEach(function(item) {
                item = item.trim();
                if (item) {
                    arr[i].push(item);
                }
            });
        }
    }
}

/**
 * splitStringWithMultipleSpliters
 * 
 * @param spliters,
 *            an array of spliters, like ['\n', '\.', ' ', '']
 */
function splitStringWithMultipleSpliters(s, /* array */spliters) {
    var retObject = null;

    spliters.forEach(function(spliter) {
        // first time
        if (!retObject) {
            retObject = [];
            s.split(spliter).forEach(function(item) {
                item = item.trim();
                if (item) {
                    retObject.push(item);
                }
            });
        } else {
            splitStringInArray(retObject, spliter);
        }
    });

    return retObject;
}

/**
 * prepareReadArea, add word and blankword together, hidden word.
 * 
 * blank word is after the word.
 * 
 * both have a index, but have different class name
 * 
 */
function prepareReadArea(data) {
    var articleDom = document.getElementById('article');

    // add data to read area
    for (var p = 0; p < data.length; p++) {
        // add paragraph dom node
        var pDomNode = this.createParagraphDom(p);
        articleDom.appendChild(pDomNode);

        for (var s = 0; s < data[p].length; s++) {
            // add sentence dom node
            var sDomNode = this.createSentenceDom(s);
            pDomNode.appendChild(sDomNode);

            for (var w = 0; w < data[p][s].length; w++) {
                // add word dom node, hide it
                var wDomNode = this.createWordDom(data[p][s][w], getWordId([
                    p,
                    s,
                    w
                ]));
                wDomNode.classList.add('hidden');
                sDomNode.appendChild(wDomNode);

                // add blank word node
                var bwDomNode = this.createBlankWordDom(data[p][s][w].length, getBlankWordId([
                    p,
                    s,
                    w
                ]));
                sDomNode.appendChild(bwDomNode);
            }
        }
    }
}

function preparePracticeArea(data) {
    var practiceArticleDom = document.getElementById('practiceArticle');

    // add data to read area
    for (var p = 0; p < data.length; p++) {
        // add paragraph dom node
        var pDomNode = this.createParagraphDom(p);
        practiceArticleDom.appendChild(pDomNode);

        for (var s = 0; s < data[p].length; s++) {
            // add sentence dom node
            var sDomNode = this.createSentenceDom(s);
            pDomNode.appendChild(sDomNode);

            for (var w = 0; w < data[p][s].length; w++) {
                // add word dom node
                var wDomNode = createDiv('word', getWordId([
                    p,
                    s,
                    w
                ]));
                sDomNode.appendChild(wDomNode);

                // add character dom
                for (var c = 0; c < data[p][s][w].length; c++) {
                    var cDomNode = createDiv('character', getCharacterId([
                        p,
                        s,
                        w,
                        c
                    ]), data[p][s][w][c]);
                    cDomNode.classList.add('hidden');
                    wDomNode.appendChild(cDomNode);

                    // add blank character node
                    var bcDomNode = this.createBlankWordDom(1, getBlankCharacterId([
                        p,
                        s,
                        w,
                        c
                    ]));
                    wDomNode.appendChild(bcDomNode);
                }
            }
        }
    }
}

/**
 * getWordId
 * 
 * @param index
 * @returns
 */
function getWordId(index) {
    return index ? 'p' + index[0] + 's' + index[1] + 'w' + index[2] : undefined;
}

/**
 * getBlankWordId
 * 
 * @param index
 * @returns
 */
function getBlankWordId(index) {
    return index ? 'p' + index[0] + 's' + index[1] + 'bw' + index[2] : undefined;
}

/**
 * getCharacterId
 * 
 * @param index
 * @returns
 */
function getCharacterId(index) {
    return index ? 'p' + index[0] + 's' + index[1] + 'w' + index[2] + 'c' + index[3] : undefined;
}

/**
 * getBlankCharacterId
 * 
 * @param index
 * @returns
 */
function getBlankCharacterId(index) {
    return index ? 'p' + index[0] + 's' + index[1] + 'w' + index[2] + 'bc' + index[3] : undefined;
}

/**
 * createParagraphDom
 * 
 * @param p
 * @returns
 */
function createParagraphDom(p) {
    var paragraphDom = document.createElement('div');
    paragraphDom.classList.add('paragraph');
    paragraphDom.setAttribute('index', p);
    return paragraphDom;
}

/**
 * createSentenceDom
 * 
 * @param s
 * @returns
 */
function createSentenceDom(s) {
    var div = document.createElement('div');
    div.classList.add('sentence');
    div.setAttribute('index', s);
    return div;
}

/**
 * createBlankWordDom
 * 
 * @param blankLength
 * @param b
 * @returns {___anonymous3570_3572}
 */
function createBlankWordDom(blankLength, id) {
    var div = document.createElement('div');
    div.classList.add('blankWord');
    div.id = id;
    for (var i = 0; i < blankLength; i++) {
        div.innerHTML = div.innerHTML + '&nbsp;';
    }

    return div;
}

/**
 * createWordDom
 * 
 * @param word
 * @param w
 * @returns {___anonymous4285_4287}
 */
function createWordDom(word, w) {
    var div = document.createElement('div');
    div.classList.add('word');
    div.id = w;
    div.innerHTML = word;

    return div;
}

/**
 * createDiv
 */
function createDiv(className, id, content) {
    var div = document.createElement('div');

    if (className) {
        div.classList.add(className);
    }

    if (id) {
        div.id = id;
    }

    if (content) {
        div.innerHTML = content;
    }

    return div;
}

/**
 * 
 * @param e
 */
function readKeyEventListener(e) {
    // key event
    // ->: 39, <-: 37
    // down: 40, up: 38

    var key = e.keyCode ? e.keyCode : e.which;

    if (key === 39) {
        showNextWord();
    } else if (key === 37) {
        hideCurrentWord();
    } else if (key === 40) {
        showNextSentence();
    } else if (key === 38) {
        hideCurrentSentence();
    }
}

/**
 * 
 * @param e
 */
function practiceKeyEventListener(e) {
    var key = e.keyCode ? e.keyCode : e.which;

    var userChar = String.fromCharCode(key);

    // get next character
    var charDom = document.getElementById(getCharacterId(this.nextCharacterIndex));
    
    if(charDom){
        // compare
        if(charDom.innerHTML === userChar){
            // display char on screen
            charDom.classList.remove('hidden');
            
            // hide blank char element
            var blankCharElement = document.getElementById(getBlankCharacterId(this.nextCharacterIndex));
            blankCharElement.classList.add('hidden');
            
            // increase nextCharacterIndex
            increaseAnyIndex(this.practiceData, this.nextCharacterIndex);
        }else{
            // some animation?
        }
    }

}

/**
 * showNextWord
 */
function showNextWord() {
    // make the next index data visible
    // hide the next index blank data
    var nextWord = document.getElementById(getWordId(this.nextIndex));
    var nextBlankWord = document.getElementById(getBlankWordId(this.nextIndex));

    if (nextWord && nextBlankWord) {
        nextWord.classList.remove('hidden');
        nextBlankWord.classList.add('hidden');

        // update both indice
        increaseIndex(this.currentIndex);
        increaseIndex(this.nextIndex);
    }
}

/**
 * 
 * two hypothesis:
 * 
 * 1. same depth
 * 
 * 2. no empty array
 * 
 * @param data
 * @param index,
 *            an array
 */
function increaseAnyIndex(data, indexArray) {
    var index = indexArray.shift();

    var d = data[index];

    if(typeof d === 'undefined'){
        // if the top most element is not found, then return 
        indexArray.unshift(index);
        return ;
    }else if (typeof d === 'object') {
        // recursive
        increaseAnyIndex(d, indexArray);

        // if not found in child array
        if (indexArray[0] === -1) {
            indexArray[0] = 0;
            var nextSubArray = data[index + 1];
            if (nextSubArray) {
                index++;
            }else{
                index = -1;
            }
        }
        indexArray.unshift(index);
    } else {
        var nextElement = data[index + 1];

        if (nextElement) {
            indexArray.unshift(index + 1);
        } else {
            // 
            indexArray.unshift(-1);
        }
    }

}

/**
 * increaseIndex
 * 
 * @param index
 */
function increaseIndex(index) {
    // start from begining
    if (index.length === 0) {
        index.push(0);
        index.push(0);
        index.push(0);
        return;
    }

    // increase by 1
    if (data[index[0]][index[1]][index[2] + 1]) {
        index[2] = index[2] + 1;
    } else if (data[index[0]][index[1] + 1]) {
        index[1] = index[1] + 1;
        index[2] = 0;
    } else if (data[index[0] + 1]) {
        index[0] = index[0] + 1;
        index[1] = 0;
        index[2] = 0;
    } else {
        // overflow, set to empty
        index.pop();
        index.pop();
        index.pop();
    }
}

/**
 * decreaseIndex
 */
function decreaseIndex(index) {
    // start from the end
    if (index.length === 0) {
        var lp = data.length - 1;
        var ls = data[lp].length - 1;
        var lw = data[lp][ls].length - 1;
        index.push(lp);
        index.push(ls);
        index.push(lw);
        return;
    }

    // decrease by 1
    if (data[index[0]][index[1]][index[2] - 1]) {
        index[2] = index[2] - 1;
    } else if (data[index[0]][index[1] - 1]) {
        index[1] = index[1] - 1;
        index[2] = data[index[0]][index[1]].length - 1;
    } else if (data[index[0] - 1]) {
        index[0] = index[0] - 1;
        index[1] = data[index[0]].length - 1;
        index[2] = data[index[0]][index[1]].length - 1;
    } else {
        // overflow, set to empty
        index.pop();
        index.pop();
        index.pop();
    }
}

/**
 * hide current word
 */
function hideCurrentWord() {
    // make the current index data visible
    // hide the current index blank data
    // decrease the index
    var currentWord = document.getElementById(getWordId(this.currentIndex));
    var currentBlankWord = document.getElementById(getBlankWordId(this.currentIndex));

    if (currentWord && currentBlankWord) {
        currentWord.classList.add('hidden');
        currentBlankWord.classList.remove('hidden');

        // update both indice
        decreaseIndex(this.currentIndex);
        decreaseIndex(this.nextIndex);
    }
}

/**
 * showNextSentence
 */
function showNextSentence() {
    // show all words in next sentence
    var nextSentenceIndex = this.nextIndex[1];

    while (nextSentenceIndex !== undefined && nextSentenceIndex === this.nextIndex[1]) {
        this.showNextWord();
    }
}

// hideCurrentSentence
// if current sentence words are not all hidden, then hide left word
// if all words are hidden ,then hide previous sentence
function hideCurrentSentence() {

    var currentSentenceIndex = this.currentIndex[1];
    while (currentSentenceIndex !== undefined && currentSentenceIndex === this.currentIndex[1]) {
        this.hideCurrentWord();
    }

    // if (currentSentenceDom.querySelectorAll('.word:not(.blank)').length > 0)
    // {
    // while (currentSentenceDom.querySelectorAll('.word:not(.blank)').length >
    // 0) {
    // hideCurrentWord();
    // }
    // } else if (currentSentenceDom.previousElementSibling) {
    // hideCurrentWord();
    // hideCurrentSentence();
    // }
}
