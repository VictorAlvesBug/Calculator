import { createCalculator } from './calculator.js';
import { createTestCalculator } from './testCalculator.js';

const calculator = createCalculator(document.getElementById('display'));
const testCalculator = createTestCalculator(calculator);

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
  const keyboardButtons = {
    0: '#key0',
    1: '#key1',
    2: '#key2',
    3: '#key3',
    4: '#key4',
    5: '#key5',
    6: '#key6',
    7: '#key7',
    8: '#key8',
    9: '#key9',
    '/': '#divideOperator',
    '*': '#timesOperator',
    '-': '#minusOperator',
    '+': '#plusOperator',
    '.': '#decimal',
    ',': '#decimal',
    '=': '#equal',
    Enter: '#equal',
    Escape: '#clearCalc',
    Backspace: '#backspace',
  };

  const selector = keyboardButtons[key];

  if (!selector) return;

  pressButton(selector);
});

function pressButton(selector) {
  const element = document.querySelector(selector);
  if(element){
    var event = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window,
    });
    
    element.dispatchEvent(event);
  }
}
