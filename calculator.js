function createCalculator(display) {
  const previousCalc = display.querySelector('.previousCalc');
  const currentDigits = display.querySelector('.currentDigits');
  let isNewNumber = true;
  let prevNumber = 0;
  let currNumber;
  let prevOperator;
  let currOperator;
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
    if (calculated) {
      updatePreviousCalc('');
      prevOperator = undefined;
    }
    updateDisplayDigits(number);
  };

  const removeLastDigit = () => {
    let newNumber = getDisplayDigits().slice(0, -1);
    if (newNumber === '') {
      newNumber = '0';
    }
    if (!isNewNumber) {
      isNewNumber = true;
      updateDisplayDigits(newNumber);
    }

    if (calculated) {
      updatePreviousCalc('');
      prevOperator = undefined;
    }
  };

  const selectOperator = (operatorParam) => {
    if (isNewNumber) {
      prevNumber = getDisplayDigits();
    } else {
      prevNumber = calculate(prevNumber, getDisplayDigits());
      isNewNumber = true;
    }
    currNumber = undefined;
    prevOperator = undefined;
    currOperator = operatorParam;
    isNewNumber = true;
    updateDisplayDigits(calculate());
    isNewNumber = true;
    calculated = false;
  };

  const equal = () => {
    currNumber = currNumber ?? getDisplayDigits();
    prevNumber = calculate();
    isNewNumber = true;
    updateDisplayDigits(prevNumber);
    isNewNumber = true;
    calculated = true;
    prevOperator = currOperator;
    currOperator = undefined;
  };

  const calculate = (num1, num2) => {
    num1 = num1 ?? prevNumber;
    num2 = num2 ?? currNumber;

    if (num2 === undefined) {
      updatePreviousCalc(`${num1} ${currOperator}`);
      return num1;
    }

    if (currOperator === undefined) {
      if (prevOperator === undefined) {
        updatePreviousCalc(`${getDisplayDigits()} =`);
        return getDisplayDigits();
      }
      currOperator = prevOperator;
      prevOperator = undefined;
    }

    if (currOperator === '/' && Number(usePoint(num2)) === 0) {
      alert('Erro: divisão por zero resulta em um valor indeterminado.');
      clearCalc();
      return 0;
    }

    updatePreviousCalc(`${num1} ${currOperator} ${num2} =`);
    num1 = Number(usePoint(num1));
    num2 = Number(usePoint(num2));
    let result = eval(`${num1}${currOperator}${num2}`);

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
    if (calculated) {
      updatePreviousCalc('');
      prevOperator = undefined;
    }
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

  const useComma = (number) =>
    number.toString().replace(',', '').replace('.', ',');

  const usePoint = (number) =>
    number.toString().replace('.', '').replace(',', '.');

  const clearDisplay = () => {
    isNewNumber = true;
    updateDisplayDigits('0');
    if (calculated) {
      updatePreviousCalc('');
      isNewNumber = true;
      prevNumber = 0;
      prevOperator = undefined;
    }
  };

  const clearCalc = () => {
    clearDisplay();
    updatePreviousCalc('');
    isNewNumber = true;
    prevNumber = 0;
    currNumber = undefined;
    prevOperator = undefined;
    currOperator = undefined;
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
    getCalc: getPreviousCalc,
  };
}

export { createCalculator };
