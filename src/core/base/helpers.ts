import type { AsyncProcedure } from './types.js';

const getBoundError = (index: number | string, arr: unknown[]) =>
  `Provided index is out of bounds: ${arr.length === 0 ? `No commands have been registered` : `| got: ${String(index)} | min: 0 | max: ${String(arr.length - 1)} |`}`;
const isInBounds = (index: number | string, arr: unknown[]) =>
  arr.length && +index >= 0 && +index < arr.length;

const isObject = (obj: unknown): obj is Record<string, unknown> =>
  typeof obj === 'object' && !Array.isArray(obj);

const normalizeAsArray = <T>(t: T | T[]): T[] => {
  if (Array.isArray(t)) return [...t];
  else return [t];
};
const flatMerge = (providedOpts: object, defaultOpts: object): object => ({
  ...defaultOpts,
  ...providedOpts,
});

/**
 *
 * @param func
 * @param delay
 */
function debounce<F extends AsyncProcedure>(
  func: F,
  delay: number,
): (...args: Parameters<F>) => void {
  let debounceTimer: ReturnType<typeof setTimeout>;
  return function (this: ThisParameterType<F>, ...args: Parameters<F>): void {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      void func.apply(this, args);
    }, delay);
  };
}

export {
  getBoundError,
  isInBounds,
  debounce,
  flatMerge,
  normalizeAsArray,
  isObject,
};
