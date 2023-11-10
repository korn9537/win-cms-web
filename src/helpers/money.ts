function convertToFloat(value: number | string): number {
  if (typeof value === 'string') {
    return parseFloat(value);
  }
  return parseFloat(value.toFixed(2));
}

function big(value: number | string): number {
  return convertToFloat(value) * 100;
}

function done(value: number, multiply: number = 1): number {
  let result = '0';
  if (multiply == 0) {
    result = value.toFixed(2);
  } else {
    result = (value / (100 * multiply)).toFixed(2);
  }
  return parseFloat(result);
}

export function add(a: number, b: number) {
  return done(big(a) + big(b));
}

export function subtract(a: number, b: number) {
  return done(big(a) - big(b));
}

export function multiply(a: number, b: number) {
  return done(big(a) * big(b), 100);
}

export function divide(a: number, b: number) {
  return done(big(a) / big(b), 0);
}

export function percent(a: number, b: number) {
  return divide(a, b) * 100;
}

export default {
  add,
  subtract,
  multiply,
  divide,
  percent,
};
