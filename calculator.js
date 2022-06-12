function createCalculator(display) {
  const previousCalc = display.querySelector('.previousCalc');
  const currentDigits = display.querySelector('.currentDigits');
  let isNewNumber = true;
  let prevNumber = 0;
  let currNumber;
  let operator;
  let calculated = false;

  const getDisplayDigits = () => {
    return currentDigits.innerText;
  };

  const updateDisplayDigits = (number) => {
    const isZero = getDisplayDigits() === '0';
    if (isNewNumber || isZero) {
      currentDigits.innerText = number;
      isNewNumber = false;
    } else currentDigits.innerText += number;
  };

  const getPreviousCalc = () => {
    return previousCalc.innerText;
  };

  const updatePreviousCalc = (strCalc) => {
    previousCalc.innerText = strCalc;
  };

  const insertDigit = (number) => {
    if(calculated){
      updatePreviousCalc('')
    }
    updateDisplayDigits(number);
  };

  const removeLastDigit = () => {
    let newNumber = getDisplayDigits().slice(0, -1);
    if (newNumber === '') {
      newNumber = '0';
    }
    if(!isNewNumber){
      isNewNumber = true;
      updateDisplayDigits(newNumber);
    }

    if(calculated){
      updatePreviousCalc('');
    }
  };

  const selectOperator = (operatorParam) => {
    if (isNewNumber) {
      prevNumber = getDisplayDigits();
    } else {
      prevNumber = calc(prevNumber, getDisplayDigits());
      isNewNumber = true;
    }
    currNumber = undefined;
    operator = operatorParam;
    isNewNumber = true;
    updateDisplayDigits(calc());
    isNewNumber = true;
    calculated = false;
  };

  const equal = () => {
    currNumber = currNumber ?? getDisplayDigits();
    prevNumber = calc();
    isNewNumber = true;
    updateDisplayDigits(prevNumber);
    isNewNumber = true;
    calculated = true;
    operator = undefined;
  };

  const calc = (num1, num2) => {
    num1 = num1 ?? prevNumber;
    num2 = num2 ?? currNumber;

    if (num2 === undefined) {
      updatePreviousCalc(`${num1} ${operator}`);
      return num1;
    }

    if (operator === undefined) {
      updatePreviousCalc(`${getDisplayDigits()} =`);
      return getDisplayDigits();
    }

    if (operator === '/' && Number(usePoint(num2)) === 0) {
      alert('Erro: divisão por zero resulta em um valor indeterminado.');
      clearCalc();
      return 0;
    }

    updatePreviousCalc(`${num1} ${operator} ${num2} =`);
    num1 = Number(usePoint(num1));
    num2 = Number(usePoint(num2));
    let result = eval(`${num1}${operator}${num2}`);
    
    const maxDecimalPlacesAmount = 15;
    const intPositiveResult = Math.floor(Math.abs(result));
    const resultLength = intPositiveResult.toString().length;
    const multiplier = Math.pow(10, maxDecimalPlacesAmount - resultLength);
    result = Math.round(result * multiplier) / multiplier;
    return useComma(result);
  };

  const invertSignal = () => {
    const newNumber = usePoint(getDisplayDigits()) * -1;
    isNewNumber = true;
    updateDisplayDigits(useComma(newNumber));
  };

  const insertComma = () => {
    const isZero = getDisplayDigits() === '0';
    if (isNewNumber || isZero) {
      isNewNumber = true;
      return updateDisplayDigits('0,');
    }

    const hasNoComma = !getDisplayDigits().includes(',');
    if (hasNoComma) {
      updateDisplayDigits(',');
    }
  };

  const useComma = (number) => number.toString().replace(',', '').replace('.', ',');

  const usePoint = (number) => number.toString().replace('.', '').replace(',', '.');

  const clearDisplay = () => {
    isNewNumber = true;
    updateDisplayDigits('0');
    if(calculated) {
      updatePreviousCalc('');
      isNewNumber = true;
      prevNumber = 0;
    }
  };

  const clearCalc = () => {
    clearDisplay();
    updatePreviousCalc('');
    isNewNumber = true;
    prevNumber = 0;
    currNumber = undefined;
    operator = undefined;
    calculated = false;
  };

  return {
    insertDigit,
    removeLastDigit,
    selectOperator,
    equal,
    invertSignal,
    insertComma,
    clearDisplay,
    clearCalc,
    getResult: getDisplayDigits,
    getCalc: getPreviousCalc
  };
}

export { createCalculator };
