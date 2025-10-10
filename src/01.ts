import { readFileSync } from 'fs';
const file: number[] = readFileSync('../inputs/01.txt', 'utf-8').split('\n').map(Number);

let sum: number = 0;
let topThree: number[] = [];

function compareNumbers(a: number, b: number): number {
  return a - b;
}

file.forEach((e: number) => {
  if (e > 0) {
    sum = sum + e;
  }
  else if (e === 0) {
    if(topThree.length < 3) {
      topThree.push(sum);
    }
    else if (topThree.length === 3) {
      topThree.sort(compareNumbers);
      if (topThree[0] < sum) {
        topThree[0] = sum;
      }
    }

    sum = 0;
  }
})

console.log("part 1", topThree[2]);

const initialValue: number = 0;
const sumWithInitial: number = topThree.reduce(
  (accumulator:number, currentValue:number) => accumulator + currentValue,
  initialValue
);

console.log("part 2", sumWithInitial);
