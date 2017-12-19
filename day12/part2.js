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

const isInAGroup = (program, groups) => {
    for (let i in groups) {
        if (program === i || (groups[i] && groups[i].indexOf(program) !== -1)) {
            return true;
        }
    }

    return false;
}

const createGroups = (programs) => {
    let groups = {};

    for (let i in programs) {
        i = Number(i);

        if (!isInAGroup(i, groups)) {
            groups[i] = [];
            connectPrograms(i, programs, groups[i]);
        }
    }

    return groups;
}

const getCount = groups => Object.keys(groups).length


fs = require('fs');

// test result
const testInput = fs.readFileSync('./testinput.txt'),
    testPrograms = parsePrograms(new String(testInput)),
    testGroups = createGroups(testPrograms)
console.log('There are ' + getCount(testGroups) + ' groups in the test input');
  

// actual result
const input = fs.readFileSync('./input.txt'),
    programs = parsePrograms(new String(input)),
    groups = createGroups(programs)
console.log('There are ' + getCount(groups) + ' groups');
