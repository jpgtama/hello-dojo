/**
 * author: evan hu. Date: 2016 3 22
 */

// load article
this.article = {};
this.currentParagraphIndex = 0;
this.currentSentenceIndex = 0;
this.currentParagraphDom = null;
this.currentSentenceDom = null;

// main
function main() {
    // load article
    loadArticle();

    // split article
    splitArticle();

    // add blank word
    addBlankWord();
    
    // addKeyupEvent
    addKeyupEvent();
}

main();

debugger;
// loadArticle
function loadArticle() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            article.content = xhttp.responseText;
            console.log(article.content);
        }
    };
    xhttp.open("GET", "articles/martin.txt", false);
    xhttp.send();
}

// splitArticle
function splitArticle() {
    article.paragraphs = [];
    article.content.split('\n').forEach(function(paragraphContent) {
        paragraphContent = paragraphContent.trim();
        if (paragraphContent) {
            // create paragraph
            var paragraph = {
                content : paragraphContent
            };

            // splitSentence
            paragraph.sentences = [];
            paragraph.content.split('\.').forEach(function(sentence) {
                sentence = sentence.trim();
                if (sentence) {
                    paragraph.sentences.push({
                        content : sentence,
                        words : splitSentence(sentence)
                    });
                }
            });

            // push
            article.paragraphs.push(paragraph);
        }
    });
}

// splitSentence, return word array
function splitSentence(sentence) {
    var words = [];

    sentence.split(' ').forEach(function(word) {
        word = word.trim();
        if (word) {
            words.push(word);
        }
    });

    return words;
}

// addBlankWord
function addBlankWord() {
    var articleDom = document.getElementById('article');
    
    for(var i=0;i<article.paragraphs.length; i++){

        var paragraph = article.paragraphs[i];
        
        // add paragraph dom
        var paragraphDom = createParagraphDom(i);
        articleDom.appendChild(paragraphDom);


        // add sentenceDom
        for(var j = 0;j< paragraph.sentences.length; j++){
            var sentence = paragraph.sentences[j];

            // add sentence dom to paragraph dom
            var sentenceDom = createSentenceDom(j);
            paragraphDom.appendChild(sentenceDom);

            // set current sentence
            if (!currentSentenceDom) {
                currentSentenceDom = sentenceDom;
            }

            // add blank word to sentence
            for(var k=0;k<sentence.words.length; k++){
                var word = sentence.words[k];
                sentenceDom.appendChild(createBlankWordDom(word.length, k));
            }
//            sentence.words.forEach(function(word) {
//                sentenceDom.appendChild(createBlankWordDom(word.length));
//            });
        
        }
        
// paragraph.sentences.forEach(function(sentence) {
//
// // add sentence dom to paragraph dom
// var sentenceDom = createSentenceDom();
// paragraphDom.appendChild(sentenceDom);
//
// // set current sentence
// if (!currentSentenceDom) {
// currentSentenceDom = sentenceDom;
// }
//
// // add blank word to sentence
// sentence.words.forEach(function(word) {
// sentenceDom.appendChild(createBlankWordDom(word.length));
// });
// });

    
    }
    
// article.paragraphs.forEach(function(paragraph) {
// // add paragraph dom
// var paragraphDom = createParagraphDom();
// articleDom.appendChild(paragraphDom);
//
// // currentSentenceDom
// var currentSentenceDom = null;
//
// // add blank words
// paragraph.sentences.forEach(function(sentence) {
//
// // add sentence dom to paragraph dom
// var sentenceDom = createSentenceDom();
// paragraphDom.appendChild(sentenceDom);
//
// // set current sentence
// if (!currentSentenceDom) {
// currentSentenceDom = sentenceDom;
// }
//
// // add blank word to sentence
// sentence.words.forEach(function(word) {
// sentenceDom.appendChild(createBlankWordDom(word.length));
// });
// });
//
// });
}

// createParagraphDom
function createParagraphDom(i){
    var paragraphDom = document.createElement('div');
    paragraphDom.classList.add('paragraph');
    paragraphDom.setAttribute('index', i);
    return paragraphDom;
}

// createSentenceDom
function createSentenceDom(j) {
    var div = document.createElement('div');
    div.classList.add('sentence');
    div.setAttribute('index', j);
    return div;
}

// createBlankWordDom
function createBlankWordDom(blankLength, k) {
    var div = document.createElement('div');
    div.classList.add('blankWord');
    div.setAttribute('index', k);
    for (var i = 0; i < blankLength; i++) {
        div.innerHTML = div.innerHTML + '&nbsp;';
    }

    return div;
}

// createWordDom
function createWordDom(word) {
    var div = document.createElement('div');
    div.classList.add('word');
    div.innerHTML = word;

    return div;
}

// addKeyupEvent
function addKeyupEvent() {

 // key event
 // ->: 39, <-: 37
 // down: 40, up: 38
 window.addEventListener('keyup', function(e) {
     var key = e.keyCode ? e.keyCode : e.which;

     console.log(key);

     if (key === 39) {
         showNextWord();
     } else if (key === 37) {
         hideCurrentWord();
     } else if (key === 40) {
         showNextSentence();
     } else if (key === 38) {
         hideCurrentSentence();
     }
 });
}


