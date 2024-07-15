/**
 * TODO: Create separate constants based on usage context.
 *  - TS: https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html
 *  - OG: https://jsdoc.app/
 *    - consider integrating https://github.com/gajus/eslint-plugin-jsdoc#readme rules.
 */

/** Common JSDoc block tags */
const BLOCK_TAGS = {
  TYPE: `@type`,
  TYPE_DEF: `@typedef`,
  PROP: `@property`,
  PARAM: `@param`,
  RETURNS: `@returns`,
  THROWS: `@throws`,
  DEPRECATED: `@deprecated`,
  SEE: `@see`,
  EXAMPLE: `@example`,
  CONSTRUCTOR: `@constructor`,
  THIS: `@this`,
  EXTENDS: `@extends`,
  PRIVATE: `@private`,
  PUBLIC: `@public`,
  STATIC: `@static`,
  MEMBEROF: `@memberof`,
  CALLBACK: `@callback`,
  DESCRIPTION: `@description`,
  FUNCTION: `@function`,
  METHOD: `@method`,
  MODULE: `@module`,
  NAMESPACE: `@namespace`,
} as const;

/** Common  */
const BASIC_TYPES = {
  STR: 'string',
  NUM: 'number',
  BOOL: 'boolean',
  OBJ: 'object',
  ARR: 'Array',
  FUNC: 'function',
  ANY: 'any',
  NULL: 'null',
  UNDEF: 'undefined',
  DATE: 'Date',
  REGEXP: 'RegExp',
  PROMISE: 'Promise',
  MAP: 'Map',
  SET: 'Set',
  SYM: 'symbol',
  BIGINT: 'BigInt',
  ERROR: 'Error',
} as const;

type TypeAnnotation = keyof typeof BASIC_TYPES;
type BlockTag = keyof typeof BLOCK_TAGS;

export type { TypeAnnotation, BlockTag };
export { BLOCK_TAGS, BASIC_TYPES };
