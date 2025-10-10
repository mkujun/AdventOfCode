const fs = require('fs');

let input = fs.readFileSync('input16.txt', 'utf8').split('\n').slice(0, -1);

const inRange = (number, range) => {
  let from = range[0];
  let to = range[1];

  return number < from || number > to ? false : true;
}

// parsing input
let classInput = input.find(e => e.includes("class"));
let rowInput = input.find(e => e.includes("row"));
let seatInput = input.find(e => e.includes("seat"));

let classRange1 = classInput.split(" or ")[0].split("class: ")[1].split("-").map(Number);
let classRange2 = classInput.split(" or ")[1].split("-").map(Number);

let rowRange1 = rowInput.split(" or ")[0].split("row: ")[1].split("-").map(Number);
let rowRange2 = rowInput.split(" or ")[1].split("-").map(Number);

let seatRange1 = seatInput.split(" or ")[0].split("seat: ")[1].split("-").map(Number);
let seatRange2 = seatInput.split(" or ")[1].split("-").map(Number);

let yourTicket = input[input.indexOf("your ticket:") + 1].split(',').map(Number);

let nearbyTickets = input.slice((input.indexOf("nearby tickets:") + 1), input.length);

// actual task
let numbersNotIn = [];

nearbyTickets.forEach(ticket => {
  ticket.split(",").forEach(t => {
    let tParse = parseInt(t);
    if (inRange(tParse, classRange1)
      || inRange(tParse, classRange2)
      || inRange(tParse, rowRange1)
      || inRange(tParse, rowRange2)
      || inRange(tParse, seatRange1)
      || inRange(tParse, seatRange2))
    {
    }
    else {
      numbersNotIn.push(t);
    }
  })
})

const reducer = (previousValue, currentValue) => previousValue + currentValue;
let pero = numbersNotIn.map(Number).reduce(reducer);

console.log(pero);