// currentSentence
function setCurrentSentence(){
   this.currentSentence = paragraph.sentences.shift();
}

// showNextWord
function showNextWord() {

    // get current sentence dom
    var sentenceDomToInsert =  getSentenceDomToInsert();
    
    // get word to insert
    var word = getWordToInsert();
    
    // insert word
    insertWordToSentence(sentenceDomToInsert, word);
    
    
    // if no words left in current sentence, then move to next sentence
    if (currentSentence.words.length === 0) {
        var nextSentence = getNextSentence();
        if (nextSentence) {
            currentSentence = nextSentence;
            currentSentenceDom = currentSentenceDom.nextElementSibling;
        }
    }

    if (currentSentence.words.length > 0) {
        // current word
        var word = currentSentence.words.shift();

        // insert word
        insertWordToSentence(currentSentenceDom, word);
    }
}

/**
 * getSentenceDomToInsert
 */
function getSentenceDomToInsert() {
    
}


// getNextSentence
function getNextSentence(){
    // if currentParagraph has left sentence, then shift
    // if not, switch to next paragraph and shift
    if(this.currentParagraph.sentences.length > 0){
        return this.currentParagraph.sentences.shift();
    }else if(this.article.paragraphs.length > 0){
        this.currentParagraph = this.article.paragraphs.shift();
        return getNextSentence();
    }
}

function getNextSentenceDom(){
    // if current sentence dom has next sibling, then return it
    // if not, find the next paragraph
    if(this.currentSentenceDom.nextElementSibling){
        return this.currentSentenceDom.nextElementSibling;
    }else if(this.currentParagraphDom.nextElementSibling){
        this.currentParagraphDom = this.currentParagraphDom.nextElementSibling;
        return 
    }
}

// insertWordToSentence
function insertWordToSentence(sentenceDom, word) {
    // all blanks
    var blanks = sentenceDom.querySelectorAll('.blank');

    if (blanks && blanks.length > 0) {
        // the first blank dom
        var firstBlankDom = blanks[0];
        // get the first word in wordlist
        var wordToInsert = word;
        // create word dom
        var wordDom = createWordDom(wordToInsert);

        // insert into the place
        sentenceDom.insertBefore(wordDom, firstBlankDom);

        // remove first blank dom
        firstBlankDom.remove();
    }
}

// hideCurrentWord
// if there is no word in current sentenceDom, then switch to previous
// sentenceDom
function hideCurrentWord() {
    // current sentence dom
    var wordDoms = currentSentenceDom.querySelectorAll('.word:not(.blank)');

    if (wordDoms.length === 0) {
        // switch to previous sentence dom
        var previousSentenceDom = currentSentenceDom.previousElementSibling;
        if (previousSentenceDom) {
            currentSentenceDom = previousSentenceDom;
            // unshift current sentence to paragraph
            unshiftCurrentSentence();
            hideCurrentWord();
        }
    } else {
        // remove word
        var word = removeWordFromSentence(currentSentenceDom);

        // unshift word
        currentSentence.words.unshift(word);
    }
}

// unshiftCurrentSentence
function unshiftCurrentSentence() {
    paragraph.sentences.unshift(currentSentence);
    currentSentence = {
        words : []
    };
}

// removeWordFromSentence
function removeWordFromSentence(sentenceDom) {
    // the the last displayed word
    var displayedWordDoms = sentenceDom.querySelectorAll('.word:not(.blank)');

    if (displayedWordDoms && displayedWordDoms.length > 0) {
        var lastDisplayedWordDom = displayedWordDoms[displayedWordDoms.length - 1];
        var lastDisplayedWord = lastDisplayedWordDom.innerHTML;

        // create blank dom
        var blankDom = createBlankWordDom(lastDisplayedWord.length);

        // insert blank dom
        sentenceDom.insertBefore(blankDom, lastDisplayedWordDom);
        lastDisplayedWordDom.remove();

        return lastDisplayedWord;
    }
}

// showNextSentence, if current sentence words are not all displayed, then
// display them all
// if all words are displayed, then display next sentence
function showNextSentence() {
    if (currentSentence) {

        if (currentSentence.words.length > 0) {
            while (currentSentence.words.length > 0) {
                showNextWord();
            }
        } else if (paragraph.sentences.length > 0) {
            showNextWord();
            showNextSentence();
        }
    }
}

// hideCurrentSentence
// if current sentence words are not all hidden, then hide left word
// if all words are hidden ,then hide previous sentence
function hideCurrentSentence() {

    if (currentSentenceDom.querySelectorAll('.word:not(.blank)').length > 0) {
        while (currentSentenceDom.querySelectorAll('.word:not(.blank)').length > 0) {
            hideCurrentWord();
        }
    } else if (currentSentenceDom.previousElementSibling) {
        hideCurrentWord();
        hideCurrentSentence();
    }
}
