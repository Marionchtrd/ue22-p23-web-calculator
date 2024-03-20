/*
  Nom : Marion Chatard
*/


// NOTE: 
// This is the starter file for a blog post "How to build a calculator". You can follow the lesson at https://zellwk.com/blog/calculator-part-1

// # START EDITING YOUR JAVASCRIPT HERE

// ===============

<html lang="en" >
<head>
  <meta charset="UTF-8">
  <title>Calculator starter</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css">
<link rel="stylesheet" href="./style.css">

</head>
<body>
<!-- partial:index.partial.html -->
<div class="container">
    <p>
      This component works exactly like the calculator you know. Click any number to start calculating!
    </p>
    <div class="calculator">
      <div class="calculator__display">0</div>

      <div class="calculator__keys">
        <button class="key--operator" data-action="add">+</button>
        <button class="key--operator" data-action="subtract">-</button>
        <button class="key--operator" data-action="multiply">&times;</button>
        <button class="key--operator" data-action="divide">÷</button>
        <button>7</button>
        <button>8</button>
        <button>9</button>
        <button>4</button>
        <button>5</button>
        <button>6</button>
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button>0</button>
        <button data-action="decimal">.</button>
        <button data-action="clear">AC</button>
        <button class="key--equal" data-action="calculate">=</button>
      </div>
    </div>
  </div>
<!-- partial -->
  <script  src="./script.js"></script>


<style>
  :root {
    font-family: Helvetica, Arial, sans-serif;
  }

  html {
    font-size: 175%;
    font-weight: 300;
    line-height: 1.3;
  }

  body {
    align-items: center;
    background-image: linear-gradient(236deg, #74ebd5, #acb6e5);
    display: flex;
    height: 100vh;
    justify-content: center;
    margin: 0;
  }

  /* Responsive Images */
  embed,
  iframe,
  img,
  object,
  video {
    max-width: 100%;
  }

  .container {
    max-width: 20em;
  }

  .container > p {
    text-align: center;
  }

  .calculator {
    border-radius: 12px;
    box-shadow: 0 0 40px 0px rgba(0, 0, 0, 0.15);
    margin-left: auto;
    margin-right: auto;
    margin-top: 2em;
    max-width: 15em;
    overflow: hidden;
  }

  .calculator__display {
    background-color: #222222;
    color: #fff;
    font-size: 1.714285714em;
    padding: 0.5em 0.75em;
    text-align: right;
  }

  .calculator__keys {
    background-color: #999;
    display: grid;
    grid-gap: 1px;
    grid-template-columns: repeat(4, 1fr);
  }

  .calculator__keys > * {
    background-color: #fff;
    padding: 0.5em 1.25em;
    position: relative;
    text-align: center;
  }

  .calculator__keys > *:active::before,
  .calculator__keys > .is-depressed::before {
    background-color: rgba(0, 0, 0, 0.2);
    bottom: 0;
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5) inset;
    content: "";
    left: 0;
    opacity: 0.3;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 1;
  }

  .key--operator {
    background-color: #eee;
  }

  .key--equal {
    background-image: linear-gradient(to bottom, #fe886a, #ff7033);
    grid-column: -2;
    grid-row: 2/span 4;
  }
</style>
<jscript>
  const calculator = {
      displayValue: '0',
      firstOperand: null,
      waitingForSecondOperand: false,
      operator: null,
    };

    function updateDisplay() {
      const display = document.querySelector('.calculator__display');
      display.textContent = calculator.displayValue;
    }

    updateDisplay();

    const keys = document.querySelector('.calculator__keys');
    keys.addEventListener('click', (event) => {
      const { target } = event;
      if (!target.matches('button')) {
        return;
      }

      if (target.classList.contains('key--operator')) {
        handleOperator(target.textContent);
        updateDisplay();
        return;
      }

      if (target.dataset.action === 'clear') {
        resetCalculator();
        updateDisplay();
        return;
      }

      if (target.dataset.action === 'decimal') {
        inputDecimal(target.textContent);
        updateDisplay();
        return;
      }

      if (target.dataset.action === 'calculate') {
        performCalculation();
        updateDisplay();
        return;
      }

      inputDigit(target.textContent);
      updateDisplay();
    });

    function inputDigit(digit) {
      const { displayValue, waitingForSecondOperand } = calculator;

      if (waitingForSecondOperand === true) {
        calculator.displayValue = digit;
        calculator.waitingForSecondOperand = false;
      } else {
        calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
      }
    }

    function inputDecimal(dot) {
      if (!calculator.displayValue.includes(dot)) {
        calculator.displayValue += dot;
      }
    }
    function handleOperator(nextOperator) {
      const { firstOperand, displayValue, operator } = calculator;
      const inputValue = parseFloat(displayValue);

      if (operator && calculator.waitingForSecondOperand) {
        calculator.operator = nextOperator;
        return;
      }

      if (firstOperand == null && !isNaN(inputValue)) {
        calculator.firstOperand = inputValue;
      } else if (operator) {
        const result = calculate(firstOperand, inputValue, operator);

        calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
        calculator.firstOperand = result;
      }

      calculator.waitingForSecondOperand = true;
      calculator.operator = nextOperator;
    }

    function calculate(firstOperand, secondOperand, operator) {
      if (operator === '+') {
        return firstOperand + secondOperand;
      } else if (operator === '-') {
        return firstOperand - secondOperand;
      } else if (operator === '*') {
        return firstOperand * secondOperand;
      } else if (operator === '/') {
        return firstOperand / secondOperand;
      }

      return secondOperand;
    }

    function resetCalculator() {
      calculator.displayValue = '0';
      calculator.firstOperand = null;
      calculator.waitingForSecondOperand = false;
      calculator.operator = null;
    }

    function performCalculation() {
      let result = 0;
      let secondOperand = parseFloat(calculator.displayValue);

      if (calculator.operator && calculator.firstOperand != null) {
        result = calculate(calculator.firstOperand, secondOperand, calculator.operator);
        calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
        calculator.firstOperand = result;
        calculator.waitingForSecondOperand = false;
        calculator.operator = null;
      }
    }
    
</jscript>
</body>
</html>