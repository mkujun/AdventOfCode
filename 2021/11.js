const fs = require('fs');
let input = fs.readFileSync("./inputs/11.txt", 'utf8').split('\n').slice(0, -1);
let matrix = [];
let flashes = [];
let part1 = 0;

input.forEach(row => {
  matrix.push(row.split('').map(Number));
})

const print = () => {
  matrix.forEach(row => {
    console.log(JSON.stringify(row));
  })
}

increaseByOne = () => {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      matrix[i][j] = matrix[i][j] + 1;
    }
  }
}

findFlashes = () => {
  part1 = part1 + flashes.length;
  flashes = [];

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      if(matrix[i][j] >= 10) {
        matrix[i][j] = 0;
        flashes.push({i,j});
      }
    }
  }
}

increasePointsAroundFlash = () => {
  flashes.forEach(flash => {
    let {i,j} = flash;

    let pointsAround = [];

    pointsAround.push({i: i, j: j - 1})
    pointsAround.push({i: i, j: j + 1})
    pointsAround.push({i: i - 1, j: j})
    pointsAround.push({i: i + 1, j: j})
    pointsAround.push({i: i - 1, j: j - 1})
    pointsAround.push({i: i - 1, j: j + 1})
    pointsAround.push({i: i + 1, j: j - 1})
    pointsAround.push({i: i + 1, j: j + 1})

    pointsAround.forEach(point => {
      let {i,j} = point;

      if (i >= 0 && i < 10 && j >=0 && j < 10) {
        if (matrix[i][j] != 0) {
          matrix[i][j] = matrix[i][j] + 1;
        }
      }
    })
  })
}

// part 2
allFlash = (step) => {
  let allZeroes = true;

  for(let i=0; i <10; i++) {
    for(let j=0; j <10; j++) {
      if (matrix[i][j] != 0) {
        allZeroes = false;
      }
    }
  }

  if (allZeroes) {
    console.log("step", step);
  }
}

for (k = 1; k <= 300; k++) {
  increaseByOne();

  do{
    findFlashes();
    increasePointsAroundFlash();
  } while (flashes.length > 0)

  allFlash(k);
}

console.log("result", part1);
