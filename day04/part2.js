// sort letters in word
const sortWord = function(word) {
    return word.split('').sort().join();
};

// words whose letters sort the same way are anagrams
const isAnagram = function(word1, word2) {
    word1 = sortWord(word1);
    word2 = sortWord(word2);
    return word1 === word2;
};

fs = require('fs');

// test input
// const input = "oiii ioii iioi iiio\niiii oiii ooii oooi oooo",
const input = fs.readFileSync('./input.txt'),
    lines = (new String(input)).split("\n");

let valid = 0;

lines.map((line, index) => {
    const record = line.trim().split(' ');
    let hasAnagram = false;

    record.map((word, index) => {
        record.map((otherWord, otherIndex) => {
            if (index !== otherIndex && isAnagram(word, otherWord)) {
                hasAnagram = true;
                return false;
            }
        });

        if (hasAnagram) {
            return false;
        }
    });
    
    if (!hasAnagram) {
        valid++;
    }

});

console.log('There are ' + valid + ' valid passphrases');

