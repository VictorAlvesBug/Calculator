// Importando Factory's dos módulos
import { createCalculator } from './calculator.js';
import { createTestCalculator } from './testCalculator.js';
import { createKeyboardCalculator } from './keyboardCalculator.js';

const display = document.getElementById('display')

// Instanciando factory's
const calculator = createCalculator(display);
const testCalculator = createTestCalculator(calculator);
const keyboardCalculator = createKeyboardCalculator();

// Definindo a ação que deve ser executada por cada botão da calculadora
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

// Dispara a execução da ação na calculadora, de acordo com o botão pressionado
Object.entries(containerButtonsFunc).forEach(([selector, func]) => {
  document.querySelectorAll(selector)
    .forEach((button) =>
      button.addEventListener('click', (event) => {
        // Removendo o foco do botão clicado via Mouse
        // Envitando que o Enter pressione esse botão novamente
        event.target.blur();
        func(event);
      })
    );
});

// Aciona função da calculadora quando a tecla do teclado for solta
document.addEventListener('keyup', ({key}) => {
  keyboardCalculator.pressKey(key);
});

const btnTestCalculator = document.querySelector('.test-calculator');

// Botão responsável por rodar os testes e exibir o feedback no console
btnTestCalculator.addEventListener('click', ({target}) => {
  testCalculator.runTests();
  target.blur()
});
