import { readFileSync } from "fs";
const input: string[] = readFileSync("../inputs/21.txt", "utf-8").split("\n").slice(0, -1);

function containsNumber(input: string): boolean {
  const regex = /\d/; // Regular expression to match a digit (number)

  return regex.test(input);
}

class Dictionary<K, V> {
  private data: { [key: string]: V } = {};

  // Add a key-value pair to the dictionary
  add(key: K, value: V): void {
    const stringKey = String(key);
    this.data[stringKey] = value;
  }

  // Get the value associated with a key
  get(key: K): V | undefined {
    const stringKey = String(key);
    return this.data[stringKey];
  }

  // Check if a key exists in the dictionary
  has(key: K): boolean {
    const stringKey = String(key);
    return this.data.hasOwnProperty(stringKey);
  }

  // Remove a key from the dictionary
  remove(key: K): void {
    const stringKey = String(key);
    delete this.data[stringKey];
  }

  // Get all keys in the dictionary
  keys(): K[] {
    return Object.keys(this.data).map((key) => key as unknown as K);
  }

  // Get all values in the dictionary
  values(): V[] {
    return Object.values(this.data);
  }

  // Get the number of key-value pairs in the dictionary
  size(): number {
    return Object.keys(this.data).length;
  }

  // Clear the dictionary
  clear(): void {
    this.data = {};
  }
}

function operation(first: number, second: number, operator: string): number {
  if (operator == '+') {
    return first + second;
  }
  else if (operator == "-") {
    return first - second;
  }
  else if (operator == "*") {
    return first * second;
  }
  else if (operator == "/") {
    return first / second;
  }
  return 0;
}

function readInput() {
  input.forEach(r => {
    if (containsNumber(r)) {
      let monkeyName = r.split(" ")[0].slice(0, -1);
      let num = r.split(" ")[1];

      myDictionary.add(monkeyName, Number(num));
    }
  })
}

const myDictionary = new Dictionary<string, number>();

function round() {
  input.forEach(r => {
    let monkeyName = r.split(" ")[0].slice(0, -1);
    let first = r.split(" ")[1];
    let operator = r.split(" ")[2];
    let second = r.split(" ")[3];

    if (first && second) {
      let firstDict = myDictionary.get(first);
      let secondDict = myDictionary.get(second.slice(0, -1));

      if (firstDict && secondDict) {
        let result = operation(firstDict, secondDict, operator);
        myDictionary.add(monkeyName, result);
      }
    }
  })
}

readInput();

let root: boolean = false;

while (!root) {
  round();

  if (myDictionary.has("root")) {
    root = true;
  }
}

console.log(myDictionary.get("root"));
