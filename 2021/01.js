const fs = require('fs');
let input = fs.readFileSync("./inputs/01.txt", 'utf8').split('\n').slice(0, -1).map(Number);

let part1 = 0;
let part2 = 0;

// part 1
for(let i = 1; i <= input.length; i++) {
  if (input[i] > input[i -1]) {
    part1++;
  } 
}

// part 2
let initialSum = input[0] + input[1] + input[2];

for(let i = 1; i <= input.length - 2; i++) {
  let sum = input[i] + input[i + 1] + input[i + 2];
  
  if (sum > initialSum) {
    part2++;
  }

  initialSum = sum;
}

console.log("part 1", part1);
console.log("part 2", part2);
