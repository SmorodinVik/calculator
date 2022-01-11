import calculate, { parseExpression, convertToRPN, calculateRPN } from '../src/utils/calculate';

const expression1 = '12,81+4,8/(32-19×7-(11+18×3))-8,4';
const parsedExpression1 = [12.81, '+', 4.8, '/', '(', 32, '-', 19, '*', 7, '-', '(', 11, '+', 18, '*', 3, ')', ')', '-', 8.4];
const expressionInRPN1 = [12.81, 4.8, 32, 19, 7, '*', '-', 11, 18, 3, '*', '+', '-', '/', '+', 8.4, '-'];
const result1 = 4.381084337349398;
const normalizedResult1 = '4,381084337349398';

test('Parse expression', () => {
  expect(parseExpression(expression1)).toStrictEqual(parsedExpression1);
});

test('Convert to Reverse Polish Notation', () => {
  expect(convertToRPN(parsedExpression1)).toStrictEqual(expressionInRPN1);
});

test('Calculate Reverse Polish Notation', () => {
  expect(calculateRPN(expressionInRPN1)).toBe(result1);
});

test('Test calculate function', () => {
  expect(calculate(expression1)).toBe(normalizedResult1);
});
