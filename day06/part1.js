
const getNumCyclesBeforeLoop = function(banks) {
    const seenValues = [];
    let cycles = 1,
        currentValue = '';

    while (seenValues.indexOf(currentValue) === -1) {
        let maxBank = Math.max.apply(this, banks),
            maxBankNum = banks.indexOf(maxBank),
            i = maxBankNum + 1 >= banks.length ? 0 : maxBankNum + 1;

            // console.log('maxBank', maxBank, 'maxBankNum', maxBankNum, 'i', i);
        
        // empty out the bank with the highest #
        banks[maxBankNum] = 0;

        while (maxBank > 0) {
            // distribute a block
            banks[i]++;
            maxBank--;
            
            // move to next bank
            i++;
            // wrap around to the first bank
            if (i >= banks.length) {
                i = 0;
            }
        }

        // console.log('banks now', banks);

        const value = banks.join();

        if (seenValues.indexOf(value) !== -1) {
            break;
        }

        seenValues.push(value);
        cycles++;
    }

    return cycles;

}

// // test run
const testInput = [0, 2, 7, 0];
console.log('# cycles before loop: ' + getNumCyclesBeforeLoop(testInput));

// actual run
fs = require('fs');

const input = fs.readFileSync('./input.txt'),
    banks = (new String(input)).trim().split("\t").map((num) => parseInt(num)),
    cycles = getNumCyclesBeforeLoop(banks);

console.log('# cycles before loop: ' + cycles);