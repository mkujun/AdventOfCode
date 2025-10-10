const fs = require('fs');
let input = fs.readFileSync("./inputs/04.txt", 'utf8').split('\n').slice(0, -1);

let numbers = input[0].split(",");

let boards = [];

let counter = 0;
let board = [];

// parse input, create boards
for(let i = 2; i <= input.length; i++) {
  if (counter == 5) {
    boards.push(board);
    board = [];
    counter = 0;
  }
  else {
    let row = [];
    let rowNumbers = input[i].match(/\d+/g);

    rowNumbers.forEach(number => {
      row.push({
        number: number,
        marked: false
      })
    })
    board.push(row);
    counter++;
  }
}

//let bingo = false;
let bingoBoard;
let bingoNumber;

const printBingoBoard = (board) => {
  board.forEach(row => {
    row.forEach(n => {
      console.log(n);
    })
    console.log("");
  })
}

const calculate = (board) => {
  let sum = 0;
  board.forEach(row => {
    row.forEach(n => {
      if (!n.marked) {
        sum = sum + parseInt(n.number);
      }
    })
  })

  console.log("part 2", sum * bingoNumber);
}

const searchForBingo = (number) => {
  // row search
  boards.forEach(board => {
    if (!board.bingoOnBoard) {
    
    for(let i = 0; i < 5; i++) {
      let rowCounter = 0;
        for(let j = 0; j < 5; j++) {
          if (board[i][j].marked) {
            rowCounter++;
            if (rowCounter == 5) {
              //bingo = true;
              bingoNumber = number;
              //console.log("bingo");
              console.log("bingoNumber", bingoNumber);
              board.bingoOnBoard = true;
              //printBingoBoard(board);
              calculate(board);
            }
          }
        }
    }

    }

  })

  // column search
  boards.forEach(board => {
    if (!board.bingoOnBoard) {
    
    for(let i = 0; i < 5; i++) {
      let columnCounter = 0;
      for(let j = 0; j < 5; j++) {
          if (board[j][i].marked) {
            columnCounter++;
            if (columnCounter == 5) {
              //bingo = true;
              bingoNumber = number;
              //console.log("bingo");
              console.log("bingoNumber", bingoNumber);
              board.bingoOnBoard = true;
              //printBingoBoard(board);
              calculate(board);
            }
          }
        }
      }

    }

  })
}

// marking boards from input
for (let i = 0; i < numbers.length; i++) {
    // filling out board input
    boards.forEach(board => {
      board.forEach(row => {
        row.forEach(n => {
          if (n.number == numbers[i]) {
            n.marked = true;
          }
        })
      })
    })

    searchForBingo(numbers[i]);
}
