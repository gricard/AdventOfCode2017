/**
 * Kinda cheating and treating the hex grid as a regular grid
 * sw -> ne = X
 * nw -> se = Y
 * and north/south moves are diagonal 
 * 
 * @param {*} input 
 */
const getCoords = (input) => {
    const coords = {
        x: 0,
        y: 0,
    };
    let x = 0,
        y = 0;
    
    for (let i = 0; i < input.length; i++) {
        switch (input[i]) {
            case 'n': 
                y++;
                x++;
                break;

            case 's':
                x--;
                y--;
                break;
            
            case 'ne':
                x++;
                break;
            
            case 'nw':
                y++;
                break;

            case 'se':
                y--;
                break;
            
            case 'sw':
                x--;
                break;
        }
    }
    
    coords.y = y;
    coords.x = x;

    return coords;
}

const calcDistance = (coords) => {
    if (coords.x === 0) {
        return Math.abs(coords.y);
    }

    if (coords.y === 0) {
        return Math.abs(coords.x);
    }

    if (Math.max(coords.x, coords.y) === Math.min(coords.x, coords.y)) {
        // equal distance,  it's a diagonal move
        return Math.abs(coords.x);
    }

    const absX = Math.abs(coords.x),
        absY = Math.abs(coords.y),
        min = Math.min(absX, absY),
        max = Math.max(absX, absY);

    let distance = min + (max - min);

    return distance;
}

const getFurthestDistance = (directions) => {
    let maxDistance = 0;

    for (let i = 0; i < directions.length; i++) {
        let coords = getCoords(directions.slice(0, i)),
            curDistance = calcDistance(coords);
        if (curDistance > maxDistance) {
            maxDistance = curDistance;
        }
    }

    return maxDistance;
}


// tests
const testInputs = [
    "ne,ne,ne",
    "ne,ne,sw,sw",
    "ne,ne,s,s",
    "se,sw,se,sw,sw"
];

for (let i = 0; i < testInputs.length; i++) {
    let directions = testInputs[i].split(',');
    console.log('Max distance for test "' + testInputs[i] + ' = ' + getFurthestDistance(directions));
}

// main 
fs = require('fs');
const input = fs.readFileSync('./input.txt');
    directions = (new String(input)).split(',');
console.log('Max distance = ' + getFurthestDistance(directions));
