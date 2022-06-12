const display = document.getElementById('display');
const keys = document.querySelectorAll("[id*=key]");
const operators = document.querySelectorAll("[id*=Operator]")

let isNewNumber = true;
let operator;
let previousNumber;

function updateDisplay(number) {
    if(isNewNumber)
    { 
        display.innerText = number.toString();
        isNewNumber = false;
    }
    else display.innerText += number.toString();
}

const insertNumber = ({ target }) => {
    updateDisplay(target.innerText);
}

const selectOperator = ({target}) => {
    operator = target.textContent;
    previousNumber = display.textContent;
    isNewNumber = true;
}

const isNumber = (text) => {
    const validNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    return validNumbers.includes(text)
}

const calculate = () => { 
    isNewNumber = true;
    const currentNumber = display.innerText;
    //if(previousNumber)
    let txtEval = `${previousNumber}${operator}${currentNumber}`;
    result = eval(txtEval.replace(',', '.'))
    updateDisplay(result)
}

const equal = document.querySelector("#equal");

equal.addEventListener('click', calculate);

const clearDisplay = () => display.innerText = "";

document.querySelector("#clearDisplay").addEventListener("click", clearDisplay);

const clearCalc = () => { 
    clearDisplay();
    isNewNumber = true;
    operator = undefined;
    previousNumber = undefined;
};

document.querySelector("#clearCalc").addEventListener("click", clearCalc);

const removeLastNumber = () => { 
    isNewNumber = true
    updateDisplay(display.innerText.slice(0, -1));
};

document.querySelector("#backspace").addEventListener("click", removeLastNumber);

const invertSignal = () => { 
    isNewNumber = true;
    updateDisplay(display.innerText * -1);
}

document.querySelector("#inverter").addEventListener("click", invertSignal);

keys.forEach(key => key.addEventListener('click', insertNumber));


operators.forEach(operator => operator.addEventListener('click', selectOperator));

document.querySelector('#decimal').addEventListener(() => {
    const isDisplayEmpty = display.innerText.length === 0;
    const isCommaAlreadyAdded = display.innerText.includes(',');

    if(isDisplayEmpty){
        updateDisplay('0,')
        return;
    }

    if(isCommaAlreadyAdded){
        return;
    }

    updateDisplay('0,')
})

/*

var numeroVar;
let numeroLet;

for(var iVar=0; iVar<5; iVar++){
    numeroVar = iVar;
    numeroLet = iVar;
    setTimeout(() => {
        console.log({iVar, numeroVar, numeroLet})
    }, 0)
}

for(let iLet=0; iLet<5; iLet++){
    numeroVar = iLet;
    numeroLet = iLet;
    setTimeout(() => {
        console.log({iLet, numeroVar, numeroLet})
    }, 0)
}

*/