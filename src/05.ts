import { readFileSync } from 'fs';
const input: string[] = readFileSync('../inputs/05.txt', 'utf-8').split('\n').slice(0, -1);

interface Stack {
  ind: number,
  val: string[]
}

let stacks: Stack[] = [];

function containsUppercase(str: string): boolean {
  return /^[A-Z]+$/.test(str);
}

function createStacks(): void {
  const numberOfStack: number = input[0].length / 4;

  for(let i:number = 1; i <= numberOfStack; i++) {
    let s: Stack = {
      ind: i,
      val: []
    }

    stacks.push(s);
  }
}

function parseStartingCrates(e: string): void {
  let stackNo: number = 0;

  for(let i:number = 1; i <= e.length; i = i + 4) {
    if (containsUppercase(e[i])) {
      stacks[stackNo].val.push(e[i]);
      stackNo++;
    }
    else {
      stackNo++;
    }
  }
}

function parseMoves(e: string): void {
  const numberPattern: RegExp = /\d+/g;
  const numbers:string[] | null = e.match(numberPattern);

  if (numbers !== null) {
    const move: number = parseInt(numbers[0]);
    const from: number = parseInt(numbers[1]);
    const to: number = parseInt(numbers[2]);

    crateMover9000(move, from, to); // part 1 function
    //crateMover9001(move, from, to); // part 2 function
  }
}

// part 1
function crateMover9000(move: number, from: number, to: number): void {
  let fromStack: Stack = stacks.find((s: Stack) => s.ind === from)!;
  let toStack: Stack = stacks.find((s: Stack) => s.ind === to)!;

  for(let i:number = 1; i <= move; i++) {
    let element: string = fromStack.val.shift()!;
    toStack.val.unshift(element);
  }
}

// part 2
function crateMover9001(move: number, from: number, to: number): void {
  let fromStack: Stack = stacks.find((s: Stack) => s.ind === from)!;
  let toStack: Stack = stacks.find((s: Stack) => s.ind === to)!;
  let elements: string[] = fromStack.val.splice(0, move);

  if (elements.length === 1) {
    toStack.val.unshift(elements[0]);
  }
  else if (elements.length > 1) {
    for(let i:number = elements.length - 1; i >= 0; i--) {
      toStack.val.unshift(elements[i]);
    }
  }
}

createStacks();

input.forEach((e: string) => {
  if (!e.startsWith('move', 0)) {
    parseStartingCrates(e);
  }
  else {
    parseMoves(e);
  }
})

/*
let part2: string = '';
stacks.forEach((s: Stack) => {
  part2 = part2 + s.val[0];
})

console.log("part 2", part2);
*/

let part1: string = '';

stacks.forEach((s: Stack) => {
  part1 = part1 + s.val[0];
})

console.log("part 1", part1);
