const fs = require('fs');

let input = fs.readFileSync('input06.txt', 'utf8').split('\n');

let test = [];
let sum = 0;

// part 1
input.forEach(row => {
  if (row == "") {
    const uniqueSet = new Set(test);

    sum = sum + [...uniqueSet].length;
    
    test = [];
  }
  else {
    let pero = row.split("");
    pero.forEach(element => {
      test.push(element);
    })
  }
})

// part 2
let sets = [];

input.forEach(row => {
  if (row == '') {

    let result = sets.reduce((a,b) => a.filter(c => b.includes(c)));
    sum = sum + result.length;

    sets = [];
  }
  else {
    sets.push(row.split(""));
  }
})

// sum outputs result for both parts
//console.log("sum", sum);
