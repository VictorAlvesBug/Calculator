import { createCalculator } from "./calculator.js";

const calculator = createCalculator(document.getElementById('display'));

const containerButtonsFunc = {
    '#clearDisplay': () => calculator.clearDisplay(),
    '#clearCalc': () => calculator.clearCalc(),
    '#backspace': () => calculator.removeLastDigit(),
    '[id*=key]': ({target}) => calculator.updateDisplay(target.innerText),
    '[id*=Operator]': ({target}) => calculator.selectOperator(target.innerText),
    '#inverter': () => calculator.invertSignal(),
    '#decimal': () => calculator.insertComma(),
    '#equal': () => calculator.equal()
};

Object.entries(containerButtonsFunc).forEach(([selector, func]) => {
    document.querySelectorAll(selector)
        .forEach(button => button
            .addEventListener('click', (event) => func(event)));
})

