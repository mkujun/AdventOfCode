const fs = require('fs');
let input = fs.readFileSync('input08.txt', 'utf8').split('\n').slice(0, -1);

let accumulator = 0;
let nextJump = 0;

let element;
let split;
let command;
let value;
//let run = true;
//let visited = new Array(input.length).fill(false);

/*
do {
  element = input[nextJump];
  split = element.split(" ");
  command = split[0];
  value = split[1];

  if (command == "nop") {
    if (visited[nextJump]) {
      run = false;
    }
    else {
      visited[nextJump] = true;
      nextJump++;
    }
  }
  else if (command == "acc") {
    if (visited[nextJump]) {
      run = false;
    }
    else {
      visited[nextJump] = 1;
      nextJump++;
      accumulator = accumulator + parseInt(value);
    }
  }
  else if (command == "jmp") {
    if (visited[nextJump]) {
      run = false;
    }
    else {
      visited[nextJump] = 1;
      nextJump = nextJump + parseInt(value);
    }
  }
} while (run);

console.log("acc", accumulator);
*/

// part 2

// polje svih 'nop' indexa
let noopsIndex = [];
let jmpsIndex = [];

input.forEach(row => {
  split = row.split(" ");
  command = split[0];
  value = split[1];

  if (command === "nop") {
    noopsIndex.push(input.indexOf(row));
  }
  else if (command === "jmp") {
    jmpsIndex.push(input.indexOf(row));
  }
})

const part2 = (arr, index) => {
  let row = arr[index];

  if (index >= arr.length) {
    console.log("accumulator", accumulator);
    return true;
  }

  split = row.split(" ");
  command = split[0];
  value = split[1];

  if (visited[index]) {
    return false;
  }

  else if (command == "nop") {
    visited[index] = true;
    index++;
    return part2(arr, index);
  }

  else if (command == "acc") {
    visited[index] = true;
    index++;
    accumulator = accumulator + parseInt(value);
    return part2(arr, index, accumulator);
  }
  else if (command == "jmp") {
    visited[index] = true;
    index = index + parseInt(value);
    return part2(arr, index);
  }
}

let visited = new Array(input.length).fill(false);

jmpsIndex.forEach(i => {
  let arr = [...input];

  visited = new Array(input.length).fill(false);
  accumulator = 0;

  let replacement = arr[i];
  let change = replacement.replace("jmp", "nop");

  arr[i] = change;
  
  part2(arr, 0);
})
