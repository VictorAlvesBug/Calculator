const tests = [
  /* Operações básicas */
  {
    buttonsToPress: ['12', '+', '34', '='],
    targetResult: '46',
    targetCalc: '12 + 34 =',
  },
  {
    buttonsToPress: ['10,2', '-', '25', '='],
    targetResult: '-14,8',
    targetCalc: '10,2 - 25 =',
  },
  {
    buttonsToPress: ['32', '*', '45,2', '='],
    targetResult: '1446,4',
    targetCalc: '32 * 45,2 =',
  },
  {
    buttonsToPress: ['62', '/', '50', '='],
    targetResult: '1,24',
    targetCalc: '62 / 50 =',
  },
  /* Operações com zero */
  {
    buttonsToPress: ['54', '+', '0', '='],
    targetResult: '54',
    targetCalc: '54 + 0 =',
  },
  {
    buttonsToPress: ['0', '+', '47', '='],
    targetResult: '47',
    targetCalc: '0 + 47 =',
  },
  {
    buttonsToPress: ['30', '-', '0', '='],
    targetResult: '30',
    targetCalc: '30 - 0 =',
  },
  {
    buttonsToPress: ['0', '-', '21', '='],
    targetResult: '-21',
    targetCalc: '0 - 21 =',
  },
  {
    buttonsToPress: ['88', '*', '0', '='],
    targetResult: '0',
    targetCalc: '88 * 0 =',
  },
  {
    buttonsToPress: ['00', '*', '7', '='],
    targetResult: '0',
    targetCalc: '0 * 7 =',
  },
  {
    buttonsToPress: ['00', '/', '91', '='],
    targetResult: '0',
    targetCalc: '0 / 91 =',
  },
  /* Divisão que resulta em dízima periódica */
  {
    buttonsToPress: ['5', '/', '3', '='],
    targetResult: '1,66666666666667',
    targetCalc: '5 / 3 =',
  },
  {
    buttonsToPress: ['250', '/', '3', '='],
    targetResult: '83,3333333333333',
    targetCalc: '250 / 3 =',
  },
  {
    buttonsToPress: ['20', '/', '70', '='],
    targetResult: '0,28571428571429',
    targetCalc: '20 / 70 =',
  },
  /* Divisão por zero --> indefinido */
  {
    buttonsToPress: ['6', '/', '0', '='],
    targetResult: '0',
    targetCalc: '',
  },
  /* Cálculo iniciado */
  {
    buttonsToPress: ['5', '+'],
    targetResult: '5',
    targetCalc: '5 +',
  },
  /* Alteração de operador */
  {
    buttonsToPress: ['5', '+', '*'],
    targetResult: '5',
    targetCalc: '5 *',
  },
  /* Cálculo iniciado e pressionado 'clearDisplay' */
  {
    buttonsToPress: ['6', '*', 'CE'],
    targetResult: '0',
    targetCalc: '6 *',
  },
  /* Cálculo iniciado e pressionado 'clearCalc' */
  {
    buttonsToPress: ['7', '/', 'C'],
    targetResult: '0',
    targetCalc: '',
  },
  /* Cálculo finalizado e pressionado 'clearDisplay' */
  {
    buttonsToPress: ['13', '+', '25', '=', 'CE'],
    targetResult: '0',
    targetCalc: '',
  },
  /* Cálculo finalizado e pressionado 'clearCalc' */
  {
    buttonsToPress: ['17', '+', '21', '=', 'C'],
    targetResult: '0',
    targetCalc: '',
  },
  /* Cálculo finalizado e iniciado novo cálculo (independente do resultado) */
  {
    buttonsToPress: ['11', '+', '23', '=', '5'],
    targetResult: '5',
    targetCalc: '',
  },
  /* Cálculo finalizado e iniciado novo cálculo (depende do resultado) */
  {
    buttonsToPress: ['31', '+', '43', '=', '*'],
    targetResult: '74',
    targetCalc: '74 *',
  },
  /* Cálculo finalizado e iniciado novo cálculo (depende do resultado) */
  {
    buttonsToPress: ['50', '+', '65', '=', '-'],
    targetResult: '115',
    targetCalc: '115 -',
  },
  /* Cálculo finalizado, iniciado novo cálculo e pressionado 'clearDisplay' */
  {
    buttonsToPress: ['16', '+', '24', '=', '5', 'CE'],
    targetResult: '0',
    targetCalc: '',
  },
  /* Cálculo finalizado, iniciado novo cálculo e pressionado 'clearCalc' */
  {
    buttonsToPress: ['16', '+', '24', '=', '5', 'C'],
    targetResult: '0',
    targetCalc: '',
  },
  /* Cálculo finalizado, selecionado operador, e pressionado 'clearDisplay' */
  {
    buttonsToPress: ['16', '+', '24', '=', '*', 'CE'],
    targetResult: '0',
    targetCalc: '40 *',
  },
  /* Cálculo finalizado, selecionado operador, e pressionado 'clearDisplay' */
  {
    buttonsToPress: ['7', '+', '8', '=', '/', 'C'],
    targetResult: '0',
    targetCalc: '',
  },
  /* Cálculo com vígula */
  {
    buttonsToPress: ['5', '/', '2', '='],
    targetResult: '2,5',
    targetCalc: '5 / 2 =',
  },
  {
    buttonsToPress: ['1,2', '/', '0,2', '='],
    targetResult: '6',
    targetCalc: '1,2 / 0,2 =',
  },
  /* Cálculo com vígula finalizado e iniciado novo cálculo (depende do resultado) */
  {
    buttonsToPress: ['5', '/', '2', '=', '*'],
    targetResult: '2,5',
    targetCalc: '2,5 *',
  },
  /* Cálculo com vígula finalizado e iniciado novo cálculo (depende do resultado) */
  {
    buttonsToPress: ['5', '/', '2', '=', '*', '5'],
    targetResult: '5',
    targetCalc: '2,5 *',
  },
  /* Cálculo com vígula finalizado, iniciado novo cálculo e pressionado 'clearDisplay' */
  {
    buttonsToPress: ['5', '/', '2', '=', '*', '5', 'CE'],
    targetResult: '0',
    targetCalc: '2,5 *',
  },
  /* Cálculo com vígula finalizado, iniciado novo cálculo e pressionado 'clearDisplay' */
  {
    buttonsToPress: ['5', '/', '2', '=', '*', '5', 'C'],
    targetResult: '0',
    targetCalc: '',
  },
  /* Cálculo com vígula finalizado, iniciado novo cálculo e outro cálculo */
  {
    buttonsToPress: ['5', '/', '2', '=', '*', '5', '-'],
    targetResult: '12,5',
    targetCalc: '12,5 -',
  },
  /* Testando backspace */
  {
    buttonsToPress: ['<'],
    targetResult: '0',
    targetCalc: '',
  },
  {
    buttonsToPress: ['1', '<'],
    targetResult: '0',
    targetCalc: '',
  },
  {
    buttonsToPress: ['23', '<'],
    targetResult: '2',
    targetCalc: '',
  },
  {
    buttonsToPress: ['45', '+', '<'],
    targetResult: '45',
    targetCalc: '45 +',
  },
  {
    buttonsToPress: ['45', '+', '6', '<'],
    targetResult: '0',
    targetCalc: '45 +',
  },
  {
    buttonsToPress: ['45', '+', '6', '=', '<'],
    targetResult: '51',
    targetCalc: '',
  },
  {
    buttonsToPress: ['45', '+', '6', '=', '8', '<'],
    targetResult: '0',
    targetCalc: '',
  },
  {
    buttonsToPress: ['45', '+', '6', '=', '*', '<'],
    targetResult: '51',
    targetCalc: '51 *',
  },
  {
    buttonsToPress: ['45', '+', '6', '=', '2', '*', '<'],
    targetResult: '2',
    targetCalc: '2 *',
  },
  {
    buttonsToPress: ['45', '+', '6', '=', '*', '3', '<'],
    targetResult: '0',
    targetCalc: '51 *',
  },
  /* Testando Inversão (Próximo passo...) */
];

