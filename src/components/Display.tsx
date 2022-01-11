import React from 'react';

type DisplayProps = {
  value: string,
  className: string,
}

const Display: React.FC<DisplayProps> = ({ value, className }) => (
  <div className={className}>
    <p>{value}</p>
  </div>
);

export default Display;
