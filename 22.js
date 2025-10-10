const fs = require('fs');
let input = fs.readFileSync("./inputs/22.txt", 'utf8').split('\n').slice(0, -1);
//let input = fs.readFileSync("input.txt", 'utf8').split('\n').slice(0, -1);

let cubes = new Map();

const parseRow = (row) => {
  let onOff = row.split(" ")[0];
  let vals = row.split(" ")[1];
  let x = vals.split(",")[0].split("x=")[1].split("..").map(Number);
  let y = vals.split(",")[1].split("y=")[1].split("..").map(Number);
  let z = vals.split(",")[2].split("z=")[1].split("..").map(Number);

  return { x, y, z, onOff }
}

const step = (vals) => {
  let {x,y,z,onOff} = vals;

  for (let i = x[0]; i <= x[1]; i++) {
    for (let j = y[0]; j <= y[1]; j++) {
      for (let k = z[0]; k <= z[1]; k++) {
        let row = i + "," + j + "," + k;
        
        if (!cubes.has(row) && onOff=="on") {
          cubes.set(row, row);
        }
        else if (cubes.has(row) && onOff=="off") {
          cubes.delete(row);
        }
      }
    }
  }
}

const inRange = (val) => {
  if (val.x[0] >= -50 && val.x[1] <= 50 &&
      val.y[0] >= -50 && val.y[1] <= 50 &&
      val.z[0] >= -50 && val.z[1] <= 50)
  {
    return true;
  }
  else {
    return false;
  }
}

input.forEach(i => {
  let row = parseRow(i);
  let isInRange = inRange(row);
  if (isInRange) {
    step(row);
  }
})

console.log(cubes.size);
