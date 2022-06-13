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

function createKeyboardCalculator() {
  const pressKey = (key) => {
    const selector = keyboardButtons[key];
    if (!selector) return;
    console.log(selector)
    const element = document.querySelector(selector);
    if (!element) return;

    var event = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window,
    });

    element.dispatchEvent(event);
  };

  return {
    pressKey
  };
}

export { createKeyboardCalculator };
