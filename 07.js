const fs = require('fs');
let input = fs.readFileSync("./inputs/07.txt", 'utf8').split(',').map(Number);

let smallest = 10000000000000;

// part 1
/*
input.forEach(number => {
  let outcome = 0;
  input.forEach(e => {
    let diff = Math.abs(e - number);

    outcome = outcome + diff;
  })

  if (outcome < smallest) {
    smallest = outcome;
  }
})

console.log("smallest", smallest);
*/

// part 2
const defineStep = (distance) => {
  let step = 0;
  let value = 0;
  for (let i = 1; i <=distance; i++) {
    step = step + 1;
    value = value + step;
  }

  return value;
}

let max = Math.max(...input);

for (let i = 1; i<= max; i++) {
  let result = 0;
  input.forEach(number => {
    let outcome = 0;

    let diff = Math.abs(i - number);

    outcome = outcome + defineStep(diff);
    result = result + outcome;
  })

  if (result < smallest) {
    smallest = result;
  }
}

console.log("smallest", smallest);
