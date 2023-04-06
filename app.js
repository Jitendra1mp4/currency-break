const availableNotes = [2000, 500, 200, 100, 50, 20, 10, 5, 1];
const table = document.querySelector(".output-table");
const paraErrorMsg = document.querySelector(".para-error-msg");


function calcRequiredNotes(amount, reqNots) {
  let remainingAmount = amount,
    i = 0;
  while (remainingAmount > 0) {
    // Get number of note for remaining amount
    const numberOfNote = parseInt(remainingAmount / availableNotes[i]);
    // log the result
    //  console.log(`number Of ${availableNotes[i]} Note : ${numberOfNote}`);

    // add number of required notes to object
    reqNots[availableNotes[i]] = numberOfNote;

    // recalculate the remaining amount
    remainingAmount = remainingAmount % availableNotes[i];
    //increase the counter
    i++;
  }
  return reqNots;
}

function addToDocument(reqNots) {
  const tbody = document.getElementById("currency-change-tab-body");
  while (tbody.hasChildNodes()) {
    tbody.removeChild(tbody.lastChild);
  }
  let i = 0;
  for (let key in reqNots) {
    let row = document.createElement("tr");
    if (i % 2 === 0) row.className = "row-even";
    else row.className = "row-odd";
    let currencyValueCell = document.createElement("td");
    let currencyQuantityCell = document.createElement("td");
    currencyValueCell.innerHTML = key;
    currencyQuantityCell.innerHTML = reqNots[key];
    row.appendChild(currencyValueCell);
    row.appendChild(currencyQuantityCell);
    tbody.appendChild(row);
    i++ ;
  }
}

// inputCurrency = readlineSync.question("Enter amount") ;
//call function to calculate required change of note

function calculateClickHandler() {
  const inputCurrency = document.getElementById("input-amount").value;
  const requiredNotes = {
    2000: "",
    500: "",
    200 : "",
    100: "",
    50: "",
    20: "",
    10: "",
    5: "",
    1: "",
  };
  if(inputCurrency>=1){
    let reqNots = calcRequiredNotes(inputCurrency, requiredNotes);
    addToDocument(reqNots);
    table.style.display = "block" ;
    paraErrorMsg.style.display = "none" ;
    
  }else{
    table.style.display = "none" ;
    paraErrorMsg.innerText = "Amount should be greater then 0."
    paraErrorMsg.style.display = "block" ;
  }
  // console.log("inputCurrency : " + inputCurrency);
  // console.log(reqNots);
}
