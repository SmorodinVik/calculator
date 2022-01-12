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

export const parseExpression = (expression: string): MixedArray => {
  const normalizedExpression = expression.replace(/,/g, '.').replace(/×/g, '*');

  const partsOfNumber = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'];
  const result: MixedArray = [];
  let numberInString = '';

  normalizedExpression.split('').forEach((symb) => {
    if (partsOfNumber.includes(symb)) {
      numberInString += symb;
    } else {
      if (numberInString !== '') {
        const number = Number(numberInString);
        if (Number.isNaN(number)) {
          throw new Error('error');
        }
        result.push(number);
        numberInString = '';
      }
      result.push(symb);
    }
  });

  if (numberInString !== '') {
    const number = Number(numberInString);
    if (Number.isNaN(number)) {
      throw new Error('error');
    }
    result.push(Number(number));
  }
  return result;
};

export const convertToRPN = (arr: MixedArray): MixedArray => {
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

export const calculateRPN = (stack: MixedArray): number => {
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
  try {
    const parsedExpression = parseExpression(expression);
    const convertedExpression = convertToRPN(parsedExpression);
    const result = calculateRPN(convertedExpression);
    return String(result).replace(/\./g, ',');
  } catch (e) {
    return 'error';
  }
};
