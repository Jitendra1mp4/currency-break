const availableNotes = [2000, 500, 200, 100, 50, 20, 10, 5, 1];
const inputBillAmount = document.getElementById("bill-amount");

const inputCashReceived = document.getElementById("cash-received");
const btnCalculate = document.getElementById("btn-calculate");
const table = document.querySelector(".output-table");
const cashInputContainer = document.querySelector(".cash-input-container");
const paraErrorMsg = document.querySelector(".para-error-msg");

function calcRequiredNotes(amount) {
  const requiredNotes = {
    2000: "",
    500: "",
    200: "",
    100: "",
    50: "",
    20: "",
    10: "",
    5: "",
    1: "",
  };
  let remainingAmount = amount,
    i = 0;
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
  return requiredNotes;
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
    i++;
  }
}

// cashReceived = readlineSync.question("Enter amount") ;
//call function to calculate required change of note
function manageDisplay(returnableAmount) {
  if (returnableAmount >= 1) {
    const reqNots = calcRequiredNotes(returnableAmount);
    addToDocument(reqNots);
    table.style.display = "block";
    paraErrorMsg.style.display = "block";
    paraErrorMsg.style.color = "green";
    paraErrorMsg.style.backgroundColor = "#eeffee";
    paraErrorMsg.innerText = "Returnable amount : " + returnableAmount;
  } else {
    table.style.display = "none";
    paraErrorMsg.style.backgroundColor = "rgba(255, 0, 0, 0.178)";
    paraErrorMsg.style.color = "red";
    paraErrorMsg.innerText =
      "Received cash should be greater then Bill amount.";
    paraErrorMsg.style.display = "block";
  }
}

function calculateHandler() {
  const billAmount = inputBillAmount.value;
  const cashReceived = inputCashReceived.value;
  const returnableAmount = cashReceived - billAmount;
  manageDisplay(returnableAmount);
}
btnCalculate.addEventListener("click", calculateHandler);
inputCashReceived.addEventListener("change", calculateHandler);
inputBillAmount.addEventListener("change", (e) => {
  console.log(e.target.value);
  if (e.target.value <= 0) {
    cashInputContainer.style.display = "none";
  } else {
    cashInputContainer.style.display = "block";
  }
});
