const fs = require('fs');
let input = fs.readFileSync("./inputs/03.txt", 'utf8').split('\n').slice(0, -1);

const length = input[0].length;

let gamma = '';
let epsilon = '';

const readColumn = (index) => {
  let one = 0;
  let zero = 0;

  input.forEach(row => {
    let num = parseInt(row.charAt(index));

    if (num == 0) {
      zero++;
    }
    else if (num == 1) {
      one++;
    }
  })

  if (one > zero) {
    gamma = gamma + "1";
    epsilon = epsilon + "0";
  }
  else if (one < zero) {
    gamma = gamma + "0";
    epsilon = epsilon + "1";
  }
}

for (let i = 0; i<length; i++){
  readColumn(i);
}

console.log("part 1", parseInt(gamma, 2) * parseInt(epsilon, 2));

// part 2
const moreOnesOrZeroesInColumn = (index, arr, type) => {
  let one = 0;
  let zero = 0;

  arr.forEach(row => {
    if (parseInt(row.charAt(index)) == '0') {
      zero++;
    }
    else {
      one++;
    }
  })

  if (type == "0xygen") {
    if (one > zero) {
      return 1;
    }
    else if (one < zero) {
      return 0;
    }
    else if (one == zero) {
      return 1;
    }
  }
  else if (type == "CO2") {
    if (one > zero) {
      return 0;
    }
    else if (one < zero) {
      return 1;
    }
    else if (one == zero) {
      return 0;
    }
  }
}

let oxygenGenerator = input;
let co2Generator = input;

for (let i = 0; i < length; i++) {
  let oxygenDigit = moreOnesOrZeroesInColumn(i, oxygenGenerator, "0xygen");
  let co2Digit = moreOnesOrZeroesInColumn(i, co2Generator, "CO2");;
  
  if (oxygenGenerator.length > 1) {
    oxygenGenerator = oxygenGenerator.filter(d => d.charAt(i) == oxygenDigit);
  }

  if (co2Generator.length > 1) {
    co2Generator = co2Generator.filter(d => d.charAt(i) == co2Digit);
  }
}

console.log("part 2", parseInt(oxygenGenerator, 2) * parseInt(co2Generator, 2));
