const getLoopedListSection = (list, start, length) => {
    let curPos = start,
        value = [];

    for (let i = 0; i < length; i++) {
        value.push(list[curPos]);

        curPos++;
        if (curPos >= list.length) {
            curPos = 0;
        }
    }

    return value;
}

const setLoopedListSection = (list, start, length, replace) => {
    let curPos = start;

    for (let i = 0; i < length; i++) {
        if (curPos >= list.length) {
            curPos = 0;
        }

        list[curPos] = replace[i];
        curPos++;
    }

    return list;
}

const incrementPosition = (pos, len, max) => {
    for (let i = 0; i < len; i++) {
        pos++;

        if (pos >= max) {
            pos = 0;
        }
    }
    return pos;
}


const knotList = (numbers, lengths, times = 1) => {
    let currentPosition = 0,
        skipSize = 0;

    for (let repeat = 0; repeat < times; repeat++) {
        for (let i in lengths) {
            let length = lengths[i],
                slice = getLoopedListSection(numbers, currentPosition, length),
                reversedSlice = slice.reverse();
            
            numbers = setLoopedListSection(numbers, currentPosition, length, reversedSlice);

            currentPosition = incrementPosition(currentPosition, length + skipSize, numbers.length);

            skipSize++;
        }
    }

    return numbers;
}

const chunkArray = (source, size) => {
    const arrays = [];
    
    while (source.length > 0) {
        arrays.push(source.splice(0, size));
    }

    return arrays;
}

const xorValues = (values) => {
    let xorVal = values[0];
    
    for (let n = 1; n < values.length; n++) {
        xorVal ^= values[n];
    }

    return xorVal;
}

const arrayToHex = (source) => {
    let hash = '';

    for (let i = 0; i < source.length; i++) {
        hash += source[i].toString(16).padStart(2, '0');
    }

    return hash;
};

const denseHash = (sparse) => {
    // 16 block chunks
    const chunks = chunkArray(sparse, 16);

    // XOR numbers in each group
    const numbers = [];
    for (let i = 0; i < chunks.length; i++) {
        numbers.push(xorValues(chunks[i]));
    }

    return arrayToHex(numbers);
};

// tests
const tests = [
    "", 
    "AoC 2017",
    "1,2,3",
    "1,2,4"
];

for (let t in tests) {
    let testList = Array.from(new Array(256), (x, i) => i),
        testLengths = tests[t]
            .split('')
            .map(char => char.charCodeAt(0))
            .concat([17, 31, 73, 47, 23]),
        knottedTestList = knotList(testList, testLengths, 64),
        testDense = denseHash(knottedTestList);
    console.log('The test answer for "' + tests[t] + '" is ' + testDense);
}

// main
fs = require('fs');

const input = fs.readFileSync('./input.txt'),
    lengths = (new String(input))
        .split('')
        .map(char => char.charCodeAt(0))
        .concat([17, 31, 73, 47, 23]),
    numbers = Array.from(new Array(256), (x, i) => i),
    sparseHash = knotList(numbers, lengths, 64),
    answer = denseHash(sparseHash);
console.log('The answer is ' + answer);