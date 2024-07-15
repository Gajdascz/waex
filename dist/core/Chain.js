const methodInitializer = (chain, methods) => {
    methods.forEach((method) => {
        chain.addMethod(method);
    });
};
const createChain = (args) => {
    const { startFn, endFn, initMethods } = args;
    const buffer = [];
    const methods = {};
    const chain = {
        isActive: () => !!buffer[0],
        reset() {
            buffer.length = 0;
            return true;
        },
        start(startArgs) {
            if (this.isActive())
                throw new Error('Chain: Cannot start a new chain without ending the current one.');
            buffer.push(startFn(startArgs));
            return this;
        },
        end(endArgs) {
            if (!buffer[0])
                console.warn('Chain: Ending chain in non-active state.');
            buffer.push(endFn(endArgs));
            const result = buffer.join('');
            this.reset();
            return result;
        },
        pushString(str) {
            buffer.push(str);
            return this;
        },
        addMethod(method) {
            const methodsArr = Array.isArray(method) ? method : [method];
            for (const method of methodsArr) {
                const chainableFn = ((...args) => () => {
                    const result = method(args);
                    if (typeof result !== 'string')
                        throw new Error(`Added Method: ${method.name} attempted to append a non-string value to the buffer array (${typeof result})`);
                    return this.pushString(result);
                })();
                methods[method.name] = chainableFn;
            }
        },
    };
    if (initMethods)
        methodInitializer(chain, initMethods);
    return chain;
};
export { createChain };
//# sourceMappingURL=Chain.js.map