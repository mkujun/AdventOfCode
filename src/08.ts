import { readFileSync } from 'fs';
const input: string[] = readFileSync('../inputs/08.txt', 'utf-8').split('\n').slice(0, -1);

let columns:number = 0;
let rows:number = input[0].length - 1;
let grid: number[][] = [];

function buildGrid(): void {
  for(let i:number = 0; i < input.length; i++) {
    columns++;
    let row: number[] = input[i].split('').map(Number).slice(0, -1);
    grid.push(row);
  }
}

function traverseGrid(): void {
  for(let i: number = 1; i < rows - 1; i++) {
    for(let j: number = 1; j < columns - 1; j++) {
      checkInsideGrid(i, j);
      findScenicScore(i, j);
    }
  }
}

function scenicLeft(i: number, j: number): number {
  let counter:number = 0;

  for(let cC: number = j - 1; cC >= 0; cC--) {
    if (grid[i][cC] >= grid[i][j]) {
      counter++;
      break;
    }
    else {
      counter++;
      continue;
    }
  }

  return counter;
}

function scenicTop(i: number, j: number): number {
  let counter:number = 0;

  for(let rC: number = i - 1; rC >= 0; rC--) {
    if (grid[rC][j] >= grid[i][j]) {
      counter++;
      break;
    }
    else {
      counter++;
      continue;
    }
  }

  return counter;
}

function scenicBottom(i: number, j: number): number {
  let counter:number = 0;

  for(let rC: number = i + 1; rC < columns; rC++) {
    if (grid[rC][j] >= grid[i][j]) {
      counter++;
      break;
    }
    else {
      counter++;
      continue;
    }
  }

  return counter;
}

function scenicRight(i: number, j: number): number {
  let counter:number = 0;

  for(let cC: number = j + 1; cC < rows ; cC++) {
    if (grid[i][cC] >= grid[i][j]) {
      counter++;
      break;
    }
    else {
      counter++;
      continue;
    }
  }

  return counter;
}

function visibleLeft(i: number, j: number): boolean {
  let isVisible: boolean = true;

  for(let cC: number = 0; cC < j; cC++) {
    if (grid[i][cC] < grid[i][j]) {
      continue;
    }
    else {
      isVisible = false;
      break;
    }
  }

  return isVisible;
}

function visibleRight(i: number, j: number): boolean {
  let isVisible: boolean = true;

  for(let cC: number = j + 1; cC < rows; cC++) {
    if (grid[i][cC] < grid[i][j]) {
      continue;
    }
    else {
      isVisible = false;
      break;
    }
  }

  return isVisible;
}

function visibleTop(i: number, j: number): boolean {
  let isVisible: boolean = true;

  for(let rC:number = 0; rC < i; rC++) {
    if (grid[rC][j] < grid[i][j]) {
      continue;
    }
    else {
      isVisible = false;
      break;
    }
  }

  return isVisible;
}

function visibleBottom(i: number, j: number): boolean {
  let isVisible: boolean = true;

  for(let rC:number = i + 1; rC < rows; rC++) {
    if (grid[rC][j] < grid[i][j]) {
      continue;
    }
    else {
      isVisible = false;
      break;
    }
  }

  return isVisible;
}

function findScenicScore(i: number, j: number): void {
  const sL:number = scenicLeft(i,j);
  const sR:number = scenicRight(i,j);
  const sT:number = scenicTop(i,j);
  const sB:number = scenicBottom(i,j);

  const sS:number = sR * sL * sT * sB;
  if (sS > scenicScore) {
    scenicScore = sS;
  }
}

function checkInsideGrid(i: number, j: number): void {
  let vLeft = visibleLeft(i, j);
  let vRight = visibleRight(i, j);
  let vTop = visibleTop(i, j);
  let vBottom = visibleBottom(i, j);

  if (vLeft || vRight || vTop || vBottom) {
    visible++;
  }
}


buildGrid();
let visible: number = rows * 2 + columns * 2 - 4; // visible from outside the grid
let scenicScore:number = 0;
traverseGrid();
console.log("part 1", visible);
console.log("part 2", scenicScore);
