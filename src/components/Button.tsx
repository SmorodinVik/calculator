import React from 'react';

type ButtonProps = {
  value: string,
  className?: string,
  handleClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ value, className = '', handleClick }) => (
  <button type="button" className={`button ${className}`} onClick={handleClick}>{value}</button>
);

export default Button;
