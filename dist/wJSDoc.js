// import fs from 'node:fs';
// import path from 'node:path';
// import { BASIC_TYPES } from './core/constants.js';
import builder from './core/builder.js';
console.log(builder.start().end());
console.log('test');
console.log('test');
console.log('test');
console.log('test');
console.log('test');
console.log('test');
// const type = {
//   result: ``,
//   def: function (name, tAnnotation = BASIC_TYPES.OBJ, props = [null]) {
//     if (!props[0]) {
//       this.result += tDefHead(t, ns).end();
//       return this;
//     }
//     return tDefHead(tAnnotation, name).props(props);
//   },
//   end: function () {
//     this.result += this.end;
//     return this;
//   },
// };
// function wJsdoc(type) {}
/**
 * ErrorType
 * NAME the name of the error type.
 * CODE The HTTP status code of the error.
 * - See {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status} for a list of all HTTP response status codes.
 */
/**
 * InclusionExclusiveErrorType
 * getMsg
 * - See {@link InclusionExclusiveErrorMessageGenerator} for more details.
 */
/**
 * InclusionExclusiveErrorMessageGenerator
 * Generates a InclusionExclusive error message.
 * @param {string} rule The rule to which this message applies.
 * @param {string} expected What's expected to be exclusively included.
 * @returns {string} Error message.
 * @example
 * // returns `Phone must only include Numbers`
 * getMsg('Phone','Numbers')
 */
/**
 * InclusionExclusiveErrorType
 * InclusionExclusiveErrorType
 * Encapsulates the general data for inclusion-exclusive errors.
 */
/**
 * ErrorMap
 * ErrorMap
 * Contains all of the built error objects.
 * Use this Map to extend the errors in the context of your use case.
 * @returns {Map<string,ErrorObject>} A Map containing all of the built errorTypes
 */
//# sourceMappingURL=wJSDoc.js.map