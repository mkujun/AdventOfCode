const fs = require('fs');

let input = fs.readFileSync('input03.txt', 'utf8').split('\n').slice(0,-1);
let matrix = [];

putInputRowIntoMatrix = (inputRow) => {
  let row = [];
  
  inputRow.split('').forEach(letter => row.push(letter));

  matrix.push(row);
}

input.forEach(row => {
  putInputRowIntoMatrix(row);
})

traverseMatrix = (matrix, rightStep) => {
  let counter = 0;
  let rowCounter = 0;

  matrix.forEach(row => {
    if (row[rowCounter] == '#') {
      counter++;
    }

    for (let i = 0; i<rightStep; i++) {
      rowCounter++;
      if (rowCounter == 31) {
        rowCounter = 0;
      }
    }
  })

  return counter;
}

traverseMatrixTwoDown = (matrix, rightStep) => {
  let counter = 0;
  let rowCounter = 0;

  matrix.forEach(row => {
    if (matrix.indexOf(row) % 2 == 0) {
      if (rowCounter == 31) {
        rowCounter = 0;
      }
      if (row[rowCounter] == '#') {
        counter++;
      }
      rowCounter++;
    }
  })

  return counter;
}

let rightOneDownOne = traverseMatrix(matrix, 1);
let rightThreeDownOne = traverseMatrix(matrix, 3);
let rightFiveDownOne = traverseMatrix(matrix, 5);
let rightSevenDownOne = traverseMatrix(matrix, 7);
let rightOneDownTwo = traverseMatrixTwoDown(matrix, 1);

console.log("result ", rightThreeDownOne * rightOneDownOne * rightFiveDownOne * rightSevenDownOne * rightOneDownTwo);
