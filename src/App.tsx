import React, { useState, useEffect } from 'react';
import Display from './components/Display';
import Button from './components/Button';

const App: React.FC = () => {
  const [expression, setExpression] = useState('0');
  const [result, setResult] = useState('0');

  const setSymbol1 = (value: string) => {
    if (expression === '0') {
      setExpression(value);
    } else {
      setExpression(`${expression}${value}`);
    }
  };

  const setSymbol2 = (value: string) => {
    setExpression(`${expression}${value}`);
  };

  const handleReset = () => {
    setExpression('0');
    setResult('0');
  };

  const handleCalculate = () => {
    // eslint-disable-next-line no-eval
    setResult(eval(expression));
  };

  const buttonActions: { [key: string]: () => void } = {
    1: () => setSymbol1('1'),
    2: () => setSymbol1('2'),
    3: () => setSymbol1('3'),
    4: () => setSymbol1('4'),
    5: () => setSymbol1('5'),
    6: () => setSymbol1('6'),
    7: () => setSymbol1('7'),
    8: () => setSymbol1('8'),
    9: () => setSymbol1('9'),
    0: () => setSymbol1('0'),
    '00': () => setSymbol1('00'),
    '(': () => setSymbol1('('),
    ')': () => setSymbol1(')'),
    ',': () => setSymbol2(','),
    '/': () => setSymbol2('/'),
    '*': () => setSymbol2('\u{00D7}'),
    '-': () => setSymbol2('-'),
    '+': () => setSymbol2('+'),
    c: () => handleReset(),
    Enter: () => handleCalculate(),
    none: () => setSymbol2(''),
  };

  useEffect(() => {
    const onKeyPress = (e: KeyboardEvent) => {
      if (Object.prototype.hasOwnProperty.call(buttonActions, e.key)) {
        buttonActions[e.key]();
      }
    };

    document.addEventListener('keypress', onKeyPress);

    return () => {
      document.removeEventListener('keypress', onKeyPress);
    };
  }, [expression]);

  return (
    <div className="calc">
      <Display className="display justify-right" value={expression} />
      <Display className="display font-bold justify-right" value={result} />
      <div className="buttons">
        <Button value="C" handleClick={buttonActions.c} />
        <Button value="&radic;" handleClick={buttonActions.none} />
        <Button value="%" handleClick={buttonActions.none} />
        <Button value="/" handleClick={buttonActions['/']} />
        <Button value="7" handleClick={buttonActions['7']} />
        <Button value="8" handleClick={buttonActions['8']} />
        <Button value="9" handleClick={buttonActions['9']} />
        <Button value="&times;" handleClick={buttonActions['*']} />
        <Button value="4" handleClick={buttonActions['4']} />
        <Button value="5" handleClick={buttonActions['5']} />
        <Button value="6" handleClick={buttonActions['6']} />
        <Button value="-" handleClick={buttonActions['-']} />
        <Button value="1" handleClick={buttonActions['1']} />
        <Button value="2" handleClick={buttonActions['2']} />
        <Button value="3" handleClick={buttonActions['3']} />
        <Button value="+" handleClick={buttonActions['+']} />
        <Button value="00" handleClick={buttonActions['00']} />
        <Button value="0" handleClick={buttonActions['0']} />
        <Button value="," handleClick={buttonActions[',']} />
        <Button value="=" className="button-white" handleClick={buttonActions.Enter} />
      </div>
    </div>
  );
};

export default App;
