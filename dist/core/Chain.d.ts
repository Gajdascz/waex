interface Chain {
    start: () => Chain;
    end: () => string;
    reset: () => boolean;
    isActive: () => boolean;
    pushString: (str: string) => this;
    addMethod: (method: UserMethod | UserMethod[]) => void;
    [key: string]: unknown;
}
interface ChainArgs {
    startFn: (args?: string[]) => string;
    endFn: (args?: string[]) => string;
    initMethods?: UserMethod[];
}
type UserMethod = (...args: unknown[]) => string;
declare const createChain: (args: ChainArgs) => Chain;
export { type Chain, type ChainArgs, createChain };
//# sourceMappingURL=Chain.d.ts.map