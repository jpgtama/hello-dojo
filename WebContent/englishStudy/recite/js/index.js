/**
 * author: evan hu. Date: 2016 3 22
 */

// load article
this.article = {};
this.currentParagraphIndex = 0;
this.currentSentenceIndex = 0;
this.currentParagraphDom = null;
this.currentSentenceDom = null;

// 3 dimension array to store words
this.data = [];

// 2 index: current index and next index
this.currentIndex = null;
this.nextIndex = null;


// main
function main() {
    // load article
    loadArticle();

    // split article
    splitArticle();

    // initial index
    initIndex();
    
    // add blank word
    addBlankWord();
    
    // addKeyupEvent
    addKeyupEvent();
}

main();

/**
 * initial index
 */
function initIndex(){
	this.currentIndex = null;
	this.nextIndex = [0,0,0];
}

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
	// splitSentence, return word array
	var splitSentence = function (sentence) {
	    var words = [];

	    sentence.split(' ').forEach(function(word) {
	        word = word.trim();
	        if (word) {
	            words.push(word);
	        }
	    });

	    return words;
	};
	
    var pIndex = 0;
    article.content.split('\n').forEach(function(paragraphContent) {
        paragraphContent = paragraphContent.trim();
        if (paragraphContent) {
        	this.data[pIndex] = [];
            var sIndex = 0;
            paragraphContent.split('\.').forEach(function(sentence) {
                sentence = sentence.trim();
                if (sentence) {
                	this.data[pIndex][sIndex] = splitSentence(sentence);
                	sIndex++;
                }
            });

            pIndex++;
        }
    });
}


/**
 * addBlankWord, add word and blankword together, hidden word.
 * 
 * blank word is after the word.
 * 
 * both have a index, but have different class name
 * 
 */
function addBlankWord() {
    var articleDom = document.getElementById('article');
    
    // add data
    for(var p=0;p<data.length;p++){
    	// add paragraph dom node
    	var pDomNode = this.createParagraphDom(p);
    	articleDom.appendChild(pDomNode);
    	
    	for(var s=0;s<data[p].length; s++){
    		// add sentence dom node
    		var sDomNode = this.createSentenceDom(s);
    		pDomNode.appendChild(sDomNode);
    		
    		for(var w=0;w<data[p][s].length; w++){
    			// add word dom node, hide it
    			var wDomNode = this.createWordDom(data[p][s][w], getWordId([p, s, w]));
    			wDomNode.classList.add('hidden');
    			sDomNode.appendChild(wDomNode);

    			// add blank word node
    			var bwDomNode = this.createBlankWordDom(data[p][s][w].length, getBlankWordId([p, s, w]));
    			sDomNode.appendChild(bwDomNode);
    		}
    	}
    }
}

function getWordId(index){
	return 'p'+index[0]+'s'+index[1]+'w'+index[2];
}

function getBlankWordId(index){
	return 'p'+index[0]+'s'+index[1]+'bw'+index[2];
}

/**
 * createParagraphDom
 * @param p
 * @returns
 */
function createParagraphDom(p){
    var paragraphDom = document.createElement('div');
    paragraphDom.classList.add('paragraph');
    paragraphDom.setAttribute('index', p);
    return paragraphDom;
}

/**
 * createSentenceDom
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
 * @param blankLength
 * @param b
 * @returns {___anonymous3570_3572}
 */
function createBlankWordDom(blankLength, b) {
    var div = document.createElement('div');
    div.classList.add('blankWord');
//    div.setAttribute('index', b);
    div.id = b;
    for (var i = 0; i < blankLength; i++) {
        div.innerHTML = div.innerHTML + '&nbsp;';
    }

    return div;
}

// createWordDom
function createWordDom(word, w) {
    var div = document.createElement('div');
    div.classList.add('word');
//    div.setAttribute('index', w);
    div.id = w;
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
	// make the next index data visible
	var nextWord =  document.getElementById(getWordId(this.nextIndex));
	nextWord.classList.remove('hidden');
	
	// hide the next index blank data 
	var nextBlankWord =  document.getElementById(getBlankWordId(this.nextIndex));
	nextBlankWord.classList.add('hidden');
	
	
	// update both indice
	increaseIndex(this.currentIndex);
	increaseIndex(this.nextIndex);
	

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

function increaseIndex(index){
	
	if(data[index[0]][index[1]][index[2] + 1]){
		index[2] = index[2] + 1;
	}else if(data[index[0]][index[1] + 1]){
		index[1] = index[1] + 1;
		index[2] = 0;
	}else if(data[index[0] + 1]){
		index[0] = index[0] + 1;
		// set s = 0
		index[1] = 0;

		// set w = 0
		index[2] = 0;
	}else{
		//index[2] = index[2] + 1;
	}
	
//	if(index[2] < data[index[0]][index[1]].length){
//		index[2] = index[2] + 1;
//	}else if(index[1] < data[index[0]].length){
//		index[1] = index[1] + 1;
//		index[2] = 0;
//	}else if(index[0] < data.length){
//		index[0] = index[0] + 1;
//		// set s = 0
//		index[1] = 0;
//
//		// set w = 0
//		index[2] = 0;
//	}else{
//		index[0] = -1;
//	}
}

function increaseIndex2(index){
	if(index[2] < data[index[0]][index[1]].length){
		index[2] = index[2] + 1;
	}else if(index[1] < data[index[0]].length){
		index[1] = index[1] + 1;
		if(data[index[0]][index[1]].length > 0){
			index[2] = 0;
		}else{
			index[2] = -1;
		}
	}else if(index[0] < data.length){
		index[0] = index[0] + 1;
		// set s = 0
		if(data[index[0]].length > 0){
			index[1] = 0;
		}else{
			index[1] = -1;
		}
		// set w = 0
		if(data[index[0]][index[1]].length > 0){
			index[2] = 0;
		}else{
			index[2] = -1;
		}
	}else{
		index[0] = -1;
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
