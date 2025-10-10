import { readFileSync } from 'fs';
const input: string[] = readFileSync('../inputs/02.txt', 'utf-8').split('\n').slice(0, -1);


function part1(oponent: string, you: string): number {
  switch(you) {
    case 'X':
    switch(oponent) {
        case 'A':
          return 4;
        case 'B':
          return 1;
        case 'C':
          return 7;
      }
    break;
    case 'Y':
      switch(oponent) {
        case 'A':
          return 8;
        case 'B':
          return 5;
        case 'C':
          return 2;
      }
    break;
    case 'Z':
      switch(oponent) {
        case 'A':
          return 3;
        case 'B':
          return 9;
        case 'C':
          return 6;
      }
    break;
  }
  return 0;
}

function part2(oponent: string, you: string): number {
  switch(oponent) {
    case 'A': // Rock
    switch(you) {
        case 'X': // Scissors
          return 3;
        case 'Y': // Rock
          return 4;
        case 'Z': // Paper
          return 8;
      }
    break;
    case 'B': // Paper
      switch(you) {
        case 'X': // Rock
          return 1;
        case 'Y': // Paper
          return 5;
        case 'Z': // Scissors
          return 9;
      }
    break;
    case 'C': // Scissors
      switch(you) {
        case 'X': // Paper
          return 2;
        case 'Y': // Scissors
          return 6;
        case 'Z': // Rock
          return 7;
      }
    break;
  }
  return 0;
}

let sum1: number = 0;
let sum2: number = 0;

input.forEach((e: string) => {
  let row = e.split('');
  let oponent: string = row[0];
  let you: string = row[2];

  const score1: number = part1(oponent, you);
  const score2: number = part2(oponent, you);
  sum1 = sum1 + score1;
  sum2 = sum2 + score2;
})

console.log("part 1", sum1);
console.log("part 2", sum2);