function createTestCalculator(calculator) {
  const buttonFunctions = {
    0: () => calculator.insertDigit(0),
    1: () => calculator.insertDigit(1),
    2: () => calculator.insertDigit(2),
    3: () => calculator.insertDigit(3),
    4: () => calculator.insertDigit(4),
    5: () => calculator.insertDigit(5),
    6: () => calculator.insertDigit(6),
    7: () => calculator.insertDigit(7),
    8: () => calculator.insertDigit(8),
    9: () => calculator.insertDigit(9),
    ',': () => calculator.insertComma(),
    CE: () => calculator.clearDisplay(),
    C: () => calculator.clearCalc(),
    '<': () => calculator.removeLastDigit(),
    '/': () => calculator.selectOperator('/'),
    X: () => calculator.selectOperator('*'),
    '*': () => calculator.selectOperator('*'),
    '-': () => calculator.selectOperator('-'),
    '+': () => calculator.selectOperator('+'),
    '=': () => calculator.equal(),
    '+/-': () => calculator.invertSignal(),
  };

  const pressButton = (button) => {
    let func = buttonFunctions[button.toUpperCase()];
    if (func) {
      return func();
    }

    button
      .toUpperCase()
      .split('')
      .forEach((character) => {
        func = buttonFunctions[character];
        if (func) {
          func();
        } else {
          return console.error(`Erro ao pressionar botão '${button}'`);
        }
      });
  };

  const runTests = () => {
      let countErrorTests = 0;
      let countOkTests = 0;
    tests.forEach(({ buttonsToPress, targetResult, targetCalc }, index) => {
      buttonsToPress.forEach((button) => {
        pressButton(button);
      });

      const result = calculator.getResult();
      const calc = calculator.getCalc();

      const isResultCorrect = result === targetResult;
      const isCalcCorrect = calc === targetCalc;

      if (isResultCorrect && isCalcCorrect) {
        let resultFeedback = `(OK) Result: '${targetResult}'`;
        let calcFeedback = `(OK) Calc: '${targetCalc}'`;
        console.log(`Test ${index + 1})\n${resultFeedback}\n${calcFeedback}`);
        countOkTests++;
    } else {
        let resultFeedback = `(ERRO) Result: We wanted '${targetResult}' but we got '${result}'`;
        let calcFeedback = `(ERRO) Calc: We wanted '${targetCalc}' but we got '${calc}'`;
        if (isResultCorrect) {
          resultFeedback = `(OK) Result: '${targetResult}'`;
        }
        if (isCalcCorrect) {
          calcFeedback = `(OK) Calc: '${targetCalc}'`;
        }
        console.warn(`Test ${index + 1})\n${resultFeedback}\n${calcFeedback}`);
        console.warn({ buttonsToPress, targetResult, targetCalc });
        countErrorTests++;
      }

      calculator.clearCalc();
    });

    console.log(`Ok tests: ${countOkTests}\nError tests: ${countErrorTests}`)
  };

  return {
    runTests,
  };
}

export { createTestCalculator };