import { DateTime } from 'luxon';
/**
 * Gets the current local date and time as a formatted string (short).
 * @returns The current local date and time.
 */
const getTime = () => DateTime.local().toLocaleString(DateTime.TIME_WITH_SECONDS);
/**
 * Normalizes the input into an array. If the input is already an array, it returns a copy of the array.
 * Otherwise, it returns a new array containing the input.
 * @template T
 * @param t - The input to normalize.
 * @returns The normalized array.
 */
const normalizeAsArray = (t) => {
    if (Array.isArray(t))
        return [...t];
    else
        return [t];
};
/**
 * Merges two objects. Properties from the provided options object will overwrite properties from the default options object.
 * @param providedOpts - The provided options.
 * @param defaultOpts - The default options.
 * @returns The merged object.
 */
const flatMerge = (providedOpts, defaultOpts) => ({
    ...defaultOpts,
    ...providedOpts,
});
/**
 * Compares two objects and returns the differences.
 * @param obj1 - The first object.
 * @param obj2 - The second object.
 * @returns An object containing the differences.
 */
const objCompare = (obj1, obj2) => Object.entries(obj1).reduce((acc, [k, v]) => {
    if (!(k in obj2)) {
        acc[k] = { obj1: v, obj2: undefined };
        return acc;
    }
    if (typeof k !== typeof obj2[k]) {
        acc[k] = { obj1: v, obj2: obj2[k] };
        return acc;
    }
    if (v === obj2[k])
        return acc;
    if (Array.isArray(v)) {
        if (v.toString() === obj2[k]?.toString())
            return acc;
        acc[k] = { obj1: v, obj2: obj2[k] };
        return acc;
    }
    if (typeof v === 'object' && v !== null) {
        const nestedDiff = objCompare(v, obj2[k]);
        if (Object.keys(nestedDiff).length > 0)
            acc[k] = nestedDiff;
        return acc;
    }
    return acc;
}, {});
/**
 * Creates a debounced function that delays invoking the provided function until after the specified delay.
 * @template F
 * @param func - The function to debounce.
 * @param delay - The delay in milliseconds.
 * @returns The debounced function.
 */
function debounce(func, delay) {
    let debounceTimer;
    return function (...args) {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            void func.apply(this, args);
        }, delay);
    };
}
/**
 * Binds functions to a specific context.
 * @param to - The context to bind the functions to.
 * @param keyValues - The functions to bind.
 * @returns The record of bound functions.
 */
const bound = (to, keyValues) => {
    const result = {};
    for (const key in keyValues) {
        if (Object.prototype.hasOwnProperty.call(keyValues, key))
            result[key] = keyValues[key].bind(to);
    }
    return result;
};
export { debounce, flatMerge, normalizeAsArray, objCompare, getTime, bound };
//# sourceMappingURL=helpers.js.map