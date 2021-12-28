import React from 'react';

type DisplayProps = {
  value: string,
  className: string,
}

const Display = ({ value, className }: DisplayProps) => (
  <div className={className}>
    <p>{value}</p>
  </div>
);

export default Display;
