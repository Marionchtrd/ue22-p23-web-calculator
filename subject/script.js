/*
  Nom : Marion Chatard
*/


// NOTE: 
// This is the starter file for a blog post "How to build a calculator". You can follow the lesson at https://zellwk.com/blog/calculator-part-1

// # START EDITING YOUR JAVASCRIPT HERE

// ===============

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
    