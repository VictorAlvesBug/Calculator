// Lista de testes para verificar se o comportamento da calculadora está de
// acordo com o esperado
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
  /* Cálculos iniciados pelo operador */
  {
    buttonsToPress: ['+', '5'],
    targetResult: '5',
    targetCalc: '0 +',
  },
  {
    buttonsToPress: ['-', '5'],
    targetResult: '5',
    targetCalc: '0 -',
  },
  {
    buttonsToPress: ['*', '5'],
    targetResult: '5',
    targetCalc: '0 *',
  },
  {
    buttonsToPress: ['/', '5'],
    targetResult: '5',
    targetCalc: '0 /',
  },
  {
    buttonsToPress: ['+', '5', '='],
    targetResult: '5',
    targetCalc: '0 + 5 =',
  },
  {
    buttonsToPress: ['-', '5', '='],
    targetResult: '-5',
    targetCalc: '0 - 5 =',
  },
  {
    buttonsToPress: ['*', '5', '='],
    targetResult: '0',
    targetCalc: '0 * 5 =',
  },
  {
    buttonsToPress: ['/', '5', '='],
    targetResult: '0',
    targetCalc: '0 / 5 =',
  },
  /* Testando Inversão */
  {
    buttonsToPress: ['+/-'],
    targetResult: '0',
    targetCalc: '',
  },
  {
    buttonsToPress: ['1', '+/-'],
    targetResult: '-1',
    targetCalc: '',
  },
  {
    buttonsToPress: ['23', '+/-'],
    targetResult: '-23',
    targetCalc: '',
  },
  {
    buttonsToPress: ['45', '+', '+/-'],
    targetResult: '-45',
    targetCalc: '45 +',
  },
  {
    buttonsToPress: ['45', '+', '+/-', '='],
    targetResult: '0',
    targetCalc: '45 + -45 =',
  },
  {
    buttonsToPress: ['45', '+', '6', '+/-'],
    targetResult: '-6',
    targetCalc: '45 +',
  },
  {
    buttonsToPress: ['45', '+', '6', '+/-', '='],
    targetResult: '39',
    targetCalc: '45 + -6 =',
  },
  {
    buttonsToPress: ['45', '+', '6', '=', '+/-'],
    targetResult: '-51',
    targetCalc: '',
  },
  {
    buttonsToPress: ['45', '+', '6', '=', '+/-', '='],
    targetResult: '-51',
    targetCalc: '-51 =',
  },
  {
    buttonsToPress: ['45', '+', '6', '=', '+/-', '+/-'],
    targetResult: '51',
    targetCalc: '',
  },
  {
    buttonsToPress: ['45', '+', '6', '=', '+/-', '+/-', '='],
    targetResult: '51',
    targetCalc: '51 =',
  },
  {
    buttonsToPress: ['45', '+', '6', '=', '8', '+/-'],
    targetResult: '-8',
    targetCalc: '',
  },
  {
    buttonsToPress: ['45', '+', '6', '=', '*', '+/-'],
    targetResult: '-51',
    targetCalc: '51 *',
  },
  {
    buttonsToPress: ['45', '+', '6', '=', '+/-', '*'],
    targetResult: '-51',
    targetCalc: '-51 *',
  },
  {
    buttonsToPress: ['45', '+', '6', '=', '+/-', '*', '8'],
    targetResult: '8',
    targetCalc: '-51 *',
  },
  {
    buttonsToPress: ['45', '+', '6', '=', '2', '*', '+/-'],
    targetResult: '-2',
    targetCalc: '2 *',
  },
  {
    buttonsToPress: ['45', '+', '6', '=', '*', '3', '+/-'],
    targetResult: '-3',
    targetCalc: '51 *',
  },
  /* Pressionar vírgula após um calculo finalizado */
  {
    buttonsToPress: ['12', '+', '5', '=', ','],
    targetResult: '0,',
    targetCalc: '',
  },
  /* Outros */
  {
    buttonsToPress: ['2', '+', '='],
    targetResult: '4',
    targetCalc: '2 + 2 =',
  },
  {
    buttonsToPress: ['2', '+', '=', '='],
    targetResult: '6',
    targetCalc: '4 + 2 =',
  },
  {
    buttonsToPress: ['2', '+', '=', '=', '='],
    targetResult: '8',
    targetCalc: '6 + 2 =',
  },
  {
    buttonsToPress: ['2', '-', '='],
    targetResult: '0',
    targetCalc: '2 - 2 =',
  },
  {
    buttonsToPress: ['2', '-', '=', '='],
    targetResult: '-2',
    targetCalc: '0 - 2 =',
  },
  {
    buttonsToPress: ['2', '-', '=', '=', '='],
    targetResult: '-4',
    targetCalc: '-2 - 2 =',
  },
  {
    buttonsToPress: ['3', '*', '='],
    targetResult: '9',
    targetCalc: '3 * 3 =',
  },
  {
    buttonsToPress: ['3', '*', '=', '='],
    targetResult: '27',
    targetCalc: '9 * 3 =',
  },
  {
    buttonsToPress: ['3', '*', '=', '=', '='],
    targetResult: '81',
    targetCalc: '27 * 3 =',
  },
  {
    buttonsToPress: ['5', '/', '='],
    targetResult: '1',
    targetCalc: '5 / 5 =',
  },
  {
    buttonsToPress: ['5', '/', '=', '='],
    targetResult: '0,2',
    targetCalc: '1 / 5 =',
  },
  {
    buttonsToPress: ['5', '/', '=', '=', '='],
    targetResult: '0,04',
    targetCalc: '0,2 / 5 =',
  },
];

