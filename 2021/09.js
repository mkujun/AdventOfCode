const fs = require('fs');
let input = fs.readFileSync("./inputs/09.txt", 'utf8').split('\n').slice(0, -1);

let result = 0;
let matrix = [];
let lowPoints = [];
let perica = [];

// part 1, find lowPoints
for(let i = 0; i < input.length; i++) {
  // first row
  matrix.push(input[i].split('').map(Number));
  if (i == 0) {
    let row1 = input[0].split('').map(Number);
    let row2 = input[1].split('').map(Number);

    for (let j = 0; j < row1.length; j++) {
      // first element
      if (j == 0) {
        if (row1[j] < row1[j + 1] && row1[j] < row2[j]) {
          result = result + 1 + row1[j];
          lowPoints.push({
            point: row1[j],
            i,j
          });
        }
      }
      // last element
      else if (j == row1.length - 1) {
        if (row1[j] < row1[j - 1] && row1[j] < row2[j]) {
          result = result + 1 + row1[j];
          lowPoints.push({
            point: row1[j],
            i,j
          });
        }
      }
      // middle element
      else {
        if (row1[j] < row1[j - 1] && row1[j] < row1[j + 1] && row1[j] < row2[j]) {
          result = result + 1 + row1[j];
          lowPoints.push({
            point: row1[j],
            i,j
          });
        }
      }
    }
  }

  // last row
  else if (i == input.length - 1) {
    let row1 = input[input.length - 2].split('').map(Number);
    let row2 = input[input.length - 1].split('').map(Number);
    
    for(let j = 0; j < row2.length; j++) {
      if (j == 0) {
        if (row2[j] < row2[j + 1] && row2[j] < row1[j]) {
          result = result + 1 + row2[j];
          lowPoints.push({
            point: row2[j],
            i,j
          });
        }
      }
      else if (j == row2.length - 1) {
        if (row2[j] < row2[j - 1] && row2[j] < row1[j]) {
          result = result + 1 + row2[j];
          lowPoints.push({
            point: row2[j],
            i,j
          });
        }
      }
      else {
        if (row2[j] < row2[j - 1] && row2[j] < row2[j + 1] &&
          row2[j] < row1[j]
        ) {
          result = result + 1 + row2[j];
          lowPoints.push({
            point: row2[j],
            i,j
          });
        }
      }
    }
  }
  
  // middle element
  else{
    let row1 = input[i - 1].split('').map(Number);
    let row2 = input[i].split('').map(Number);
    let row3 = input[i + 1].split('').map(Number);

    for(let j = 0; j < row2.length; j++) {
      if (j == 0) {
        if (row2[j] < row2[j + 1] &&
          row2[j] < row1[j] &&
          row2[j] < row3[j]
        ){
          result = result + 1 + row2[j];
          lowPoints.push({
            point: row2[j],
            i,j
          });
        }
      }
      else if (j == row2.length - 1) {
        if (row2[j] < row2[j - 1] &&
          row2[j] < row1[j] &&
          row2[j] < row3[j]
        ){
          result = result + 1 + row2[j];
          lowPoints.push({
            point: row2[j],
            i,j
          });
        }
      }
      else {
        if (row2[j] < row2[j - 1] && row2[j] < row2[j + 1] &&
          row2[j] < row1[j] &&
          row2[j] < row3[j]
        ) {
          result = result + 1 + row2[j];
          lowPoints.push({
            point: row2[j],
            i,j
          });
        }
      }
    }
  }
}

// part 2
let pointsToFind = [];
let visited = [];

const isVisited = (point) => {
  let val = false;

  visited.forEach(e => {
    if (JSON.stringify(e) == JSON.stringify(point)) {
      val = true;
    }
  })

  return val;
}

const isInPointsToFind = (point) => {
  let val = false;

  pointsToFind.forEach(e => {
    if (JSON.stringify(e) == JSON.stringify(point)) {
      val = true;
    }
  })

  return val;
}

