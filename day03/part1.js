
const getShellMax = function(shell) {
    // shell 1 = 
    //      1 * 2 = 2
    //      2 + 1 = 3
    //      3 ^ 2 = 9
    return Math.pow((shell * 2) + 1, 2);
}

const getCoords = function(end) {
    let i = 1,
    x = 0,
    y = 0,
    shell = 1,
    movement = Moves.forward,
    axis = Axis.X;

    while (i < end) {
        //console.log('');
        //console.log(i + ' ' + x + ', ' + y);
        //console.log('   shell', shell, 'dir', movement, 'axis', axis);

        if (movement === Moves.forward) {
            //console.log(' > fwd');
            if (axis === Axis.X) {
                x++;
                //console.log('  > next coord = ' + x + 'x' + y);

                // hit the edge, change axis
                if (Math.abs(x) >= shell) {
                    axis = Axis.Y;
                    //console.log('    > change axis', axis);
                }
            } else {
                // axis === Axis.Y
                y++;
                //console.log('  > next coord = ' + x + 'x' + y);

                // hit the edge, change axis
                if (Math.abs(y) >= shell) {
                    axis = Axis.X;
                    //console.log('    > change axis', axis);
                }
            }

            //console.log('abs x, y', Math.abs(x),Math.abs(y));
            // corner, change direction
            if (Math.abs(x) === Math.abs(y)) {
                if (x < 0 && y < 0) {
                    movement = Moves.forward;
                } else if (x < 0 && y > 0) {
                    movement = Moves.back;
                } else if (x > 0 && y > 0) {
                    movement = Moves.back;
                } else if (x > 0 && y < 0) {
                    movement = Moves.forward;
                }
                //console.log('    > change direction', movement);
            }
        } else {
            //console.log(' > back');
            if (axis === Axis.X) {
                x--;
                //console.log('  > next coord = ' + x + 'x' + y);

                // hit the edge, change axis
                if (Math.abs(x) >= shell) {
                    axis = Axis.Y;
                    //console.log('    > change axis', axis);
                }
            } else {
                // axis === Axis.Y
                y--;
                //console.log('  > next coord = ' + x + 'x' + y);

                // hit the edge, change axis
                if (Math.abs(y) >= shell) {
                    axis = Axis.X;
                    //console.log('    > change axis', axis);
                }
            }

            //console.log('abs x, y', Math.abs(x),Math.abs(y));
            // corner, change direction
            if (Math.abs(x) === Math.abs(y)) {
                if (x < 0 && y < 0) {
                    movement = Moves.forward;
                } else if (x < 0 && y > 0) {
                    movement = Moves.back;
                } else if (x > 0 && y > 0) {
                    movement = Moves.back;
                } else if (x > 0 && y < 0) {
                    movement = Moves.forward;
                }
                //console.log('    > change direction', movement);
            }
        }

        i++;

        if (i >= getShellMax(shell)) {
            //console.log('INCREMENT SHELL');
            shell++;
            axis = Axis.X;
            movement = Moves.forward;
        }
    }

    return [x, y];
};

const getNumSteps = function(coords) {
    return Math.abs(coords[0]) + Math.abs(coords[1]);
}

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
