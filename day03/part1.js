
const getShellMax = function(shell) {
    // shell 1 = 
    //      1 * 2 = 2
    //      2 + 1 = 3
    //      3 ^ 2 = 9
    return Math.pow((shell * 2) + 1, 2);
};

const getCornerMovementChange = function(x, y) {
    let movement;
        if (x < 0 && y < 0) {
            movement = Moves.forward;
        } else if (x < 0 && y > 0) {
            movement = Moves.back;
        } else if (x > 0 && y > 0) {
            movement = Moves.back;
        } else if (x > 0 && y < 0) {
            movement = Moves.forward;
        }
    return movement;
};

const getCoords = function(end) {
    let i = 1,
    x = 0,
    y = 0,
    shell = 1,
    movement = Moves.forward,
    axis = Axis.X;

    while (i < end) {
        if (movement === Moves.forward) {
            if (axis === Axis.X) {
                x++;

                // hit the edge, change axis
                if (Math.abs(x) >= shell) {
                    axis = Axis.Y;
                }
            } else {
                // axis === Axis.Y
                y++;

                // hit the edge, change axis
                if (Math.abs(y) >= shell) {
                    axis = Axis.X;
                }
            }

            // corner, change direction
            if (Math.abs(x) === Math.abs(y)) {
                movement = getCornerMovementChange(x, y);
             }
        } else {
            if (axis === Axis.X) {
                x--;

                // hit the edge, change axis
                if (Math.abs(x) >= shell) {
                    axis = Axis.Y;
                }
            } else {
                // axis === Axis.Y
                y--;

                // hit the edge, change axis
                if (Math.abs(y) >= shell) {
                    axis = Axis.X;
                }
            }

            // corner, change direction
            if (Math.abs(x) === Math.abs(y)) {
               movement = getCornerMovementChange(x, y);
            }
        }

        i++;

        // advance to next shell
        if (i >= getShellMax(shell)) {
            shell++;

            // this feels dirty
            // the logic above ought to handle this change
            // but reset the state
            axis = Axis.X;
            movement = Moves.forward;
        }
    }

    return [x, y];
};

const getNumSteps = function(coords) {
    return Math.abs(coords[0]) + Math.abs(coords[1]);
};

// constants for movement and axis 
const 
    Moves = {
        forward: '+',
        back: '-',
    },

    Axis = {
        X: 'x',
        Y: 'y',
    };

// test values
let coords = getCoords(1),
    steps = getNumSteps(coords);
console.log('cords for ' + 1, coords, 'steps = ', steps);

coords = getCoords(12);
steps = getNumSteps(coords);
console.log('cords for ' + 12, coords, 'steps = ', steps);

coords = getCoords(23);
steps = getNumSteps(coords);
console.log('cords for ' + 23, coords, 'steps = ', steps);

coords = getCoords(1024);
steps = getNumSteps(coords);
console.log('cords for ' + 1024, coords, 'steps = ', steps);

// input value
coords = getCoords(277678);
steps = getNumSteps(coords);
console.log('cords for ' + 277678, coords, 'steps = ', steps);
