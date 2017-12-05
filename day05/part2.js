
const processJumps = function(jumps) {
    let steps = 0,
        position = 0,
        numJumps = jumps.length;

    while (position >= 0 && position < numJumps) {
        let next = parseInt(jumps[position]);
        jumps[position] = next >= 3 ? next - 1 : next + 1;
        position += next;
        steps++;
        //if (steps % 1000 == 0) {
        //    process.stdout.write('.');
        //}
        // console.log('pos', position, 'next ' + next + ' => ' + next++, 'steps', steps);
        // console.log('');
    }

    return steps;
}

// test run
const testInput = ['0', '3', '0', '1', '-3'];
console.log('It took ' + processJumps(testInput) + ' steps to exit');

// actual run
fs = require('fs');

const input = fs.readFileSync('./input.txt'),
    lines = (new String(input)).trim().split("\n"),
    steps = processJumps(lines);

console.log('It took ' + steps + ' steps to exit');


