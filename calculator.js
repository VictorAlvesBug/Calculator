function createCalculator(display) {
  const previousCalc = display.querySelector(".previousCalc");
  const currentDigits = display.querySelector(".currentDigits");
  let isNewNumber = true;
  let prevNumber = 0;
  let currNumber;
  let operator;

  const updateDisplay = (numberOrComma) => {
    const isZero = currentDigits.innerText === "0";
    if (isNewNumber || isZero) {
      currentDigits.innerText = numberOrComma;
      isNewNumber = false;
    } else currentDigits.innerText += numberOrComma;
  };

  const updatePreviousCalc = strCalc => {
    //const temp = previousCalc.innerText;
    previousCalc.innerText = strCalc;
    //console.log(`${temp} ${strCalc}`)
  };

  const removeLastDigit = () => {
    isNewNumber = true;
    updateDisplay(currentDigits.innerText.slice(0, -1));
  };

  const selectOperator = (operatorParam) => {
      if (isNewNumber) {
          prevNumber = currentDigits.innerText;
        } else {
            prevNumber = calc(prevNumber, currentDigits.innerText);
            isNewNumber = true;
        }
        currNumber = undefined;
        operator = operatorParam;
    currentDigits.innerText = calc();
  };

  const equal = () => {
    isNewNumber = true;
    currNumber = currNumber ?? currentDigits.innerText;
    prevNumber = calc();
    currentDigits.innerText = prevNumber;
  };

  const calc = (num1, num2) => {
    num1 = num1 ?? prevNumber;
    num2 = num2 ?? currNumber;

    if (num2 === undefined) {
      updatePreviousCalc(`${num1} ${operator}`);
      return num1;
    }

    if (operator === undefined) {
      updatePreviousCalc(`${currentDigits.innerText} =`);
      return currentDigits.innerText;
    }

    if(operator === '/' && Number(usePoint(num2)) === 0){
        console.error("Erro: divisão por zero resulta em um valor indeterminado.")
        currNumber = num1;
        return currNumber;
    }

    updatePreviousCalc(`${num1} ${operator} ${num2} =`);
    num1 = Number(usePoint(num1));
    num2 = Number(usePoint(num2));
    let result = eval(`${num1}${operator}${num2}`);
    const maxPrecision = 1_000_000_000;
    result = Math.round(result * maxPrecision) / maxPrecision;
    return useComma(result);
  };

  const invertSignal = () => {
    const newNumber = usePoint(currentDigits.innerText) * -1;
    isNewNumber = true;
    updateDisplay(useComma(newNumber));
  };

  const insertComma = () => {
    const isZero = currentDigits.innerText === "0";
    if (isNewNumber || isZero) {
      return updateDisplay("0,");
    }

    const hasNoComma = !currentDigits.innerText.includes(",");
    if (hasNoComma) {
      updateDisplay(",");
    }
  };

  const useComma = (number) => number.toString().replace(".", ",");

  const usePoint = (number) => number.toString().replace(",", ".");

  const clearDisplay = () => {
    currentDigits.innerText = "0";
  };

  const clearCalc = () => {
    clearDisplay();
    previousCalc.innerText = "";
    isNewNumber = true;
    prevNumber = 0;
    currNumber = undefined;
    operator = undefined;
  };

  return {
    updateDisplay,
    removeLastDigit,
    selectOperator,
    equal,
    invertSignal,
    insertComma,
    clearDisplay,
    clearCalc,
  };
}

export { createCalculator };
