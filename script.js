let displayValue = "0";
let firstOperand = null;
let waitingForSecondOperand = false;
let operator = null;

function inputDigit(digit) {
  if (waitingForSecondOperand === true) {
    displayValue = digit;
    waitingForSecondOperand = false;
  } else {
    displayValue = displayValue === "0" ? digit : displayValue + digit;
  }
}

function inputDecimal(dot) {
  if (waitingForSecondOperand === true) return;

  if (!displayValue.includes(dot)) {
    displayValue += dot;
  }
}

function handleOperator(nextOperator) {
  const inputValue = parseFloat(displayValue);

  if (operator && waitingForSecondOperand) {
    operator = nextOperator;
    return;
  }

  if (firstOperand == null) {
    firstOperand = inputValue;
  } else if (operator) {
    const result = operate(firstOperand, inputValue, operator);

    displayValue = `${parseFloat(result.toFixed(7))}`;
    firstOperand = result;
  }

  waitingForSecondOperand = true;
  operator = nextOperator;
}

function operate(firstOperand, secondOperand, operator) {
  if (operator === "+") {
    return firstOperand + secondOperand;
  } else if (operator === "-") {
    return firstOperand - secondOperand;
  } else if (operator === "*") {
    return firstOperand * secondOperand;
  } else if (operator === "/") {
    return secondOperand !== 0 ? firstOperand / secondOperand : "Error";
  }

  return secondOperand;
}

function resetCalculator() {
  displayValue = "0";
  firstOperand = null;
  waitingForSecondOperand = false;
  operator = null;
}

function backspace() {
  displayValue = displayValue.slice(0, -1);
  if (displayValue === "") {
    displayValue = "0";
  }
}

function updateDisplay() {
  const display = document.querySelector("#display");
  display.textContent = displayValue;
}

const keys = document.querySelector(".buttons");
keys.addEventListener("click", (event) => {
  const { target } = event;
  if (!target.matches("button")) {
    return;
  }

  if (target.classList.contains("operator")) {
    handleOperator(target.textContent);
    updateDisplay();
    return;
  }

  if (target.classList.contains("equal")) {
    handleOperator("=");
    updateDisplay();
    return;
  }

  if (target.id === "clear") {
    resetCalculator();
    updateDisplay();
    return;
  }

  if (target.id === "backspace") {
    backspace();
    updateDisplay();
    return;
  }

  if (target.textContent === ".") {
    inputDecimal(target.textContent);
    updateDisplay();
    return;
  }

  inputDigit(target.textContent);
  updateDisplay();
});

updateDisplay();
