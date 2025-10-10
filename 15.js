let input = [0,3,1,6,7,5];
let spoken = [0,3,1,6,7,5,0];

const findSpoken = (num) => {
  let spokenIndexes = [];

  let idx = spoken.indexOf(num);
  while(idx != -1) {
    spokenIndexes.push(idx);
    idx = spoken.indexOf(num, idx + 1);
  }

  return spokenIndexes;
}

let turn = 7;
let result;

for (let i = 0; i < 2020; i++) {
  const lastElement = spoken[spoken.length - 1];

  const isSpoken = findSpoken(lastElement);

  if (isSpoken.length > 1) {
    let lastSpoken = isSpoken[isSpoken.length - 1];
    let oneBeforeLastSpoken = isSpoken[isSpoken.length - 2];

    spoken.push((lastSpoken + 1) - (oneBeforeLastSpoken + 1));
  }
  else {
    spoken.push(0);
  }

  result = spoken[spoken.length - 1];
  turn++;

  if (turn == 2020) {
    console.log("turn: ",turn);
    console.log("result ", result);
  }
}
