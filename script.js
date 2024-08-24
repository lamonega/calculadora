// Variables globales
let displayValue = '0';
let firstOperand = null;
let currentOperator = null;
let waitingForSecondOperand = false;

// Actualiza el contenido de la pantalla de la calculadora
const updateDisplay = () => {
  document.querySelector('#display').textContent = displayValue;
};

// Resetea todos los valores de la calculadora
const resetCalculator = () => {
  displayValue = '0';
  firstOperand = null;
  currentOperator = null;
  waitingForSecondOperand = false;
};

// Calcula el resultado de la operación actual
const calculate = (a, b, operator) => {
  switch (operator) {
    case '+': return a + b;
    case '-': return a - b;
    case '*': return a * b;
    case '/': return b !== 0 ? a / b : 'Error';
    default: return b;
  }
};

// Maneja la entrada del operador
const handleOperator = (operator) => {
  const inputValue = parseFloat(displayValue);

  if (currentOperator && waitingForSecondOperand) {
    currentOperator = operator;
    return;
  }

  if (firstOperand === null) {
    firstOperand = inputValue;
  } else if (currentOperator) {
    const result = calculate(firstOperand, inputValue, currentOperator);
    displayValue = result === 'Error' ? result : `${parseFloat(result.toFixed(7))}`;
    firstOperand = result === 'Error' ? null : result;
  }

  waitingForSecondOperand = true;
  currentOperator = operator;
};

// Maneja la entrada de un dígito
const inputDigit = (digit) => {
  if (waitingForSecondOperand) {
    displayValue = digit;
    waitingForSecondOperand = false;
  } else {
    displayValue = displayValue === '0' ? digit : displayValue + digit;
  }
};

// Maneja la entrada del punto decimal
const inputDecimal = (dot) => {
  if (!displayValue.includes(dot)) {
    displayValue += dot;
  }
};

// Maneja el evento de clic en los botones
const handleButtonClick = (event) => {
  const { target } = event;

  if (!target.matches('button')) return;

  const value = target.textContent;

  if (target.classList.contains('number')) {
    inputDigit(value);
  } else if (target.classList.contains('decimal')) {
    inputDecimal(value);
  } else if (target.classList.contains('operator')) {
    handleOperator(value);
  } else if (target.classList.contains('equal')) {
    handleOperator('=');
  } else if (target.classList.contains('clear')) {
    resetCalculator();
  } else if (target.classList.contains('backspace')) {
    displayValue = displayValue.length > 1 ? displayValue.slice(0, -1) : '0';
  }

  updateDisplay();
};

// Inicializa el evento de clic en los botones
document.querySelector('.buttons').addEventListener('click', handleButtonClick);

// Inicializa la pantalla
updateDisplay();
