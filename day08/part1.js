fs = require('fs');

// const input = fs.readFileSync('./testinput.txt'),
const input = fs.readFileSync('./input.txt'),
    lines = (new String(input)).split("\n");

const commands = [],
    registers = {};

lines.map((line) => {
    const cmd = line.match(/(\S*) (inc|dec) (\S*) if (\S*) (\S*) (\S*)/);
    commands.push(cmd);
});

for (let i = 0; i < commands.length; i++) {
    const cmd = commands[i],
        register = cmd[1],
        action = cmd[2],
        actionValue = parseInt(cmd[3]),
        conditional1 = cmd[4],
        comparison = cmd[5],
        conditional2 = parseInt(cmd[6]);

    let doAction = false;

    if (registers[conditional1] === undefined) {
        registers[conditional1] = 0;
    }
    
    switch (comparison) {
        case '==': doAction = registers[conditional1] == conditional2; break;
        case '!=': doAction = registers[conditional1] != conditional2; break;
        case '>': doAction = registers[conditional1] > conditional2; break;
        case '<': doAction = registers[conditional1] < conditional2; break;
        case '<=': doAction = registers[conditional1] <= conditional2;break;
        case '>=': doAction = registers[conditional1] >= conditional2; break;
    }

    if (registers[register] === undefined) {
        registers[register] = 0;
    }

    if (doAction) {
        const prev = registers[register];
        if (action == 'dec') {
            registers[register] -= actionValue;
        } else {
            registers[register] += actionValue;
        }
    }
}

const highestValue = Object.values(registers).reduce(function(a, b) {
    return Math.max(a, b);
});

console.log('Highest value', highestValue);