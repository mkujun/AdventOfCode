const fs = require('fs');
let input = fs.readFileSync("./inputs/06.txt", 'utf8').split(',').map(Number);

// part 1
/*
for(let i = 1; i <=80; i++) {
  input.forEach((e, index) => {

    if (input[index] == 0) {
      input.push(8);
      input[index] = 6;
    }
    else {
      input[index] = input[index] - 1;
    }
  })
}

console.log(input.length);
*/

// part 2
let mapa = new Map();

mapa.set(0, 0);
mapa.set(1, 0);
mapa.set(2, 0);
mapa.set(3, 0);
mapa.set(4, 0);
mapa.set(5, 0);
mapa.set(6, 0);
mapa.set(7, 0);
mapa.set(8, 0);

// map filling
input.forEach(e => {
  if (mapa.has(e)) {
    let counter = mapa.get(e);
    mapa.set(e, counter + 1);
  }
})

for(let i = 1; i <=256; i++) {
  let zero = mapa.get(0);
  let one = mapa.get(1);
  let two = mapa.get(2);
  let three = mapa.get(3);
  let four = mapa.get(4);
  let five = mapa.get(5);
  let six = mapa.get(6);
  let seven = mapa.get(7);
  let eight = mapa.get(8);

  mapa.set(0, one);
  mapa.set(1, two);
  mapa.set(2, three);
  mapa.set(3, four);
  mapa.set(4, five);
  mapa.set(5, six);
  mapa.set(6, seven + zero);
  mapa.set(7, eight);

  mapa.set(8, zero);
}

let counter = 0;
counter = 
  mapa.get(0) + 
  mapa.get(1) + 
  mapa.get(2) + 
  mapa.get(3) + 
  mapa.get(4) + 
  mapa.get(5) + 
  mapa.get(6) + 
  mapa.get(7) + 
  mapa.get(8); 

console.log(counter);
