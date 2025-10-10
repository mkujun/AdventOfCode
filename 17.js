/*
const targetArea = {
  x: [20,30],
  y: [-10, -5]
}
*/

const targetArea = {
  x: [241,273],
  y: [-97, -63]
}

let yMax = 0;

const isInArea = (x, y) => {
  if ( (x >= targetArea.x[0] && x <= targetArea.x[1]) &&
    (y >= targetArea.y[0] && y <= targetArea.y[1])
  ) {
    return true;
  }
}

const step = (velocity) => {
  if (velocity.x > 0) { velocity.x-- }
  else if (velocity.x < 0) { velocity.x++ }

  velocity.y--;
}

let lst = [];

const trickShot = (velocity) => {
  let position = { x: 0, y: 0 }

  let pero = false;
  let initialVelocity = {...velocity};

  for (let i = 0; i < 200; i++) {
    position.x = position.x + velocity.x;
    position.y = position.y + velocity.y;
    step(velocity);
    pero = isInArea(position.x, position.y);

    if (pero === true) {
      lst.push(initialVelocity);
      break;
    }
  }

}

for (let i = -97; i <= 273; i ++) {
  for (let j = -97; j <= 273; j ++) {
    let velocity = { x: i, y: j};
    trickShot(velocity);
  }
}
console.log("lst length", lst.length);
