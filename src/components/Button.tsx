import React from 'react';

type ButtonProps = {
  value: string,
  className?: string,
}

const Button = ({ value, className = '' }: ButtonProps) => (
  <div className={`button ${className}`}>{value}</div>
);

export default Button;
