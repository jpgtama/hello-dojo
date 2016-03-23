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
	this.currentIndex = [];
	this.nextIndex = [0,0,0];
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
    this.data = [];
    
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

/**
 * getWordId
 * @param index
 * @returns
 */
function getWordId(index){
	return  index?'p'+index[0]+'s'+index[1]+'w'+index[2]: undefined;
}

/**
 * getBlankWordId
 * @param index
 * @returns
 */
function getBlankWordId(index){
	return index? 'p'+index[0]+'s'+index[1]+'bw'+index[2] : undefined;
}

/**
 * createParagraphDom
 * 
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
function createBlankWordDom(blankLength, b) {
    var div = document.createElement('div');
    div.classList.add('blankWord');
    div.id = b;
    for (var i = 0; i < blankLength; i++) {
        div.innerHTML = div.innerHTML + '&nbsp;';
    }

    return div;
}

/**
 * createWordDom
 * @param word
 * @param w
 * @returns {___anonymous4285_4287}
 */
function createWordDom(word, w) {
    var div = document.createElement('div');
    div.classList.add('word');
// div.setAttribute('index', w);
    div.id = w;
    div.innerHTML = word;

    return div;
}

/**
 * addKeyupEvent
 */
function addKeyupEvent() {

 // key event
 // ->: 39, <-: 37
 // down: 40, up: 38
 window.addEventListener('keyup', function(e) {
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
 });
}

/**
 * showNextWord
 */
function showNextWord() {
	// make the next index data visible
    // hide the next index blank data
	var nextWord =  document.getElementById(getWordId(this.nextIndex));
	var nextBlankWord =  document.getElementById(getBlankWordId(this.nextIndex));

	if(nextWord && nextBlankWord){
	    nextWord.classList.remove('hidden');
	    nextBlankWord.classList.add('hidden');
	    
	    // update both indice
	    increaseIndex(this.currentIndex);
	    increaseIndex(this.nextIndex);
	}
}

/**
 * increaseIndex
 * 
 * @param index
 */
function increaseIndex(index){
	// start from begining
    if(index.length === 0){
        index.push(0);
        index.push(0);
        index.push(0);
        return;
    }
    
    // increase by 1
	if(data[index[0]][index[1]][index[2] + 1]){
		index[2] = index[2] + 1;
	}else if(data[index[0]][index[1] + 1]){
		index[1] = index[1] + 1;
		index[2] = 0;
	}else if(data[index[0] + 1]){
		index[0] = index[0] + 1;
		index[1] = 0;
		index[2] = 0;
	}else{
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
    if(index.length === 0){
        var lp = data.length -1 ;
        var ls = data[lp].length -1;
        var lw = data[lp][ls].length -1;
        index.push(lp);
        index.push(ls);
        index.push(lw);
        return;
    }
    
    // decrease by 1
    if(data[index[0]][index[1]][index[2] - 1]){
        index[2] = index[2] - 1;
    }else if(data[index[0]][index[1] - 1]){
        index[1] = index[1] - 1;
        index[2] = data[index[0]][index[1]].length -1;
    }else if(data[index[0] - 1]){
        index[0] = index[0] - 1;
        index[1] = data[index[0]].length -1;
        index[2] = data[index[0]][index[1]].length -1;
    }else{
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
    var currentWord =  document.getElementById(getWordId(this.currentIndex));
    var currentBlankWord =  document.getElementById(getBlankWordId(this.currentIndex));

    if(currentWord && currentBlankWord){
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
    
    while(nextSentenceIndex !== undefined && nextSentenceIndex === this.nextIndex[1]){
        this.showNextWord();
    }
}

// hideCurrentSentence
// if current sentence words are not all hidden, then hide left word
// if all words are hidden ,then hide previous sentence
function hideCurrentSentence() {

    var currentSentenceIndex = this.currentIndex[1];
    while(currentSentenceIndex !== undefined && currentSentenceIndex === this.currentIndex[1]){
        this.hideCurrentWord();
    }
    
//    if (currentSentenceDom.querySelectorAll('.word:not(.blank)').length > 0) {
//        while (currentSentenceDom.querySelectorAll('.word:not(.blank)').length > 0) {
//            hideCurrentWord();
//        }
//    } else if (currentSentenceDom.previousElementSibling) {
//        hideCurrentWord();
//        hideCurrentSentence();
//    }
}
