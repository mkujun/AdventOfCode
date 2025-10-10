const fs = require('fs');
let input = fs.readFileSync('input10.txt', 'utf8').split('\n').slice(0, -1);

// add min and max voltage
input.push("0");
input.sort((a, b) => a - b);
input.push(parseInt(input[input.length - 1]) + 3);

let counter1 = 0;
let counter2 = 0;
let counter3 = 0;

const difference = (a,b) => {
  let diff;

  if (a != undefined && b != undefined) {
    diff = b - a;

    if (diff == 3) {
      counter3++;
    }
    else if (diff == 2) {
      counter2++;
    }
    else if (diff == 1) {
      counter1++;
    }
  }
  else { diff = 0};
}

for(let i = 0; i < input.length; i++) {
  difference(input[i], input[i + 1]);
}

//console.log("1", counter1);
//console.log("2", counter2);
//console.log("3", counter3);
console.log("result: ", counter3 * counter1);
