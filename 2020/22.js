const fs = require('fs');
let input = fs.readFileSync('input22.txt', 'utf8').split('\n').slice(0, -1);

const player1Index = input.indexOf("Player 1:");
const player2Index = input.indexOf("Player 2:");

const player1 = input.slice(player1Index + 1, player1Index + 26).map(Number);
const player2 = input.slice(player2Index + 1, player2Index + 26).map(Number);

const printDecks = () => {
  console.log("===Round===");
  console.log(player1);
  console.log(player2);
}

printDecks();

const round = (player1, player2) => {
  if (player1.length == 0 || player2.length == 0) {
    return null;
  }
  else {
    const [topCardDeck1] = player1;
    const [topCardDeck2] = player2;

    if (topCardDeck1 > topCardDeck2) {
      player1.push(topCardDeck1);
      player1.push(topCardDeck2);

      player1.splice(0,1);
      player2.splice(0,1);
    }
    else {
      player2.push(topCardDeck2);
      player2.push(topCardDeck1);

      player2.splice(0,1);
      player1.splice(0,1);
    }

    round(player1, player2);
  }
}

round(player1, player2);
printDecks();

let sum = 0;

for (let i = player1.length; i >= 1; i-- ) {
  sum = sum + player1[player1.length - i] * i;
}

console.log("result ", sum);
