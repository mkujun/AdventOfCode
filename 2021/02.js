const fs = require('fs');
let input = fs.readFileSync("./inputs/02.txt", 'utf8').split('\n').slice(0, -1);

let horizontalPosition = 0;
let depth = 0;
let aim = 0;

//part 1
input.forEach(i => {
  let direction = i.split(" ")[0];
  let value = parseInt(i.split(" ")[1]);

  if (direction == "forward") {
    horizontalPosition = horizontalPosition + value;
  }
  else if (direction == "down") {
    depth = depth + value;
  }
  else if (direction == "up") {
    depth = depth - value;
  }
})

console.log("result part 1", horizontalPosition * depth);

// part 2
input.forEach(i => {
  let direction = i.split(" ")[0];
  let value = parseInt(i.split(" ")[1]);

  if (direction == "forward") {
    horizontalPosition = horizontalPosition + value;
    depth = depth + (aim * value);
  }
  else if (direction == "down") {
    aim = aim + value;
  }
  else if (direction == "up") {
    aim = aim - value;
  }
})

console.log("result part 2", horizontalPosition * depth);
