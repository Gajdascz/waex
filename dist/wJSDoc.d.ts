export {};
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
//# sourceMappingURL=wJSDoc.d.ts.map