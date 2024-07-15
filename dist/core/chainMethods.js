import { BLOCK_TAGS, BASIC_TYPES } from './constants.js';
/**
 * Creates and returns a template string containing the JSDoc header and optional opening comments.
 * - Opening comments are applied in-order before the jsdoc opening declaration.
 * @param openComments Single line comments written above the JSDoc opening declaration.
 * @returns Formatted JSDoc opening template string.
 */
const openJSDoc = (openComments = []) => {
    let curr = ``;
    openComments.forEach((c) => (curr += `//${c} \n`));
    curr += `/** \n`;
    return curr;
};
/**
 * Creates and returns a template string containing the JSDoc closing declaration and optional close comments.
 * - Close comments are applied in-order after the jsdoc closing declaration.
 * @param closeComments Single line comments written below the JSDoc closing declaration.
 * @returns Formatted JSDoc closing template string.
 */
const closeJSDoc = (closeComments = []) => {
    let curr = ` */ \n`;
    closeComments.forEach((c) => (curr += `//${c} \n`));
    return curr;
};
/**
 * Appends a JSDoc line with the specified parameters.
 * @param opts The options for the JSDoc line.
 * @param [opts.tag] The JSDoc tag.
 * @param [opts.name] The name associated with the tag.
 * @param [opts.type] The type annotation.
 * @param [opts.description] The description of the tag or text.
 * @param [opts.intersection] The intersection type.
 * @param [opts.bull] Whether to include a bullet point.
 * @param [opts.trailingNewlines] The new lines to append at the end.
 * @returns The builder object for chaining.
 * @example
 * wLine({
 *   tag: '@param',
 *   name: 'str1',
 *   type: 'string',
 *   description: 'The first string.',
 *   intersection: null,
 *   bull: false,
 * });
 * @example
 * wLine({
 *   description: 'This is a regular description line.',
 *   bull: false,
 * });
 */
const wLine = (opts) => ` *${opts.bull ? ` -` : ''}${opts.tag ? ` ${opts.tag}` : ''}${opts.type ? `{${opts.type}${opts.intersection ? ` & ${opts.intersection}` : ''}}` : ''}${opts.name ? opts.name : ''}${opts.description ? ` ${opts.description}` : ''} ${opts.trailingNewLines ? opts.trailingNewLines : `\n`}`;
const wNl = () => ` * \n`;
const wTypedef = (name, description, intersection, type) => wLine({
    tag: BLOCK_TAGS.TYPE_DEF,
    name,
    type,
    intersection,
    description,
});
const wStr = (text, bull = false) => wLine({ description: text, bull });
const wProp = (name, type, description, details = []) => {
    let curr = wLine({ tag: BLOCK_TAGS.PROP, name, type, description });
    details.forEach((d) => (curr += wStr(d.text, d.bull)));
    return curr;
};
const wParam = (name, type, description) => wLine({ tag: BLOCK_TAGS.PARAM, name, type, description });
const wThrowsErr = (description) => wLine({
    tag: BLOCK_TAGS.THROWS,
    type: BASIC_TYPES.ERROR,
    description,
});
const wDeprecated = (description) => wLine({ tag: BLOCK_TAGS.DEPRECATED, description });
const wSee = (ref) => wLine({ tag: BLOCK_TAGS.SEE, type: `@link ${ref}` });
const wExample = () => wLine({ tag: BLOCK_TAGS.EXAMPLE });
const wConstructor = () => wLine({ tag: BLOCK_TAGS.CONSTRUCTOR });
const wThis = (type) => wLine({ tag: BLOCK_TAGS.THIS, type });
const wExtends = (type) => wLine({ tag: BLOCK_TAGS.EXTENDS, type });
const wPrivate = () => wLine({ tag: BLOCK_TAGS.PRIVATE });
const wPublic = () => wLine({ tag: BLOCK_TAGS.PUBLIC });
const wStatic = () => wLine({ tag: BLOCK_TAGS.STATIC });
const wMemberOf = (parent) => wLine({ tag: BLOCK_TAGS.MEMBEROF, name: parent });
const wCallback = (name) => wLine({ tag: BLOCK_TAGS.CALLBACK, name });
const wDescription = (description) => wLine({ tag: BLOCK_TAGS.DESCRIPTION, description });
const wFunction = (name) => wLine({ tag: BLOCK_TAGS.FUNCTION, name });
const wMethod = (name) => wLine({ tag: BLOCK_TAGS.METHOD, name });
const wModule = (name) => wLine({ tag: BLOCK_TAGS.MODULE, name });
const wNamespace = (name) => wLine({ tag: BLOCK_TAGS.NAMESPACE, name });
const allWriteMethods = [
    wNl,
    wTypedef,
    wStr,
    wProp,
    wParam,
    wThrowsErr,
    wDeprecated,
    wSee,
    wExample,
    wConstructor,
    wThis,
    wExtends,
    wPrivate,
    wPublic,
    wStatic,
    wMemberOf,
    wCallback,
    wDescription,
    wFunction,
    wMethod,
    wModule,
    wNamespace,
];
const pkg = {
    open: openJSDoc,
    close: closeJSDoc,
    chainMethods: allWriteMethods,
};
export { allWriteMethods, openJSDoc, closeJSDoc, pkg };
//# sourceMappingURL=chainMethods.js.map