// Factory responsável por efetuar testes na calculadora
function createTestCalculator(calculator) {
  // Define o que cada comando deve fazer na calculadora
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

  // Função responsável por pressionar os botões na calculadora
  const pressButton = (label) => {
    const labelUpper = label.toUpperCase();

    // Busca uma função com esta label
    let func = buttonFunctions[labelUpper];

    // Caso encontre, executa a função atrelada
    if (func) {
      return func();
    }

    // Caso não encontre a função, divide a label por caracter e executa um a um
    labelUpper.split('').forEach((character) => {
      // Busca uma função com este caracter
      func = buttonFunctions[character];

      // Caso encontre, executa a função atrelada
      if (func) {
        func();
      } else {
        // Caso não econtre a função, lança erro
        return console.error(`Error: Button '${label}' not found`);
      }
    });
  };

  // Executa a lista de testes e exibe no console
  const runTests = () => {
    // Lista de testes OK e testes falhados
    let listIndexPassedTests = [];
    let listIndexFailedTests = [];

    // Desativa log no histórico
    calculator.pauseHistory();

    // Reseta a calculadora
    calculator.clearCalc();

    // Itera cada um dos testes
    tests.forEach(({ buttonsToPress, targetResult, targetCalc }, index) => {
      // Pressiona os botões na ordem solicitada
      buttonsToPress.forEach((button) => {
        pressButton(button);
      });

      // Recupera o resultado e o cálculo após ter pressionado os botões
      const result = calculator.getResult();
      const calc = calculator.getCalc();

      // Verifica se o resultado e o cálculo estão alinhados de acordo com
      // os valores esperados
      const isResultCorrect = result === targetResult;
      const isCalcCorrect = calc === targetCalc;

      // Caso os valores obtidos estejam alinhados com os valores esperados
      if (isResultCorrect && isCalcCorrect) {
        // Exibe o log informando que a calculadora passou neste teste
        let resultFeedback = `(OK) Result: '${targetResult}'`;
        let calcFeedback = `(OK) Calc: '${targetCalc}'`;
        console.log(`Test ${index + 1})\n${resultFeedback}\n${calcFeedback}`);
        // Adiciona o teste na lista de testes OK
        listIndexPassedTests.push(index);
      } else {
        // Define o texto em relação ao resultado
        let resultFeedback = isResultCorrect
          ? `(OK) Result: '${targetResult}'`
          : `(ERROR) Result: We expected '${targetResult}', but we got '${result}'`;

        // Define o texto em relação ao cálculo
        let calcFeedback = isCalcCorrect
          ? `(OK) Calc: '${targetCalc}'`
          : `(ERROR) Calc: We expected '${targetCalc}', but we got '${calc}'`;

        // Exibe o log do erro
        console.warn(`Test ${index + 1})\n${resultFeedback}\n${calcFeedback}`);
        console.warn({ buttonsToPress, targetResult, targetCalc });
        // Adiciona o teste na lista de testes que falharam
        listIndexFailedTests.push(index);
      }

      // Reseta a calculadora, para que o teste atual não influencie no próximo
      calculator.clearCalc();
    });

    // Exibe linha divisória entre os testes executados e o feedback geral
    console.log(Array(50).fill('-').join(''));

    // Exibe no console quantos testes passaram
    console.log(`Passed tests: ${listIndexPassedTests.length}/${tests.length}`);

    // Exibe a lista de testes falhados, caso tenha algum
    if (listIndexFailedTests.length > 0) {
      console.warn(`Failed tests (${listIndexFailedTests.length}):`);
      // Recupera os testes que falharam e exibe novamente
      const listFailedTests = listIndexFailedTests.map(index => {
        return {index, ...tests[index]}
      });
      console.warn(listFailedTests);
    }

    // Ativa log no histórico
    calculator.resumeHistory();
  };

  return {
    runTests,
  };
}

export { createTestCalculator };
