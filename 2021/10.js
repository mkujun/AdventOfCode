const fs = require('fs');
let input = fs.readFileSync("./inputs/10.txt", 'utf8').split('\n').slice(0, -1);

let round = 0;
let square = 0;
let curly = 0;
let angle = 0;

let chunk = [];

const returnFoundValue = (value) => {
  if (value == ')') {
    round = round + 3;
  }
  if (value == ']') {
    square = square + 57;
  }
  if (value == '}') {
    curly = curly + 1197;
  }
  if (value == '>') {
    angle = angle + 25137;
  }
}

let incopleteLines = [];

const isCorrupted = (line) => {
  let incoplete = true;
  
  for (let i = 0; i < line.length; i++) {
    if (line[i] == '[' || line[i] == '{' || line[i] == '<' || line[i] == '(') {
      chunk.push(line[i]);
    }
    else {
      let lastL = chunk.pop();

      // '['
      if (lastL == '[' && line[i] == ']') {
        continue;
      }
      if (lastL == '[' && line[i] != ']') {
        //returnFoundValue(line[i]);
        incoplete = false;
        break;
      }

      // '('
      if (lastL == '(' && line[i] == ')') {
        continue;
      }
      if (lastL == '(' && line[i] != ')') {
        //returnFoundValue(line[i]);
        incoplete = false;
        break;
      }

      // '<'
      if (lastL == '<' && line[i] == '>') {
        continue;
      }
      if (lastL == '<' && line[i] != '>') {
        //returnFoundValue(line[i]);
        incoplete = false;
        break;
      }

      // '{'
      if (lastL == '{' && line[i] == '}') {
        continue;
      }
      if (lastL == '{' && line[i] != '}') {
        //returnFoundValue(line[i]);
        incoplete = false;
        break;
      }
    }
    
  }

  if (incoplete) {
    incopleteLines.push(line)
  }
}

input.forEach(line => {
  let splitLine = line.split('');
  isCorrupted(splitLine);
})

let listOfScores = [];

const autocompleteScore = (line) => {
  let score = 0;

  line.reverse();

  line.forEach(l => {
    if (l == '(') {
      score = score * 5 + 1;
    }
    if (l == '[') {
      score = score * 5 + 2;
    }
    if (l == '{') {
      score = score * 5 + 3;
    }
    if (l == '<') {
      score = score * 5 + 4;
    }
  })

  listOfScores.push(score);
}

const findIncoplete = (line) => {
  let incoplete = [];

  for(let i = 0; i < line.length; i ++) {
    if (line[i] == '[' || line[i] == '{' || line[i] == '<' || line[i] == '(') {
      incoplete.push(line[i]);
    }

    else {
      let last = incoplete[incoplete.length - 1];

      if (last == '['  && line[i] == ']') {
        incoplete.pop();
      }
      if (last == '<'  && line[i] == '>') {
        incoplete.pop();
      }
      if (last == '{'  && line[i] == '}') {
        incoplete.pop();
      }
      if (last == '('  && line[i] == ')') {
        incoplete.pop();
      }

    }
  }

  autocompleteScore(incoplete);
}

incopleteLines.forEach(line => {
  findIncoplete(line);
})

listOfScores.sort((a,b) => a - b);

//console.log("part 1", angle + round + curly + square);

console.log("part 2", listOfScores[Math.floor(listOfScores.length/2)]);

