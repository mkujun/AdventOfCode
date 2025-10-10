const fs = require('fs');
let input = fs.readFileSync('input13.txt', 'utf8').split('\n').slice(0, -1);

let target = input[0];
let buses = input[1].split(",");

let nearValues = [];

buses.forEach(bus => {
  if (Number.isInteger(parseInt(bus))) {
    nearValues.push({
      busId: parseInt(bus),
      depart: Math.round(target/bus) * bus
    })
  }
})

nearValues.sort((a,b) => (a.depart > b.depart) ? 1 : ((b.depart > a.depart) ? -1 : 0));

nearValues.forEach(bus =>{
  if (bus.depart > target) {
    let diff = bus.depart - target;
    console.log("result", diff * bus.busId);
  }
})
