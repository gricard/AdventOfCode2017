/**
 * Add together any numbers that occur next to each other in the string 
 * 
 * @param {string} data string of numbers
 */
const sumOfAdjacentNumerals = function (data) {
    let sum = 0,
        first = parseInt(data[0]),
        last = null,
        count = data.length;

    for (let i = 0; i < count; i++) {
        let item = parseInt(data[i]);

        // add adjacent digits to the sum
        if (last === item) {
            sum += item;
        }

        last = item;
    }

    // the list is a loop, so also check if the first and last match
    if (last === first) {
        sum += last;
    }

    return sum;
};


// read the input file and process it
fs = require('fs');

fs.readFile('./input.txt', 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }

  const answer = sumOfAdjacentNumerals(data);
  console.log("The answer is: ", answer);
});
