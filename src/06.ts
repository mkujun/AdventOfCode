import { readFileSync } from 'fs';
const input: string[] = readFileSync('../inputs/06.txt', 'utf-8').split('').slice(0, -2);

function uniqueMarker(pattern: string[]): boolean {
  let uniqueChars: string[] = [... new Set(pattern)];

  return uniqueChars.length === 4 ? true : false;
}

function uniqueMessage(pattern: string[]): boolean {
  let uniqueChars: string[] = [... new Set(pattern)];

  return uniqueChars.length === 14 ? true : false;
}

for(let i: number = 3; i <= input.length; i++) {
  const step: string[] = [];
  step.push(input[i - 3]);
  step.push(input[i - 2]);
  step.push(input[i - 1]);
  step.push(input[i]);

  if (uniqueMarker(step)) {
    console.log("part 1", i + 1);
    break;
  }
}

for(let i: number = 15; i <= input.length; i++) {
  const step: string[] = [];
  step.push(input[i - 13]);
  step.push(input[i - 12]);
  step.push(input[i - 11]);
  step.push(input[i - 10]);
  step.push(input[i - 9]);
  step.push(input[i - 8]);
  step.push(input[i - 7]);
  step.push(input[i - 6]);
  step.push(input[i - 5]);
  step.push(input[i - 4]);
  step.push(input[i - 3]);
  step.push(input[i - 2]);
  step.push(input[i - 1]);
  step.push(input[i]);

  if (uniqueMessage(step)) {
    console.log("part 2", i + 1);
    break;
  }
}
