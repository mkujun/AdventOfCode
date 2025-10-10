import { readFileSync } from 'fs';
const input: string[] = readFileSync('../inputs/09.txt', 'utf-8').split('\n').slice(0, -1);
//const input: string[] = readFileSync('../inputs/test.txt', 'utf-8').split('\n').slice(0, -1);
let grid: string[][] = [];
const rows: number = 800;
const columns: number = 800;

interface Point {
  i: number,
  j: number
}

let head: Point = {
  i: 0,
  j: 0
}

let tail: Point = {
  i: 0,
  j: 0
}

function generateGrid(): void {
  for (let i: number = 0; i <= rows; i++) {
    grid.push(new Array(rows).fill('.'));
  }
}

function printGrid(): void {
  grid.forEach((row: string[]) => {
    console.log(row);
  })
  console.log("==============");
}

function deleteHead(): void {
  if (grid[head.i][head.j] !== 'T') {
    grid[head.i][head.j] = '.';
  }
}

function setTail(i: number, j: number): void {
  grid[i][j] = 'T';
  tail.i = i;
  tail.j = j;
}

function setHead(i: number, j: number): void {
  if (grid[i][j] !== 'T') {
    grid[i][j] = 'H';
  }

  head.i = i;
  head.j = j;
}

function moveHead(direction: string): void {
  switch (direction) {
    case 'R':
      deleteHead();
      setHead(head.i, head.j + 1);
    break;
    case 'D':
      deleteHead();
      setHead(head.i + 1, head.j);
    break;
    case 'U':
      deleteHead();
      setHead(head.i - 1, head.j);
    break;
    case 'L':
      deleteHead();
      setHead(head.i, head.j - 1);
    break;
    default:
      console.log("invalid");
    break;
  }
}

function moveTailUpOrDown(): void {
  if (head.i === tail.i && head.j > tail.j) { // pomak u desno za 1
    setTail(head.i, head.j - 1);
  }
  else if (head.i === tail.i && head.j < tail.j) { // pomak u lijevo za 1
    setTail(head.i, head.j + 1);
  }
  else if (head.i < tail.i && head.j === tail.j) { // pomak gore za 1
    setTail(head.i + 1, head.j);
  }
  else if (head.i > tail.i && head.j === tail.j) { // pomak dolje za 1
    setTail(head.i - 1, head.j);
  }
}

function moveTail2RowDiff(): void {
  //head je gore desno u odnosu na tail (razmak 2)
  if (head.i + 2 === tail.i && head.j - 1 === tail.j) {
    setTail(head.i + 1, head.j);
  }
  // head je gore lijevo u odnosu na tail (razmak 2)
  else if (head.i + 2 === tail.i && head.j + 1 === tail.j) {
    setTail(head.i + 1, head.j);
  }
  // head je dolje lijevo u odnosu na tail (razmak 2)
  else if (head.i - 2 === tail.i && head.j + 1 === tail.j) {
    setTail(head.i - 1, head.j);
  }
  // head je dolje desno u odnosu na tail (razmak 2)
  else if (head.i - 2 === tail.i && head.j - 1 === tail.j) {
    setTail(head.i - 1, head.j);
  }
}

function moveTail1ColumnDiff(): void {
  if (head.i + 1 === tail.i && head.j - 2 === tail.j) {
    setTail(head.i, head.j - 1);
  }
  else if (head.i + 1 === tail.i && head.j + 2 === tail.j) {
    setTail(head.i, head.j + 1);
  }
  else if (head.i - 1 === tail.i && head.j + 2 === tail.j) {
    setTail(head.i, head.j + 1);
  }
  else if (head.i - 1 === tail.i && head.j - 2 === tail.j) {
    setTail(head.i, head.j - 1);
  }
}

function moveTail(): void {
  if (head.i === tail.i || head.j === tail.j) {
    moveTailUpOrDown();
  }

  // niz ifova za situaciju kada je razlika u dva retka i jednom stupcu
  else if (head.i + 2 === tail.i || head.i - 2 === tail.i) {
    moveTail2RowDiff();
  }

  else if (head.i + 1 === tail.i || head.i - 1 === tail.i) {
    moveTail1ColumnDiff();
  }
}

function makeMove(direction: string, numberOfMovements: string): void {
  const moveNo: number = parseInt(numberOfMovements);

  for (let i: number = 0; i < moveNo; i++) {
    moveHead(direction);
    moveTail();
    //printGrid();
  }
}

generateGrid();
setHead(400, 400);
setTail(400, 400);


input.forEach((row: string) => {
  const split: string[] = row.split('');
  const theNum: string = row.replace( /^\D+/g, '')

  makeMove(split[0], theNum);
})

let part1Counter: number = 0;

function part1(): void {
  for (let i: number = 0; i <= rows; i++) {
    for (let j: number = 0; j <= columns; j++) {
      if (grid[i][j] === 'T') {
        part1Counter++;
      }
    }
  }
}

part1();
console.log("part 1", part1Counter);

// 6498
