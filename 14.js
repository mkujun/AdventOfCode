const fs = require('fs');
let input = fs.readFileSync("./inputs/14.txt", 'utf8').split('\n').slice(0, -1);

let template = input[0].split('');
const rules = new Map();

getInsertionRules = () => {
  for (let i = 2; i < input.length; i++) {
    let rule = input[i].split(" -> ");

    rules.set(rule[0], rule[1]);
  }
}

printInsertionRules = () => {
  for (const [key, value] of rules) {
    console.log(key + ' = ' + value);
  }
}

getInsertionRules();
//printInsertionRules();

// main loop
// part 1 works with array
/*
for (let i = 0; i < 10; i++) {
  let stepTemplate = [...template];
  let counter = 0;

  for (let j = 0; j < template.length - 1; j++) {
    let pattern = stepTemplate[j] + stepTemplate[j + 1];

    if (rules.has(pattern)) {
      template.splice(j + 1 + counter, 0, rules.get(pattern));
      counter++;
    }
  }
}
*/

partOne = () => {
  let set = new Set(template);
  let dict = new Map();
  let max = 0;
  let min = 10000;

  for (let item of set) {
    dict.set(item, 0);
  }

  template.forEach(e => {
    dict.set(e, dict.get(e) + 1);
  })

  // Map output
  for (const [key, value] of dict) {
    console.log(key + ' = ' + value);

    if (value < min) {
      min = value;
    }
    if (value > max) {
      max = value;
    }
  }

  console.log("part 1", max - min);
}

//partOne();

// part 2
//
let dict = new Map();
insertTemplateIntoDict = () => {
  for(let i = 0; i < template.length - 1; i++) {
    dict.set(template[i] + template[i + 1], 1);
  }
}

printDict = (dict) => {
  for (const [key, value] of dict) {
    console.log(key + ' = ' + value);
  }
}

insertTemplateIntoDict();

for(let i = 0; i < 40; i++) {
  let stepDict = new Map(dict);
  for (const [key, value] of dict) {
    
    if (value > 0) {
      let input = key.split('');
      let output = rules.get(key);
      let resultingPairs = [];

      resultingPairs.push(input[0] + output);
      resultingPairs.push(output + input[1]);

      stepDict.set(key, stepDict.get(key) - value);

      resultingPairs.forEach(pair => {
        if (stepDict.has(pair)) {
          stepDict.set(pair, stepDict.get(pair) + value);
        }
        else {
          stepDict.set(pair, value);
        }
      })
    }
  }

  dict = new Map(stepDict);

}

let part2 = new Map();
printDict(dict);

for (const [key, value] of dict) {

  let keyPairs = key.split('');
  keyPairs.forEach(keyPair => {
    if (part2.has(keyPair)) {
      part2.set(keyPair, Math.ceil(part2.get(keyPair) + value / 2));
    }
    else {
      part2.set(keyPair, value / 2);
    }
  })
}


let min = 10000000000000000;
let max = 0;
for (const [key, value] of part2) {
  if (value > max) {
    max = value;
  }
  if (value < min) {
    min = value;
  }
}

console.log("max - min", max - min);
