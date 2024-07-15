interface ChainCore {
  // Initializes the chain and pushes the first string into the buffer.
  start: () => this;
  // Returns the complete string and clears the buffer.
  end: () => string;
  // Erases the Chain's buffer and returns true.
  reset: () => boolean;
  // Returns true if the buffer has data.
  isActive: () => boolean;
  // Appends a string to the buffer.
  pushString: (str: string) => this;
  // Accepts a function or array of functions that return strings and adds them to the Chain.
  // addMethod: (method: UserMethod | UserMethod[]) => void;
  // Allows checking for dynamic methods/properties.
  [key: string]: unknown;
}

interface ChainArgs {
  startFn: (args?: string[]) => string;
  endFn: (args?: string[]) => string;
  initMethods: Record<string,UserMethod>;
}

type UserMethod = (...args: unknown[]) => string;


const createChain = (args: ChainArgs): ChainCore => {
  const { startFn, endFn } = args;
  const buffer: string[] = [];
  const core: ChainCore = {
    isActive: () => !!buffer[0],
    reset() {
      buffer.length = 0;
      return true;
    },
    start(startArgs?: string[]) {
      if (this.isActive())
        throw new Error(
          'Chain: Cannot start a new chain without ending the current one.',
        );
      buffer.push(startFn(startArgs));
      return this;
    },
    end(endArgs?: string[]) {
      if (!buffer[0]) console.warn('Chain: Ending chain in non-active state.');
      buffer.push(endFn(endArgs));
      const result = buffer.join('');
      this.reset();
      return result;
    },
    pushString(str: string) {
      buffer.push(str);
      return this;
    },
  };
  return new Proxy(core, {
    get(target,prop,receiver) {
      if(prop in args.initMethods) return (...userArgs: unknown[]) => {
        const normalizedProp = String(prop);
        const result = args.initMethods[normalizedProp](...userArgs);
        if(typeof result !== 'string') throw new Error(`Method: ${normalizedProp} did not return a string.`)
        target.pushString(result);
        return receiver as ChainCore
      }
      return Reflect.get(target,prop,receiver) as ChainCore;
    }
  });
};
export { type ChainArgs, createChain };

// addMethod(method: UserMethod | UserMethod[]) {
//   const methodsArr = Array.isArray(method) ? method : [method];
//   for (const method of methodsArr) {
//     const methodName: string = method.name;
//     if (methodName in this) {
//       console.warn(
//         `[Chain addMethod]Prevented overwrite of method: ${method.name}`,
//       );
//       return;
//     }
//     const chainableFn: ChainMethod = (
//       (...args: unknown[]) =>
//       () => {
//         const result = method(args);
//         if (typeof result !== 'string')
//           throw new Error(
//             `Added Method: ${method.name} attempted to append a non-string value to the buffer array (${typeof result})`,
//           );
//         return this.pushString(result);
//       }
//     )();
//     this[method.name] = chainableFn
//   }
// },
// if (initMethods) chain.addMethod(initMethods);
