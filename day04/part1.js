fs = require('fs');

const input = fs.readFileSync('./input.txt'),
    lines = (new String(input)).split("\n");

let valid = 0;

lines.map((line, index) => {
    const record = line.trim().split(' ');
    const words = {};
    record.map((word) => words[word] = word);

    if (Object.keys(words).length === record.length) {
        valid++;
    }
});

console.log('There are ' + valid + ' valid passphrases');

