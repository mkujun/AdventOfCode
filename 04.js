const fs = require('fs');

let input = fs.readFileSync('input04.txt', 'utf8').split('\n');
let passport = '';
let counter = 0;

// part 1
validPassport = (row) => {
  if (
    row.includes("byr") 
    && row.includes("hgt")
    && row.includes("iyr")
    && row.includes("eyr")
    && row.includes("hcl")
    && row.includes("ecl")
    && row.includes("pid")
  ){
    // part 2
    if (
      byrValidation(row) &&
      hgtValidation(row) &&
      iyrValidation(row) &&
      eyrValidation(row) &&
      hclValidation(row) &&
      eclValidation(row) &&
      pidValidation(row)
    ){
      counter++;
    }
  }
}

// duplicate code in next bry, eyr and iyr but kept it for consistency...
byrValidation = (row) => {
  let byr = row.indexOf("byr");

  let slajs = row.slice(byr, byr + 8).slice(4,8);

  let birthYear = parseInt(slajs);

  if(birthYear >= 1920 && birthYear <=2002) {
    return true;
  }
  else {
    return false;
  }
}

eyrValidation = (row) => {
  let eyr = row.indexOf("eyr");

  let slajs = row.slice(eyr, eyr + 8).slice(4,8);

  let expirationYear = parseInt(slajs);

  if (expirationYear >= 2020 && expirationYear <= 2030) {
    return true;
  }
  else {
    return false;
  }
}

iyrValidation = (row) => {
  let iyr = row.indexOf("iyr");

  let slajs = row.slice(iyr, iyr + 8).slice(4,8);
  let issueYear = parseInt(slajs);

  if (issueYear >= 2010 && issueYear <=2020) {
    return true;
  }

  else {
    return false;
  }
}

hgtValidation = (row) => {
  let hgt = row.indexOf("hgt");

  let slajs = row.slice(hgt, hgt + 10);

  if (slajs.includes("cm")) {

    let cm = parseInt(slajs.slice(4,7));

    if (cm >= 150 && cm <=193) {
      return true;
    }
  }
  else if (slajs.includes("in")) {

    let inch = parseInt(slajs.slice(4,7));

    if (inch >=59 && inch <=76) {
      return true;
    }
  }
  else {
    return false;
  }
}

hclValidation = (row) => {
  let hcl = row.indexOf("hcl");
  let slajs = row.slice(hcl + 4, hcl + 11);

  let regie = /^[#][a-f0-9]{6}$/g;

  let found = slajs.match(regie);

  if (found != null) {
    return true;
  }
  else {
    return false;
  }
}

eclValidation = (row) => {
  let ecl = row.indexOf("ecl");

  let slajs = row.slice(ecl + 4, ecl + 7);

  if (
    slajs === "amb" || 
    slajs === "blu" || 
    slajs === "brn" || 
    slajs === "gry" || 
    slajs === "grn" || 
    slajs === "hzl" || 
    slajs === "oth"
  ) {
    return true;
  }
  else {
    return false;
  }
}

pidValidation = (row) => {
  let pid = row.indexOf("pid");
  let slajs = row.slice(pid + 4, pid + 13);

  let regie = /^[0-9]{9}$/;

  let found = slajs.match(regie);

  if (found != null) {
    return true;
  }
  else {
    return false;
  }
}

input.forEach(row => {
  if (row === "") {
    validPassport(passport);

    passport = '';
  }
  else {
    passport = passport + row + ' ';
  }
  
})

console.log("counter:", counter);
