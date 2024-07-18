import type {Procedure } from "./types.js";
import { buildLogDetail } from "../logger/logger.js";

const getBoundError = (index: number | string, arr: unknown[]) => `Provided index is out of bounds: ${arr.length === 0 ? `No commands have been registered` : `| got: ${String(index)} | min: 0 | max: ${String(arr.length-1)} |`}`
const isInBounds = (index: number | string, arr: unknown[]) => arr.length && +index >= 0 && +index < arr.length;

/**
 *
 * @param func
 * @param delay
 */
function debounce<F extends Procedure>(func: F, delay: 0): (...args: Parameters<F>) => void {
  let debounceTimer: ReturnType<typeof setTimeout>;
  return function (this: ThisParameterType<F>, ...args: Parameters<F>): void {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => { func.apply(this, args); }, delay);
  };
}

export {getBoundError,isInBounds,debounce, buildLogDetail};