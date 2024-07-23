type AsyncProcedure = (...args: any[]) => Promise<void>;
/**
 * Gets the current local date and time as a formatted string (short).
 * @returns The current local date and time.
 */
declare const getTime: () => string;
/**
 * Normalizes the input into an array. If the input is already an array, it returns a copy of the array.
 * Otherwise, it returns a new array containing the input.
 * @template T
 * @param t - The input to normalize.
 * @returns The normalized array.
 */
declare const normalizeAsArray: <T>(t: T | T[]) => T[];
/**
 * Merges two objects. Properties from the provided options object will overwrite properties from the default options object.
 * @param providedOpts - The provided options.
 * @param defaultOpts - The default options.
 * @returns The merged object.
 */
declare const flatMerge: (providedOpts: object, defaultOpts: object) => object;
/**
 * Compares two objects and returns the differences.
 * @param obj1 - The first object.
 * @param obj2 - The second object.
 * @returns An object containing the differences.
 */
declare const objCompare: (
  obj1: Record<string, unknown>,
  obj2: Record<string, unknown>,
) => Record<string, unknown>;
/**
 * Creates a debounced function that delays invoking the provided function until after the specified delay.
 * @template F
 * @param func - The function to debounce.
 * @param delay - The delay in milliseconds.
 * @returns The debounced function.
 */
declare function debounce<F extends AsyncProcedure>(
  func: F,
  delay: number,
): (...args: Parameters<F>) => void;
/**
 * Binds functions to a specific context.
 * @param to - The context to bind the functions to.
 * @param keyValues - The functions to bind.
 * @returns The record of bound functions.
 */
declare const bound: <T, BoundObj extends FnRecord>(to: T, keyValues: FnRecord) => BoundObj;
/**
 * Type representing a record of functions to be bound.
 */
type FnRecord = Record<string, (...args: any[]) => any>;
export { debounce, flatMerge, normalizeAsArray, objCompare, getTime, bound, type FnRecord };
//# sourceMappingURL=helpers.d.ts.map
