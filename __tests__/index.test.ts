/* eslint-disable no-undef */
import calculate, { parseExpression, convertToRPN, calculateRPN } from '../src/utils/calculate';

const expression1 = '12,81+4,8/(32-19×7-(11+18×3))-8,4';
const parsedExpression1 = [12.81, '+', 4.8, '/', '(', 32, '-', 19, '*', 7, '-', '(', 11, '+', 18, '*', 3, ')', ')', '-', 8.4];
const expressionInRPN1 = [12.81, 4.8, 32, 19, 7, '*', '-', 11, 18, 3, '*', '+', '-', '/', '+', 8.4, '-'];
const result1 = 4.381084337349398;
const normalizedResult1 = '4,381084337349398';

const expression2 = '3+4×8)';
const parsedExpression2 = [3, '+', 4, '*', 8, ')'];
const normalizedResult2 = 'error';

const expression3 = '3+4--';
const parsedExpression3 = [3, '+', 4, '-', '-'];
const expressionInRPN3 = [3, 4, '+', '-', '-'];
const normalizedResult3 = 'error';

test('Parse expression', () => {
  expect(parseExpression(expression1)).toStrictEqual(parsedExpression1);
  expect(parseExpression(expression2)).toStrictEqual(parsedExpression2);
  expect(parseExpression(expression3)).toStrictEqual(parsedExpression3);
});

test('Convert to Reverse Polish Notation', () => {
  expect(convertToRPN(parsedExpression1)).toStrictEqual(expressionInRPN1);
  expect(() => convertToRPN(parsedExpression2)).toThrow('wrong expression');
  expect(convertToRPN(parsedExpression3)).toStrictEqual(expressionInRPN3);
});

test('Calculate Reverse Polish Notation', () => {
  expect(calculateRPN(expressionInRPN1)).toBe(result1);
  expect(() => calculateRPN(expressionInRPN3)).toThrow('wrong expression');
});

test('Test calculate function', () => {
  expect(calculate(expression1)).toBe(normalizedResult1);
  expect(calculate(expression2)).toBe(normalizedResult2);
  expect(calculate(expression3)).toBe(normalizedResult3);
});
