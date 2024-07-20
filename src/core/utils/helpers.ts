type AsyncProcedure = (...args: unknown[]) => Promise<void>;

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

export { debounce, flatMerge, normalizeAsArray };
