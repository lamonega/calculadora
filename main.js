// Configuración y Estado de la Calculadora
const state = {
  displayValue: '0',
  firstOperand: null,
  operator: null,
  waitingForSecondOperand: false,
};

// Almacenamiento de Elementos del DOM
const DOM = {
  display: document.querySelector('#display'),
  buttons: document.querySelector('.buttons'),
};

// Actualiza la pantalla de la calculadora
const updateDisplay = () => {
  DOM.display.textContent = state.displayValue;
};

// Resetea la calculadora a su estado inicial
const resetCalculator = () => {
  state.displayValue = '0';
  state.firstOperand = null;
  state.operator = null;
  state.waitingForSecondOperand = false;
};

// Realiza cálculos básicos
const calculate = (a, b, operator) => {
  const operations = {
    '+': (x, y) => x + y,
    '-': (x, y) => x - y,
    '*': (x, y) => x * y,
    '/': (x, y) => (y !== 0 ? x / y : 'Error'),
  };
  return operations[operator] ? operations[operator](a, b) : b;
};

// Maneja la entrada de operadores
const handleOperator = (nextOperator) => {
  const { firstOperand, displayValue, operator, waitingForSecondOperand } = state;
  const inputValue = parseFloat(displayValue);

  if (operator && waitingForSecondOperand) {
    state.operator = nextOperator;
    return;
  }

  if (firstOperand === null && !isNaN(inputValue)) {
    state.firstOperand = inputValue;
  } else if (operator) {
    const result = calculate(firstOperand, inputValue, operator);
    state.displayValue = result === 'Error' ? 'Error' : String(parseFloat(result.toFixed(7)));
    state.firstOperand = result === 'Error' ? null : result;
  }

  state.waitingForSecondOperand = true;
  state.operator = nextOperator;
};

// Maneja la entrada de dígitos
const inputDigit = (digit) => {
  if (state.waitingForSecondOperand) {
    state.displayValue = digit;
    state.waitingForSecondOperand = false;
  } else {
    state.displayValue = state.displayValue === '0' ? digit : state.displayValue + digit;
  }
};

// Maneja la entrada del punto decimal
const inputDecimal = (dot) => {
  if (!state.displayValue.includes(dot)) {
    state.displayValue += dot;
  }
};

// Maneja la eliminación de un dígito (backspace)
const handleBackspace = () => {
  state.displayValue = state.displayValue.length > 1 ? state.displayValue.slice(0, -1) : '0';
};

// Maneja los clics en los botones de la calculadora
const handleButtonClick = (event) => {
  const { target } = event;

  if (!target.matches('button')) return;

  const { classes, textContent } = target;

  switch (true) {
    case classes.contains('number'):
      inputDigit(textContent);
      break;
    case classes.contains('decimal'):
      inputDecimal(textContent);
      break;
    case classes.contains('operator'):
      handleOperator(textContent);
      break;
    case classes.contains('equal'):
      handleOperator('=');
      break;
    case classes.contains('clear'):
      resetCalculator();
      break;
    case classes.contains('backspace'):
      handleBackspace();
      break;
    default:
      break;
  }

  updateDisplay();
};

// Inicializa el evento de clic en los botones
DOM.buttons.addEventListener('click', handleButtonClick);

// Inicializa la pantalla al cargar
updateDisplay();