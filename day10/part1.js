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


const knotList = (numbers, lengths) => {
    let currentPosition = 0,
        skipSize = 0;

    for (let i in lengths) {
        let length = lengths[i],
            slice = getLoopedListSection(numbers, currentPosition, length),
            reversedSlice = slice.reverse();
        
        numbers = setLoopedListSection(numbers, currentPosition, length, reversedSlice);
        currentPosition = incrementPosition(currentPosition, length + skipSize, numbers.length);

        skipSize++;
    }

    return numbers;
}

const calcAnswer = (list) => {
    return list[0] * list[1];
}


const testList = [0, 1, 2, 3, 4],
    testLengths = [3, 4, 1, 5],
    knottedTestList = knotList(testList, testLengths),
    testAnswer = calcAnswer(knottedTestList);
console.log('The test answer is ' + testAnswer);


fs = require('fs');

const input = fs.readFileSync('./input.txt'),
    lengths = (new String(input)).split(",").map(Number),
    numbers = Array.from(new Array(256), (x, i) => i),
    resultList = knotList(numbers, lengths),
    answer = calcAnswer(resultList);

console.log('The answer is ' + answer);
