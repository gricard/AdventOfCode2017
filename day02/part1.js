/**
 * Calculate checksum as sum of the difference of each row's highest and lowest digit
 * 
 * @param {string} data input text (space-separated list of digits per line)
 * @returns {int}
 */
const checksumSpreadsheet = function(data) {
    const lineSeparator = "\n",
        digitSeparator = "\t",
        lines = data.split(lineSeparator);
    let checksum = 0;

    for (let i = 0; i < lines.length; i++) {
        const numbers = lines[i].trim().split(digitSeparator);
        let lowestNum = 0,
            highestNum = 0;

        for (let j = 0; j < numbers.length; j++) {
            const num = parseInt(numbers[j]);

            if (lowestNum < 1 || num < lowestNum) {
                lowestNum = num;
            }

            if (highestNum < 1 || num > highestNum) {
                highestNum = num;
            }
        }

        const diff = highestNum - lowestNum;
        checksum += diff;
    }

    return checksum;
}



// read the input file and process it
fs = require('fs');

fs.readFile('./input.txt', 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }

  const checksum = checksumSpreadsheet(data);
  console.log("The checksum is: ", checksum);
});


// const testIt = function() {
//     const data = "5\t1\t9\t5\n7\t5\t3\n2\t4\t6\t8";
//     const checksum = checksumSpreadsheet(data);
//     console.log("The test checksum is: ", checksum);
// }

// testIt();