const findPointsAround = (point) => {
  let isPointVisited = isVisited(point);
  if (!isPointVisited) {
    visited.push(point);
  }

  let {i} = point;
  let {j} = point;

  let pointLeft = null;
  let pointRight = null;
  let pointBelow = null;
  let pointAbove = null;

  // upper left corner
  if (i == 0 && j == 0) {
    pointRight = {
      point: matrix[i][j + 1],
      i: i,
      j: j + 1
    }
    pointBelow = {
      point: matrix[i + 1][j],
      i: i + 1,
      j: j
    }
  }

  // upper right corner
  if (i == 0 && j == matrix[i].length - 1) {
    pointLeft = {
      point: matrix[i][j - 1],
      i: i,
      j: j - 1
    }
    pointBelow = {
      point: matrix[i + 1][j],
      i: i + 1,
      j: j
    }
  }

  // first row middle
  if (i == 0 && j != 0) {
    pointLeft = {
      point: matrix[i][j - 1],
      i: i,
      j: j - 1
    }
    pointRight = {
      point: matrix[i][j + 1],
      i: i,
      j: j + 1
    }
    pointBelow = {
      point: matrix[i + 1][j],
      i: i + 1,
      j: j
    }
  }

  // middle of matrix
  if (i != 0 && j != 0) {
    pointLeft = {
      point: matrix[i][j - 1],
      i: i,
      j: j - 1
    }
    pointRight = {
      point: matrix[i][j + 1],
      i: i,
      j: j + 1
    }
    if (matrix[i + 1] != undefined) {
      pointBelow = {
        point: matrix[i + 1][j],
        i: i + 1,
        j: j
      }
    }
    pointAbove = {
      point: matrix[i - 1][j],
      i: i - 1,
      j: j
    }
  }

  // first column
  if (j == 0 && i > 0) {
    pointRight = {
      point: matrix[i][j + 1],
      i: i,
      j: j + 1
    }
    if (matrix[i + 1] != undefined) {
      pointBelow = {
        point: matrix[i + 1][j],
        i: i + 1,
        j: j
      }
    }
    pointAbove = {
      point: matrix[i - 1][j],
      i: i - 1,
      j: j
    }
  }

  // last row
  if (i == matrix[i].length - 1 && j > 0) {
    pointLeft = {
      point: matrix[i][j - 1],
      i: i,
      j: j - 1
    }
    pointRight = {
      point: matrix[i][j + 1],
      i: i,
      j: j + 1
    }
    pointAbove = {
      point: matrix[i - 1][j],
      i: i - 1,
      j: j
    }
  }

  // last row begining
  if (i == matrix[i].length - 1 && j == 0) {
    pointRight = {
      point: matrix[i][j + 1],
      i: i,
      j: j + 1
    }
    pointAbove = {
      point: matrix[i - 1][j],
      i: i - 1,
      j: j
    }
  } 

  // last row end
  if (i == matrix[i].length - 1 && j == matrix[j].length - 1) {
    pointLeft = {
      point: matrix[i][j - 1],
      i: i,
      j: j - 1
    }
    pointAbove = {
      point: matrix[i - 1][j],
      i: i - 1,
      j: j
    }
  } 


  if (pointLeft !== null && pointLeft.point !== 9) {
    let isPointInPointsToFind = isInPointsToFind(pointLeft);
    if (!isPointInPointsToFind) {
      if (pointLeft.point != undefined) {
        let isPointVisited = isVisited(pointLeft);
        if (!isPointVisited) {
          pointsToFind.push(pointLeft);
        }
      }
    }
  }
  if (pointBelow !== null && pointBelow.point !== 9) {
    let isPointInPointsToFind = isInPointsToFind(pointBelow);
    if (!isPointInPointsToFind) {
      if (pointBelow.point != undefined) {
        let isPointVisited = isVisited(pointBelow);
        if (!isPointVisited) {
          pointsToFind.push(pointBelow);
        }
      }
    }
  }
  if (pointRight !== null && pointRight.point !== 9) {
    let isPointInPointsToFind = isInPointsToFind(pointRight);
    if (!isPointInPointsToFind) {
      if (pointRight.point != undefined) {
        let isPointVisited = isVisited(pointRight);
        if (!isPointVisited) {
          pointsToFind.push(pointRight);
        }
      }
    }
  }
  if (pointAbove !== null && pointAbove.point !== 9) {
    let isPointInPointsToFind = isInPointsToFind(pointAbove);
    if (!isPointInPointsToFind) {
      if (pointAbove.point != undefined) {
        let isPointVisited = isVisited(pointAbove);
        if (!isPointVisited) {
          pointsToFind.push(pointAbove);
        }
      }
    }
  }

  if (pointsToFind.length == 0) {
    perica.push(visited.length);
  }

  if (pointsToFind.length > 0) {
    let pero = pointsToFind.shift();
    findPointsAround(pero);
  }
}

lowPoints.forEach(p => {
  pointsToFind = [];
  visited = [];
  pointsToFind.push(p);
  findPointsAround(pointsToFind[0]);
})

perica.sort();
perica.forEach(p => {
  console.log(p);
})

// when sorting perica above this are to top values
console.log("result ", 106 * 92 * 94);
