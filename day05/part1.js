
const processJumps = function(jumps) {
    let steps = 0,
        position = 0,
        numJumps = jumps.length;

    console.log('# jumps', numJumps)

    while (position >= 0 && position < numJumps) {
        // console.log('jumps', jumps);
        let next = parseInt(jumps[position]);
        jumps[position] = next + 1;
        position += next;
        steps++;
        console.log('pos', position, 'next ' + next + ' => ' + next++, 'steps', steps);
        console.log('');
    }

    return steps;
}

// test run
// const testInput = ['0', '3', '0', '1', '-3'];
// console.log('It took ' + processJumps(testInput) + ' steps to exit');

// actual run
fs = require('fs');

const input = fs.readFileSync('./input.txt'),
    lines = (new String(input)).trim().split("\n"),
    steps = processJumps(lines);

console.log('It took ' + steps + ' steps to exit');


