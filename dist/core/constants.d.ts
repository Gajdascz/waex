/**
 * TODO: Create separate constants based on usage context.
 *  - TS: https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html
 *  - OG: https://jsdoc.app/
 *    - consider integrating https://github.com/gajus/eslint-plugin-jsdoc#readme rules.
 */
/** Common JSDoc block tags */
declare const BLOCK_TAGS: {
    readonly TYPE: "@type";
    readonly TYPE_DEF: "@typedef";
    readonly PROP: "@property";
    readonly PARAM: "@param";
    readonly RETURNS: "@returns";
    readonly THROWS: "@throws";
    readonly DEPRECATED: "@deprecated";
    readonly SEE: "@see";
    readonly EXAMPLE: "@example";
    readonly CONSTRUCTOR: "@constructor";
    readonly THIS: "@this";
    readonly EXTENDS: "@extends";
    readonly PRIVATE: "@private";
    readonly PUBLIC: "@public";
    readonly STATIC: "@static";
    readonly MEMBEROF: "@memberof";
    readonly CALLBACK: "@callback";
    readonly DESCRIPTION: "@description";
    readonly FUNCTION: "@function";
    readonly METHOD: "@method";
    readonly MODULE: "@module";
    readonly NAMESPACE: "@namespace";
};
/** Common  */
declare const BASIC_TYPES: {
    readonly STR: "string";
    readonly NUM: "number";
    readonly BOOL: "boolean";
    readonly OBJ: "object";
    readonly ARR: "Array";
    readonly FUNC: "function";
    readonly ANY: "any";
    readonly NULL: "null";
    readonly UNDEF: "undefined";
    readonly DATE: "Date";
    readonly REGEXP: "RegExp";
    readonly PROMISE: "Promise";
    readonly MAP: "Map";
    readonly SET: "Set";
    readonly SYM: "symbol";
    readonly BIGINT: "BigInt";
    readonly ERROR: "Error";
};
type TypeAnnotation = keyof typeof BASIC_TYPES;
type BlockTag = keyof typeof BLOCK_TAGS;
export type { TypeAnnotation, BlockTag };
export { BLOCK_TAGS, BASIC_TYPES };
//# sourceMappingURL=constants.d.ts.map