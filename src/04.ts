import { readFileSync } from 'fs';
const input: string[] = readFileSync('../inputs/04.txt', 'utf-8').split('\n').slice(0, -1);

interface Pair {
  from: number;
  to: number;
}

function splitRowIntoPairs(pair: string): Pair[] {
  let pairs:string[] = pair.split(',');
  let pair1:string[] = pairs[0].split('-');
  let pair2:string[] = pairs[1].split('-');

  let first: Pair = {
    from: parseInt(pair1[0]), 
    to: parseInt(pair1[1])
  }

  let second: Pair = {
    from: parseInt(pair2[0]), 
    to: parseInt(pair2[1].slice(0, -1))
  }

  return [first, second]
}

function overlapAll(pairs: Pair[]): void {
  const p1: Pair = pairs[0];
  const p2: Pair = pairs[1];

  if (p1.from <= p2.from && p1.to >= p2.to) {
    part1++;
  }

  else if (p1.from >= p2.from && p1.to <= p2.to) {
    part1++;
  }
}

function overlapSome(pairs: Pair[]): void {
  const p1: Pair = pairs[0];
  const p2: Pair = pairs[1];

  const lo: number = Math.max(p1.from, p2.from);
  const hi: number= Math.min(p1.to, p2.to);

  if (lo <= hi) {
    part2++;
  }
}

let part1: number = 0;
let part2: number = 0;

input.forEach((e: string) => {
  const pairs: Pair[] = splitRowIntoPairs(e);
  overlapAll(pairs);
  overlapSome(pairs);
})

console.log("part 1", part1);
console.log("part 2", part2);
