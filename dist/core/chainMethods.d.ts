import { type TypeAnnotation } from './constants.js';
/**
 * Creates and returns a template string containing the JSDoc header and optional opening comments.
 * - Opening comments are applied in-order before the jsdoc opening declaration.
 * @param openComments Single line comments written above the JSDoc opening declaration.
 * @returns Formatted JSDoc opening template string.
 */
declare const openJSDoc: (openComments?: never[]) => string;
/**
 * Creates and returns a template string containing the JSDoc closing declaration and optional close comments.
 * - Close comments are applied in-order after the jsdoc closing declaration.
 * @param closeComments Single line comments written below the JSDoc closing declaration.
 * @returns Formatted JSDoc closing template string.
 */
declare const closeJSDoc: (closeComments?: never[]) => string;
declare const allWriteMethods: (((name: string, description?: string, intersection?: string, type?: TypeAnnotation) => string) | ((text: string, bull?: boolean) => string) | ((name: string, type?: TypeAnnotation, description?: string, details?: {
    text: string;
    bull: boolean;
}[]) => string) | ((name: string, type: TypeAnnotation, description: string) => string) | ((type: TypeAnnotation) => string))[];
declare const pkg: {
    open: (openComments?: never[]) => string;
    close: (closeComments?: never[]) => string;
    chainMethods: (((name: string, description?: string, intersection?: string, type?: TypeAnnotation) => string) | ((text: string, bull?: boolean) => string) | ((name: string, type?: TypeAnnotation, description?: string, details?: {
        text: string;
        bull: boolean;
    }[]) => string) | ((name: string, type: TypeAnnotation, description: string) => string) | ((type: TypeAnnotation) => string))[];
};
export { allWriteMethods, openJSDoc, closeJSDoc, pkg };
//# sourceMappingURL=chainMethods.d.ts.map