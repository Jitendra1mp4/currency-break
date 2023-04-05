import readlineSync from 'readline-sync';
const availableNotes = [2000, 500, 100, 50, 20, 10, 5, 1];
var requiredNotes = {
  2000: "",
  500: "",
  100: "",
  50: "",
  20: "",
  10: "",
  5: "",
  1: "",
};


function calcRequiredNotes(amount) {
  let remainingAmount = amount, i = 0;
  while (remainingAmount > 0) {
    // Get number of note for remaining amount
    const numberOfNote = parseInt(remainingAmount / availableNotes[i]);
    // log the result
    //  console.log(`number Of ${availableNotes[i]} Note : ${numberOfNote}`);

    // add number of required notes to object
    requiredNotes[availableNotes[i]] = numberOfNote;

    // recalculate the remaining amount
    remainingAmount = remainingAmount % availableNotes[i];

    //increase the counter
    i++;
  }
}

let inputCurrency = 9323;
inputCurrency = readlineSync.question("Enter amount") ;
console.log("inputCurrency : " + inputCurrency);
//call function to calculate required change of note
calcRequiredNotes(inputCurrency);
console.log(requiredNotes);
