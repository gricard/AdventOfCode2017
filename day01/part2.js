/**
 * Calculate the array index of this number's opposite
 * 
 * @param {int} position 
 * @param {int} length 
 * @param {int} offset 
 */
const getOppositeIndex = function(position, length, offset) {
    let index = position + offset;
    if (index >= length) {
        return index - length;
    } else {
        return index;
    }
};

/**
 * Add together any numbers that occur opposite each other in the list
 * Opposite meaning position + (listLength / 2)
 * 
 * @param {string} data string of numbers
 */
const sumOfOppositeNumerals = function (data) {
    let sum = 0;
    const first = parseInt(data[0]),
        count = data.length,
        halfCount = count / 2;

    for (let i = 0; i < count; i++) {
        let numeral = parseInt(data[i]),
            oppositeIndex = getOppositeIndex(i, count, halfCount),
            opposite = parseInt(data[oppositeIndex]);

        // add opposite digits to the sum
        if (opposite === numeral) {
            sum += numeral;
        }
    }

    return sum;
};


// read the input file and process it
fs = require('fs');

fs.readFile('./input.txt', 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }

  const answer = sumOfOppositeNumerals(data);
  console.log("The answer to part II is: ", answer);
});


// const testInputs = function() {
//     console.log("1212", sumOfOppositeNumerals("1212"));
//     console.log("1221", sumOfOppositeNumerals("1221"));
//     console.log("123425", sumOfOppositeNumerals("123425"));
//     console.log("123123", sumOfOppositeNumerals("123123"));
//     console.log("12131415", sumOfOppositeNumerals("12131415"));
// };
// 
// testInputs();