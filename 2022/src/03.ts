import { readFileSync } from 'fs';
const input: string[] = readFileSync('../inputs/03.txt', 'utf-8').split('\n').slice(0, -1);

function letterValue(letter: string): number {
  const letters: string[] = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
  ];
  return letters.indexOf(letter) + 1;
}

function splitCompartments(row: string): string[] {
  const half: number = Math.ceil(row.length / 2);
  const comp1: string = row.slice(0, half - 1);
  const comp2: string = row.slice(half - 1).slice(0, -1);

  return [comp1, comp2];
}

function letterInBothCompartments(comp1: string, comp2: string): string {
  const one: string[] = comp1.split('');
  const two: string[] = comp2.split('');
  const intersection: string[] = one.filter(element => two.includes(element));

  return intersection[0];
}

function commonInThree(one: string[], two: string[], three: string[]): void {
  let data: string[][]= [one, two, three];
  let result: string[] = data.reduce((a,b) => a.filter(c => b.includes(c)));

  part2 = part2 + letterValue(result[0]);
}

function takeThree(input: string[]) {
  let one: string[];
  let two: string[];
  let three: string[];
  
  for(let i: number = 0; i < input.length; i = i + 3) {
    one = input[i].split('').slice(0, -1);
    two = input[i + 1].split('').slice(0, -1);
    three = input[i + 2].split('').slice(0, -1);

    commonInThree(one, two, three);
  }
}

let part1: number = 0;

input.forEach((e: string) => {
  const compartments = splitCompartments(e);
  const sameLetter = letterInBothCompartments(compartments[0], compartments[1]);
  const value = letterValue(sameLetter);
  part1 = part1 + value;
})

console.log("part 1", part1);

let part2: number = 0;
takeThree(input);
console.log("part 2", part2);

