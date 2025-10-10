const fs = require('fs');
let input = fs.readFileSync("./inputs/08.txt", 'utf8').split('\n').slice(0, -1);

let counter = 0;

// part 1
/*
input.forEach(row => {
  let output = row.split(" | ")[1];
  
  let segments = output.split(" ");

  segments.forEach(segment => {
    if (segment.length === 2) {
      counter++;
    }
    else if (segment.length === 3) {
      counter++;
    }
    else if (segment.length === 4) {
      counter++;
    }
    else if (segment.length === 7) {
      counter++;
    }
  })
})

console.log(counter);
*/

//part 2
input.forEach(row => {
  let input = row.split(" | ")[0].split(" ");
  let output = row.split(" | ")[1].split(" ");

  let panel = {
    A: '',
    B: '',
    C: '',
    D: '',
    E: '',
    F: '',
    G: '',
  }

  const createPanel = (input) => {
    let nineSixZero = [];

    input.forEach(e => {
      if (e.length == 2) {
        panel.B = e.split('');
        panel.C = e.split('');
      }
      else if (e.length == 3) {
        panel.A = e.split('');
      }
      else if (e.length == 4) {
        panel.F = e.split('');
        panel.G = e.split('');
      }
      else if (e.length == 7) {
        panel.E = e.split('');
      }
      else if (e.length == 6) {
        nineSixZero.push(e.split(''))
      }
    })

    let diff;
    diff = panel.A.filter(x => !panel.B.includes(x));
    panel.A = diff;
    diff = panel.F.filter(x => !panel.B.includes(x));
    panel.F = diff;
    panel.G = diff;

    diff = panel.E
      .filter(x => !panel.B.includes(x))
      .filter(y => !panel.F.includes(y))
      .filter(z => !panel.A.includes(z));


    panel.E = diff;
    panel.D = diff;

    // find 9;
    nineSixZero.forEach(e => {
      if (!panel.E.every(elem => e.includes(elem))) {
        panel.E = panel.E.filter(x => !e.includes(x));
        panel.D = panel.D.filter(x => e.includes(x));
      }
    })
    // find 0:
    nineSixZero.forEach(e => {
      if (!panel.G.every(elem => e.includes(elem))) {
        panel.G = panel.G.filter(x => !e.includes(x));
        panel.F = panel.F.filter(x => e.includes(x));
      }
    })
    // find 6:
    nineSixZero.forEach(e => {
      if (!panel.B.every(elem => e.includes(elem))) {
        panel.B = panel.B.filter(x => !e.includes(x));
        panel.C = panel.C.filter(x => e.includes(x));
      }
    })

    return panel;
  }

  panel = createPanel(input);

  const digitFromPanel = (input) => {
    let letters = input.split('');

    let number = [];

    letters.forEach(letter => {
      Object.keys(panel).forEach(function(key) {
        if (panel[key] == letter) {
          number.push(key);
        }
      })
    })

    if (letters.length == 5) {
      if (number.includes("D") 
        && number.includes("A")
        && number.includes("G")
        && number.includes("F")
        && number.includes("C")
      ) {
        return 5;
      }
      if (number.includes("D") 
        && number.includes("A")
        && number.includes("G")
        && number.includes("B")
        && number.includes("C")
      ) {
        return 3;
      }
      if (number.includes("D") 
        && number.includes("A")
        && number.includes("B")
        && number.includes("G")
        && number.includes("E")
      ) {
        return 2;
      }
    }
    else if (letters.length == 6) {
      if (number.includes("D") 
        && number.includes("E")
        && number.includes("F")
        && number.includes("G")
        && number.includes("A")
        && number.includes("C")
      ) {
        return 6;
      }
      if (number.includes("D") 
        && number.includes("E")
        && number.includes("F")
        && number.includes("A")
        && number.includes("C")
        && number.includes("B")
      ) {
        return 0;
      }
      if (number.includes("D") 
        && number.includes("C")
        && number.includes("B")
        && number.includes("F")
        && number.includes("A")
        && number.includes("G")
      ) {
        return 9;
      }
    }
    else if (letters.length == 2) {
      return 1;
    }
    else if (letters.length == 3) {
      return 7;
    }
    else if (letters.length == 4) {
      return 4;
    }
    else if (letters.length == 7) {
      return 8;
    }
  }

  let rowResult = "";
  output.forEach(o => {
    let digit = digitFromPanel(o);
    rowResult = rowResult + digit.toString();
  })

  counter = counter + parseInt(rowResult);
})

console.log("counter", counter);
