//#endregion
/**
 * Generates an error message indicating that the provided index is out of bounds.
 * @param index - The index that is out of bounds.
 * @param arr - The array being indexed.
 * @returns The error message.
 */
const getBoundError = (index, arr) =>
  `Provided index is out of bounds: ${arr.length === 0 ? `No commands have been registered` : `| got: ${String(index)} | min: 0 | max: ${String(arr.length - 1)} |`}`;
/**
 * Checks if the provided index is within the bounds of the array.
 * @param index - The index to check.
 * @param arr - The array being indexed.
 * @returns True if the index is within bounds, false otherwise.
 */
const isInBounds = (index, arr) => arr.length && +index >= 0 && +index < arr.length;
export { getBoundError, isInBounds };
//# sourceMappingURL=commandManagerUtils.js.map
