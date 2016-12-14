var words = [];
var alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

function loadWords() {
    // Load the words from resources, if it is not already cached.
    if (words.length > 0) { return words; }

    $.get("resources/words.txt", function(data) {
		words = data.split('\n');
	}, 'text');
}

function getHooks(word) {
    // Return all elgible words that are +1 letter to the given word.
    var hooks = [];
    var allWords = loadWords();

    for (var i in alphabet) {
        preWord = alphabet[i].concat(word);
        postWord = word.concat(alphabet[i]);
        
        if (jQuery.inArray(preWord, allWords) > -1) {
            hooks.push(preWord);
        }

        if (jQuery.inArray(postWord, allWords) > -1) {
            hooks.push(postWord);
        }
    }

    return hooks;
}

function getAnagrams(input) {
    // Return all anagrams of the provided string.
    // '?' is a wildcard character.
    var anagrams = [];
    var allWords = loadWords();

    sameSizeWords = allWords.filter(function (element) {
        return (element.length == input.length);
    });

    for (var i in sameSizeWords) {
        var candidateWord = sameSizeWords[i];
        var candidateLetters = candidateWord.split('');
        var inputLetters = input.split('');
        if (isAnagram(candidateLetters, inputLetters)){
            anagrams.push(candidateWord);
        }
    }
    
    return anagrams;
}

function isAnagram(candidateLetters, inputLetters) {
    // Return true if the input letters are an anagram
    // of the candidate letters.
    for (var i in candidateLetters) {
        index = inputLetters.indexOf(candidateLetters[i]);
        if (index > -1) {
            inputLetters.splice(index, 1);
        } else {
            wildCardIndex = inputLetters.indexOf('?');
            if (wildCardIndex > -1) { inputLetters.splice(wildCardIndex, 1); }
        }
    }

    return inputLetters.length == 0;
}

function getQWithoutU() {
    // Return a list of Q without U words
    var allWords = loadWords();

    return allWords.filter(function (element) {
        return (element.indexOf('q') > -1) && (element.indexOf('u') === -1);
    });
}

function get2LetterWords() {
    // Return a list of 2 letter words
	var allWords = loadWords();
	return allWords.filter(function (element) {
		   return (element.length == 2);
	});
}