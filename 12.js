const fs = require('fs');
let input = fs.readFileSync('input12.txt', 'utf8').split('\n').slice(0, -1);
const splitAt = index => x => [x.slice(0, index), x.slice(index)]

let compas = {
  "east": 0,
  "west": 0,
  "north": 0,
  "south": 0,
  "position": "east",
  "degrees" : 90
}

let rotateCompas = (currentDegree, direction, num, compas) => {
  let result = 0;
  if (direction == "R") {
    currentDegree = currentDegree + num;

    if (currentDegree > 360) {
      result = currentDegree - 360;
    }
    else {
      result = currentDegree;
    }
  }
  else if (direction == "L") {
    currentDegree = currentDegree - num;
    if (currentDegree < 0) {
      result = 360 - Math.abs(currentDegree);
    }

    else {
      result = currentDegree;
    }
  }

  if (result == 90) {
    compas.position = "east";
    compas.degrees = 90;
  }
  else if (result == 180) {
    compas.position = "south";
    compas.degrees = 180;
  }
  else if (result == 270) {
    compas.position = "west";
    compas.degrees = 270;
  }
  else if (result == 360 || result == 0) {
    compas.position = "north";
    compas.degrees = 360;
  }
}

/*
input.forEach(e => {
  let row = splitAt(1)(e);

  let direction = row[0];
  let value = row[1];

  if (direction == "F") {
    compas[compas.position] = (compas[compas.position] + parseInt(value));
  }
  else if (direction == "N") {
    compas["north"] = (compas["north"] + parseInt(value));
  }
  else if (direction == "S") {
    compas["south"] = (compas["south"] + parseInt(value));
  }
  else if (direction == "E") {
    compas["east"] = (compas["east"] + parseInt(value));
  }
  else if (direction == "W") {
    compas["west"] = (compas["west"] + parseInt(value));
  }
  else if (direction == "R") {
    rotateCompas(compas.degrees, "R", parseInt(value), compas);
  }
  else if (direction == "L") {
    rotateCompas(compas.degrees, "L", parseInt(value), compas);
  }
})

console.log("result", Math.abs(compas.west - compas.east) + Math.abs(compas.south - compas.north));
*/

// part 2
let waypoint = {
  "E": 10,
  "W": 0,
  "N": 1,
  "S": 0
}

let ship = {
  "E": 0,
  "W": 0,
  "N": 0,
  "S": 0,
}

const rotateWaypoint = (waypoint, rotateDirection, rotateValue) => {
  let waypointCopy = {...waypoint};

  if (rotateDirection == "R") {
    if (rotateValue == 90) {
      // east => north
      waypoint["E"] = waypointCopy["N"]

      // south => east
      waypoint["S"] = waypointCopy["E"]

      // west => south
      waypoint["W"] = waypointCopy["S"]

      // north = > west
      waypoint["N"] = waypointCopy["W"]
    }
    else if (rotateValue == 180) {
      waypoint["E"] = waypointCopy["W"]
      waypoint["S"] = waypointCopy["N"]
      waypoint["W"] = waypointCopy["E"]
      waypoint["N"] = waypointCopy["S"]
    }
    else if (rotateValue == 270) {
      waypoint["E"] = waypointCopy["S"]
      waypoint["S"] = waypointCopy["W"]
      waypoint["W"] = waypointCopy["N"]
      waypoint["N"] = waypointCopy["E"]
    }
  }
  else if (rotateDirection == "L") {
    if (rotateValue == 90) {
      waypoint["E"] = waypointCopy["S"]
      waypoint["S"] = waypointCopy["W"]
      waypoint["N"] = waypointCopy["E"]
      waypoint["W"] = waypointCopy["N"]
    }
    else if (rotateValue == 180) {
      waypoint["E"] = waypointCopy["W"]
      waypoint["S"] = waypointCopy["N"]
      waypoint["N"] = waypointCopy["S"]
      waypoint["W"] = waypointCopy["E"]
    }
    else if (rotateValue == 270) {
      waypoint["E"] = waypointCopy["N"]
      waypoint["S"] = waypointCopy["E"]
      waypoint["N"] = waypointCopy["W"]
      waypoint["W"] = waypointCopy["S"]
    }
  }
}

input.forEach(e => {
  let row = splitAt(1)(e);

  let direction = row[0];
  let value = parseInt(row[1]);

  if (direction == "F") {
    ship["E"] = ship["E"] + waypoint["E"] * value;
    ship["W"] = ship["W"] + waypoint["W"] * value;
    ship["N"] = ship["N"] + waypoint["N"] * value;
    ship["S"] = ship["S"] + waypoint["S"] * value;
  }
  else if (direction == "N") {
    waypoint["N"] = waypoint["N"] + value;
  }
  else if (direction == "S") {
    waypoint["S"] = waypoint["S"] + value;
  }
  else if (direction == "W") {
    waypoint["W"] = waypoint["W"] + value;
  }
  else if (direction == "E") {
    waypoint["E"] = waypoint["E"] + value;
  }
  else if (direction == "R") {
    rotateWaypoint(waypoint, "R", value);
  }
  else if (direction == "L") {
    rotateWaypoint(waypoint, "L", value);
  }

})
console.log("waypoint", waypoint);
console.log("ship", ship);
console.log("result", Math.abs(ship.W - ship.E) + Math.abs(ship.S - ship.N));
