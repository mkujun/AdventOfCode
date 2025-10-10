// input
/*
let p1 = {
  position: 4,
  score: 0
}

let p2 = {
  position: 8,
  score: 0
}
*/

let p1 = {
  position: 6,
  score: 0
}

let p2 = {
  position: 7,
  score: 0
}

let counter = 0;
let dieRoll = 0;

const step = (player) => {
  dieRoll = dieRoll + 3;

  counter++;
  if (counter > 100) {
    counter = 1;
  }
  player.position = player.position + counter;
  counter++;
  if (counter > 100) {
    counter = 1;
  }
  player.position = player.position + counter;
  counter++;
  if (counter > 100) {
    counter = 1;
  }
  player.position = player.position + counter;

  if (player.position > 10) {
    player.position = player.position - 1;
    player.position = player.position % 10;
    player.position = player.position + 1;

    player.score = player.score + player.position;
  }
  else {
    player.score = player.score + player.position;
  }
}


while (p1.score < 1000 && p2.score < 1000) {
  step(p1);
  if (p1.score >= 1000) {
    break;
  }
  if (p2.score >= 1000) {
    break;
  }
  step(p2);
}

if (p1.score < p2.score) {
  console.log("part 1", p1.score * dieRoll);
}
else if (p1.score > p2.score) {
  console.log("part 1", p2.score * dieRoll);
}

