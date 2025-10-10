const fs = require('fs');

// part 1
find2020 = (input, element) => {
  input.forEach(item => {
    if (parseInt(item) + parseInt(element) == 2020) {
      console.log("solution: ", item*element);
    }
  })
}

// part 2
find2020InThrees = (arr1, arr2, element) => {
  arr1.forEach(arr1Item => {
    arr2.forEach(arr2Item => {
      if (parseInt(arr1Item) + parseInt(arr2Item) + parseInt(element) == 2020) {
        console.log("solution: ", arr1Item*arr2Item*element);
      }
    })
  })
}

let input = fs.readFileSync('input01.txt', 'utf8').split('\n');

input.forEach(element => find2020(input, element));
input.forEach(element => find2020InThrees(input, input, element));
