import { createCalculator } from './calculator.js';
import { createTestCalculator } from './testCalculator.js';
import { createKeyboardCalculator } from './keyboardCalculator.js';

const calculator = createCalculator(document.getElementById('display'));
const testCalculator = createTestCalculator(calculator);
const keyboardCalculator = createKeyboardCalculator();

const containerButtonsFunc = {
  '#clearDisplay': () => calculator.clearDisplay(),
  '#clearCalc': () => calculator.clearCalc(),
  '#backspace': () => calculator.removeLastDigit(),
  '[id*=key]': ({ target }) => calculator.insertDigit(target.innerText),
  '[id*=Operator]': ({ target }) => {
    const operators = {
      divideOperator: '/',
      timesOperator: '*',
      minusOperator: '-',
      plusOperator: '+',
    };
    calculator.selectOperator(operators[target.id]);
  },
  '#inverter': () => calculator.invertSignal(),
  '#decimal': () => calculator.insertComma(),
  '#equal': () => calculator.equal(),
};

Object.entries(containerButtonsFunc).forEach(([selector, func]) => {
  document
    .querySelectorAll(selector)
    .forEach((button) =>
      button.addEventListener('click', (event) => func(event))
    );
});

const btnTestCalculator = document.querySelector('.test-calculator');

btnTestCalculator.addEventListener('click', () => {
  testCalculator.runTests();
});

document.addEventListener('keyup', ({ key }) => {
  keyboardCalculator.pressKey(key);
});
