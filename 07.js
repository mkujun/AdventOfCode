const fs = require('fs');

//let input = fs.readFileSync('testInput.txt', 'utf8').split('\n').slice(0,-1);
let input = fs.readFileSync('input07.txt', 'utf8').split('\n').slice(0,-1);

let klaic = [];

// creating dictionary
input.forEach(line => {
  let bagType = line.split("contain")[0].split("bags")[0];
  let content = line.split("contain")[1].split(",");

  klaic.push({
    bagType: bagType,
    content: content
  });
})

let bagsToFind = [];// array u koji se spremaju elementi za rekurzivnu pretragu
let result = [];// spremati ce konacni rezultat

findBag = (name) => {
  klaic.forEach(bags =>
    bags.content.forEach(bag => {
      if (bag.includes(name)) {
        bagsToFind.push(bags);
        result.push(bags);
      }
    })
  )
}

vortex = (item) => {
  if (bagsToFind.length == 0) {
  }
  else {
    let element = bagsToFind.shift();

    findBag(element.bagType);
    vortex(element.bagType);
  }
}
findBag("shiny gold bag");
vortex();

let distinct = [...new Set(result)];
console.log("distinct", distinct.length);
