const fs = require('fs');
let input = fs.readFileSync('input09.txt', 'utf8').split('\n').slice(0, -1);

// helper function for checking that everyhing is undefined
const everyIsUndefined = (arr) => {
  let counter = 0;
  arr.forEach(e => {
    if (e === undefined) counter++;
  })

  return counter
}

const preamble = (beginIndex, endIndex) => {
  let arrayForSearch;
  let goal;

  for(let i = beginIndex; i < endIndex; i++) {
    arrayForSearch = input.slice(beginIndex, endIndex);
    goal = parseInt(input[endIndex]);
  }

  const pero = twoSum(arrayForSearch, goal);
  const counter = everyIsUndefined(pero);
  
  if (counter === 25) {
    console.log("goal", goal);
  }

  part2(arrayForSearch, 26796446);
}

//part 2
const part2 = (array, goal) => {
  let sum = 0;

  let sumArray = [];
  array.forEach(e => {
    sum = sum + parseInt(e);
    sumArray.push(parseInt(e));
    if (sum == goal) {
      findMinMax(sumArray);
    }
  })
}

//part 2
const findMinMax = (array) => {
  let min = Math.min(...array);
  let max = Math.max(...array);

  console.log("min",min);
  console.log("max",max);
  console.log("result",min + max);
}

//part 1
const twoSum = (array, goal) => {
  let mapOfNumbers = {};
  let twoIndexes = [];

  for (let i = 0; i < array.length; i++) {
    mapOfNumbers[array[i]] = i;
  }

  for (let i = 0; i < array.length; i++) {
    let target = goal - array[i];
    if(mapOfNumbers[target] !== null && mapOfNumbers[target] !== i) {
      twoIndexes.push(i);
      twoIndexes.push(mapOfNumbers[target]);
    }
  }

  return twoIndexes;
}

for (let i = 0; i < input.length; i++) {
  preamble(i, i+25);
}
