const fs = require('fs');

let input = fs.readFileSync('input02.txt', 'utf8').split('\n').slice(0, -1);
let counter = 0;

// part 1
passwordPolicy = (lowestNumber, highestNumber, letter, password) => {
  let filteredArray = password.split('').filter(sign => sign == letter);

  if (filteredArray.length >= lowestNumber && filteredArray.length <= highestNumber) {
    counter++;
  }
}

// part 2
positionValidation = (position1, position2, letter, password) => {
  if (password[position1 - 1] == letter && password[position2 - 1] == letter) {
  }
  else if (password[position1 - 1] != letter && password[position2 - 1] != letter) {
  }
  else {
    counter++;
  }
}

input.forEach(element => {
  let range = element.split(' ')[0];

  const lowestNumber = parseInt(range.split('-')[0]);
  const highestNumber = parseInt(range.split('-')[1]);
  const letter = element.split(' ')[1].split(':')[0];
  const password = element.split(' ')[2];

  //passwordPolicy(lowestNumber, highestNumber, letter, password);
  positionValidation(lowestNumber, highestNumber, letter, password);

  console.log("counter", counter);
})
