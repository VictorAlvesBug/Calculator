
// Factory responsável pela manipulação e funcionamento da calculadora
function createCalculator(display) {
  const previousCalc = display.querySelector('.previousCalc');
  const currentDigits = display.querySelector('.currentDigits');
  let isNewNumber = true;
  let prevNumber = 0;
  let currNumber;
  let prevOperator;
  let currOperator;
  let calculated = false;

  // Recupera valor do display principal
  const getDisplayDigits = () => {
    return currentDigits.innerText;
  };

  // Atualiza valor do display principal
  const updateDisplayDigits = (number) => {
    const isZero = getDisplayDigits() === '0';
    if (isNewNumber || isZero) {
      currentDigits.innerText = number;
      isNewNumber = false;
    } else currentDigits.innerText += number;
  };

  // Recupera valor do cálculo executado
  const getPreviousCalc = () => {
    return previousCalc.innerText;
  };

  // Atualiza valor do cálculo executado
  const updatePreviousCalc = (strCalc) => {
    previousCalc.innerText = strCalc;
  };

  // Computa números digitados e, caso seja uma conta independente, limpa cálculo
  const insertDigit = (number) => {
    if (calculated) {
      updatePreviousCalc('');
      prevOperator = undefined;
    }
    updateDisplayDigits(number);
  };

  // Apaga o último dígito computado
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

  // Define qual operador deve ser utilizado
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

  // Recupera valores e executa o cálculo solicitado
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

  // Executa o cálculo solicitado
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

  // Alterna o número do display principal entre negativo e positivo
  const invertSignal = () => {
    const newNumber = usePoint(getDisplayDigits()) * -1;
    isNewNumber = true;
    if (calculated) {
      updatePreviousCalc('');
      prevOperator = undefined;
    }
    updateDisplayDigits(useComma(newNumber));
  };

  // Insere uma vírgula no display principal
  const insertComma = () => {
    if (calculated) {
      updatePreviousCalc('');
      prevOperator = undefined;
    }

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

  // Substitui ponto por vírgula. Exemplo: '12.34' para '12,34'
  const useComma = (number) =>
  number.toString().replace(',', '').replace('.', ',');
  
  // Substitui vírgula por ponto. Exemplo: '12,34' para '12.34'
  const usePoint = (number) =>
    number.toString().replace('.', '').replace(',', '.');

    // Limpa display principal e, caso o cálculo atual já tenha sido resolvido,
    // limpa display do cálculo
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

  // Limpa todo o display e a memória da calculadora
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
