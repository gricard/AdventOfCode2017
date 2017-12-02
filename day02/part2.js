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

    // loop over all lines
    for (let i = 0; i < lines.length; i++) {
        const numbers = lines[i].trim().split(digitSeparator);
        let divisionResult;

        // loop over each number on this line
        for (let j = 0; j < numbers.length; j++) {
            const num = parseInt(numbers[j]);
            divisionResult = 0;

            // loop over all the rest of the numbers in this line and find evenly divisble ones
            for (let k = 0; k < numbers.length; k++) {
                // ignore same number
                if (k === j) {
                    continue;
                }

                const num2 = parseInt(numbers[k]);

                if (num > num2) {
                    divisionResult = num / num2;
                } else {
                    divisionResult = num2 / num;                    
                }

                // if it is non-zero and divides evenly, we found a match
                if (divisionResult > 0 && Math.trunc(divisionResult) === divisionResult) {
                    break;
                } else {
                    divisionResult = 0;
                }
            }

            // got a match
            if (divisionResult) {
                break;
            }
        }

        checksum += divisionResult;
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
//     const data = "5\t9\t2\t8\n9\t4\t7\t3\n3\t8\t6\t5";
//     const checksum = checksumSpreadsheet(data);
//     console.log("The test checksum is: ", checksum);
// }
// testIt();