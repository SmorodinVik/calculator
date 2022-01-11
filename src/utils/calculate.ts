const priority: { [key: string]: number } = {
  '(': 0,
  ')': 0,
  '+': 1,
  '-': 1,
  '*': 2,
  '/': 2,
};

const actions: { [key: string]: (arg1: number, arg2: number) => number } = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
  '/': (a, b) => a / b,
};

type MixedArray = Array<number | string>;

const parseString = (str: string): MixedArray => {
  const normalizedStr = str.replace(/,/g, '.').replace(/×/g, '*');

  const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'];

  const result: MixedArray = [];
  let number = '';

  normalizedStr.split('').forEach((symb) => {
    if (numbers.includes(symb)) {
      number += symb;
    } else {
      if (number !== '') {
        result.push(Number(number));
        number = '';
      }
      result.push(symb);
    }
  });

  if (number !== '') {
    result.push(Number(number));
  }
  return result;
};

const convertToRPN = (arr: MixedArray): MixedArray => {
  const stack: MixedArray = [];
  const result: MixedArray = [];

  arr.forEach((el) => {
    if (typeof el === 'number') {
      result.push(el);
    } else if (stack.length === 0 || el === '(') {
      stack.push(el);
    } else if (el === ')') {
      let prevEl = stack.pop();

      while (prevEl !== '(') {
        if (typeof prevEl === 'undefined') {
          throw new Error('wrong expression');
        }
        result.push(prevEl);
        prevEl = stack.pop();
      }
    } else {
      const elPriority = priority[el];
      let prevEl = stack.pop();
      if (typeof prevEl === 'undefined') {
        stack.push(el);
        return;
      }
      let prevElPriority = priority[prevEl];

      while (stack.length > 0 && prevElPriority >= elPriority) {
        result.push(prevEl);
        const lastEl = stack.pop();
        prevEl = typeof lastEl === 'undefined' ? prevEl : lastEl;
        prevElPriority = priority[prevEl];
      }

      if (prevElPriority >= elPriority) {
        result.push(prevEl);
      } else {
        stack.push(prevEl);
      }

      stack.push(el);
    }
  });
  if (stack.length !== 0) {
    result.push(...stack.reverse());
  }
  return result;
};

const calculateRPN = (stack: MixedArray): number => {
  const lastEl = stack.pop();
  if (typeof lastEl === 'undefined') {
    throw new Error('wrong expression');
  }
  if (typeof lastEl === 'number') {
    return lastEl;
  }
  const arg2 = calculateRPN(stack);
  const arg1 = calculateRPN(stack);
  return actions[lastEl](arg1, arg2);
};

export default (expression: string): string => {
  const parsedExpression = parseString(expression);
  try {
    const convertedExpression = convertToRPN(parsedExpression);
    const result = calculateRPN(convertedExpression);
    return String(result).replace(/\./g, ',');
  } catch (e) {
    return 'wrong expression';
  }
};