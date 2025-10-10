import { readFileSync } from "fs";
//const input: string[] = readFileSync("../inputs/test.txt", "utf-8").split("\n");
const input: string[] = readFileSync("../inputs/11.txt", "utf-8").split("\n");

let items: number[] = [];
let operation: string[] = [];
let test: number;
let monkeyNo: number = 0;
let ifTrue: number;
let ifFalse: number;
let monkeyParty: Monkey[] = [];

interface Monkey {
  monkeyNo: number;
  items: number[];
  operation: string[];
  test: number;
  ifTrue: number;
  ifFalse: number;
}

function readLines() {
  input.forEach((e: string) => {
    if (e.trim() === "") {
      let parsedMonkey: Monkey = {
        monkeyNo: monkeyNo,
        items: items,
        operation: operation,
        test: test,
        ifTrue: ifTrue,
        ifFalse: ifFalse,
      };
      monkeyParty.push(parsedMonkey);
      monkeyNo++;
    } else {
      if (e.includes("Starting items")) {
        items = parseStartingItems(e);
      } else if (e.includes("Operation")) {
        operation = parseOperation(e);
      } else if (e.includes("Test")) {
        test = parseLastNumber(e);
      } else if (e.includes("If true")) {
        ifTrue = parseLastNumber(e);
      } else if (e.includes("If false")) {
        ifFalse = parseLastNumber(e);
      }
    }
  });
}

function parseStartingItems(input: string): number[] {
  return input.split(":")[1].split(",").map(Number);
}

function parseOperation(input: string): string[] {
  const splits = input.split("=")[1].split(" ");
  const operator: string = splits[2];
  const value: string = splits[3].slice(0, -1);

  return [operator, value];
}

function parseLastNumber(input: string): number {
  return parseInt(input.split(" ").slice(-1)[0].slice(0, -1));
}

function calculateWorryLevel(
  operation: string[],
  firstElement: number,
  monkeyNo: number
): number {
  numberOfMonkeyInspections(monkeyNo);
  if (operation[0] == "*") {
    return Math.floor((firstElement * parseInt(operation[1])) / 3);
  } else if (operation[0] == "+") {
    return Math.floor((firstElement + parseInt(operation[1])) / 3);
  }

  return 0;
}

function throwToMonkey(
  worryLevel: number,
  test: number,
  ifTrue: number,
  ifFalse: number
): void {
  if (worryLevel % test === 0) {
    monkeyParty[ifTrue].items.push(worryLevel);
  } else {
    monkeyParty[ifFalse].items.push(worryLevel);
  }
}

let monkey0NumberOfInspection: number = 0;
let monkey1NumberOfInspection: number = 0;
let monkey2NumberOfInspection: number = 0;
let monkey3NumberOfInspection: number = 0;
let monkey4NumberOfInspection: number = 0;
let monkey5NumberOfInspection: number = 0;
let monkey6NumberOfInspection: number = 0;
let monkey7NumberOfInspection: number = 0;

function numberOfMonkeyInspections(monkeyNo: number): void {
  if (monkeyNo == 0) {
    monkey0NumberOfInspection++;
  } else if (monkeyNo == 1) {
    monkey1NumberOfInspection++;
  } else if (monkeyNo == 2) {
    monkey2NumberOfInspection++;
  } else if (monkeyNo == 3) {
    monkey3NumberOfInspection++;
  } else if (monkeyNo == 4) {
    monkey4NumberOfInspection++;
  } else if (monkeyNo == 5) {
    monkey5NumberOfInspection++;
  } else if (monkeyNo == 6) {
    monkey6NumberOfInspection++;
  } else if (monkeyNo == 7) {
    monkey7NumberOfInspection++;
  }
}

function inspectWorryLevel(monkey: Monkey): void {
  let worryLevel: number = 0;

  if (monkey.items.length > 0) {
    const firstElement: number | undefined = monkey.items.shift();

    if (monkey.operation[1] == "old") {
      if (firstElement) {
        worryLevel = calculateWorryLevel(
          [monkey.operation[0], firstElement.toString()],
          firstElement,
          monkey.monkeyNo
        );

        throwToMonkey(worryLevel, monkey.test, monkey.ifTrue, monkey.ifFalse);
      }
    } else {
      if (firstElement) {
        worryLevel = calculateWorryLevel(
          monkey.operation,
          firstElement,
          monkey.monkeyNo
        );
      }

      throwToMonkey(worryLevel, monkey.test, monkey.ifTrue, monkey.ifFalse);
    }
    inspectWorryLevel(monkey);
  }
}

function round(): void {
  const monkey0 = monkeyParty[0];
  const monkey1 = monkeyParty[1];
  const monkey2 = monkeyParty[2];
  const monkey3 = monkeyParty[3];
  const monkey4 = monkeyParty[4];
  const monkey5 = monkeyParty[5];
  const monkey6 = monkeyParty[6];
  const monkey7 = monkeyParty[7];

  inspectWorryLevel(monkey0);
  inspectWorryLevel(monkey1);
  inspectWorryLevel(monkey2);
  inspectWorryLevel(monkey3);
  inspectWorryLevel(monkey4);
  inspectWorryLevel(monkey5);
  inspectWorryLevel(monkey6);
  inspectWorryLevel(monkey7);
}

function printMonkeys(roundNo: number): void {
  console.log("round ", roundNo);
  console.log("Monkey 0", monkeyParty[0].items);
  console.log("Monkey 1", monkeyParty[1].items);
  console.log("Monkey 2", monkeyParty[2].items);
  console.log("Monkey 3", monkeyParty[3].items);
  console.log("");
}

readLines();
for (let i: number = 1; i <= 20; i++) {
  round();
  //printMonkeys(i);
}

console.log("monkey0", monkey0NumberOfInspection);
console.log("monkey1", monkey1NumberOfInspection);
console.log("monkey2", monkey2NumberOfInspection);
console.log("monkey3", monkey3NumberOfInspection);
console.log("monkey4", monkey4NumberOfInspection);
console.log("monkey5", monkey5NumberOfInspection);
console.log("monkey6", monkey6NumberOfInspection);
console.log("monkey7", monkey7NumberOfInspection);
