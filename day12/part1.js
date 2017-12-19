const parsePrograms = input => {
    const programs = {},
        programInput = input
            .split("\n")
            .map((program, index) => {
                const prog = program.split(' <-> ');
                index = prog[0];
                programs[index] = prog[1].split(", ").map(Number);
            });
    return programs;
}

const connectPrograms = (targetProgram, allPrograms, currentPrograms) => {
    // add this to the current list of programs
    currentPrograms.push(targetProgram);

    // then check other programs for connections and add those 
    for (let i in allPrograms[targetProgram]) {
        let prog = allPrograms[targetProgram][i];

        // if it's not already in the list, then add it and it's connections
        if (currentPrograms.indexOf(prog) === -1) {
            connectPrograms(prog, allPrograms, currentPrograms);
        }
    }
}



fs = require('fs');

// test result
const testInput = fs.readFileSync('./testinput.txt'),
    testPrograms = parsePrograms(new String(testInput));
let currentPrograms = [];
connectPrograms(0, testPrograms, currentPrograms);
console.log('The size of the connected program group for the test input is ', currentPrograms.length)


// actual result
const input = fs.readFileSync('./input.txt');
    programs = parsePrograms(new String(input));
currentPrograms = [];
connectPrograms(0, programs, currentPrograms);
console.log('The size of the connected program group is ', currentPrograms.length)
