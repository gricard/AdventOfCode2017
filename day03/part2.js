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


const setValAtCoords = function(data, val, x, y) {
    if (typeof data !== 'object') {
        data = {};
    }

    if (typeof data[x] !== 'object') {
        data[x] = {};
    }

    data[x][y] = val;

    return data;
};

const ensureAdjacentValues = function(data, x, y) {
    if (typeof data !== 'object') data = {};
    if (typeof data[x] !== 'object') data[x] = {};
    if (typeof data[x + 1] !== 'object') data[x + 1] = [];
    if (typeof data[x - 1] !== 'object') data[x - 1] = [];

    if (!data[x + 1][y]) data[x + 1][y] = 0;
    if (!data[x + 1][y + 1]) data[x + 1][y + 1] = 0;
    if (!data[x][y + 1]) data[x][y + 1] = 0;
    if (!data[x - 1][y + 1]) data[x - 1][y + 1] = 0;
    if (!data[x - 1][y]) data[x - 1][y] = 0;
    if (!data[x - 1][y - 1]) data[x - 1][y - 1] = 0;
    if (!data[x][y - 1]) data[x][y - 1] = 0;
    if (!data[x + 1][y - 1]) data[x + 1][y - 1] = 0;

    return data;
}

const getSumFromAdjacentValues = function(data, x, y) {
    let sum = 0;

    data = ensureAdjacentValues(data, x, y);

    // fixed
    // gross... there should be a better way
    if (x === 0 && y === 0) return 1;
    if (x === 1 && y === 0) return 1;

    if (data[x + 1][y]) sum += data[x + 1][y];
    if (data[x + 1][y + 1]) sum += data[x + 1][y + 1];
    if (data[x][y + 1]) sum += data[x][y + 1];
    if (data[x - 1][y + 1]) sum += data[x - 1][y + 1];
    if (data[x - 1][y]) sum += data[x - 1][y];
    if (data[x - 1][y - 1]) sum += data[x - 1][y - 1];
    if (data[x][y - 1]) sum += data[x][y - 1];
    if (data[x + 1][y - 1]) sum += data[x + 1][y - 1];

    return sum;
};

const getVal = function(end) {
    let i = 1,
        last = 1,
        x = 0,
        y = 0,
        values = {0: {0: 1}},
        shell = 1,
        movement = Moves.forward,
        axis = Axis.X;

    while (last < end) {
        last = getSumFromAdjacentValues(values, x, y);
        values = setValAtCoords(values, last, x, y);

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

    return last;
};

console.log('val', getVal(277678));