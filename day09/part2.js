
const processInput = (input) => {
    // remove any cancelled input right away
    // any single character after a ! is removed
    const cleanInput = (new String(input)).replace(/!.{1}/g, '');

    // process.stdout.write(cleanInput + "\n");
    let state = 'normal',
        score = 0,
        garbageScore = 0;
        groupLevel = 0;

    for (let i = 0; i < cleanInput.length; i++) {
        switch (state) {
            case 'garbage':
                // ignore input until we hit a '>' character
                if (cleanInput[i] === '>') {
                    state = 'normal';
                } else {
                    garbageScore++;
                }
                continue;
                break;

            case 'normal':
                if (cleanInput[i] === '<') {
                    state = 'garbage';
                    continue;
                }

                if (cleanInput[i] === '{') {
                    groupLevel++;
                } else if (cleanInput[i] === '}') {
                    // ended a group, add it to the score
                    score += groupLevel;

                    // and drop back down a level
                    groupLevel--;
                }

                break;
        }
    }

    return garbageScore;
};

const testInput1 = '{<>}',
    score1 = processInput(testInput1);
    console.log(testInput1, score1, 'should be 0');

const testInput2 = '{<random characters>}',
    score2 = processInput(testInput2);
console.log(testInput2, score2, 'should be 17');

const testInput3 = '{<<<<>}',
    score3 = processInput(testInput3);
    console.log(testInput3, score3, 'should be 3');

fs = require('fs');
const input = fs.readFileSync('./input.txt');
const score = processInput(input);
console.log('input', score);