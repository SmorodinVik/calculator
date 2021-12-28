import React from 'react';
import Display from './components/Display';

const App = () => {
  const fn = (): null => null;

  return (
    <div className="calc">
      <Display className="container justify-right" value="20x30" />
      <Display className="container justify-right" value="600" />
      {fn()}
    </div>
  );
};

export default App;
