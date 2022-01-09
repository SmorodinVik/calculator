import React, { useState } from 'react';
import Display from './components/Display';
import Button from './components/Button';

const App = () => {
  const [expression, setExpression] = useState('2+3/4');

  return (
    <div className="calc">
      <Display className="display justify-right" value={expression} />
      <Display className="display display-result justify-right" value="700" />
      <div className="buttons">
        <Button value="C" />
        <Button value="&radic;" />
        <Button value="%" />
        <Button value="/" />
        <Button value="7" />
        <Button value="8" />
        <Button value="9" />
        <Button value="&times;" />
        <Button value="4" />
        <Button value="5" />
        <Button value="6" />
        <Button value="-" />
        <Button value="1" />
        <Button value="2" />
        <Button value="3" />
        <Button value="+" />
        <Button value="00" />
        <Button value="0" />
        <Button value="," />
        <Button value="=" className="button-white" />
      </div>
    </div>
  );
};

export default App;
