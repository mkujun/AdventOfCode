import { readFileSync } from 'fs';
const input: string[] = readFileSync('../inputs/10.txt', 'utf-8').split('\n').slice(0, -1);
//const input: string[] = readFileSync('../inputs/test.txt', 'utf-8').split('\n').slice(0, -1);

let x: number = 1;
let cycleNo: number = 0;
let sum: number = 0;
let cycleToComplete:number = 0;

for(let i:number = 0; i < input.length; i++) {
  const splits:string[] = input[i].split(' ');
  splits.length > 1 ? takeInstruction(splits[0]) : takeInstruction(splits[0].slice(0, -1));

  do {
    cycleNo++;
    if (cycleNo === 20) {
      signalStrength();
    }
    if (cycleNo === 60) {
      signalStrength();
    }
    if (cycleNo === 100) {
      signalStrength();
    }
    if (cycleNo === 140) {
      signalStrength();
    }
    if (cycleNo === 180) {
      signalStrength();
    }
    if (cycleNo === 220) {
      signalStrength();
    }

    cycleToComplete--;
  } while(cycleToComplete > 0);

  splits.length > 1 ? addValue(splits[1]) : addValue("0");
}

function signalStrength():void {
  const signalStrength: number = x * cycleNo;
  sum = sum + signalStrength;
}

function takeInstruction(instruction: string):void {
  if (instruction === 'addx') {
    cycleToComplete = 2;
  }
  else if (instruction === 'noop') {
    cycleToComplete = 1;
  }
}

function addValue(value: string):void {
  x = x + parseInt(value);
}

console.log("sum", sum);
