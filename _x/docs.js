/** Opens a new JSDoc block.
 * @callback openJSDoc
 * @param {string} [blockComment=null] Optionally includes a comment above the JSDoc block.
 * @returns {string} The formatted JSDoc header.
 */

/** Closes an open JSDoc block and resets the chain.
 * @callback closeJSDoc
 * @param {string} [endComment=null] Optionally includes a comment below the JSDoc block.
 * @returns {string} The complete formatted JSDoc block.
 */

/** Appends a JSDoc line with the specified parameters.
 * @callback wLine
 * @param {Object} options The options for the JSDoc line.
 * @param {string} [options.tag=null] The JSDoc tag.
 * @param {string} [options.name=null] The name associated with the tag.
 * @param {string} [options.type=null] The type annotation.
 * @param {string} [options.desc=null] The description of the tag or text.
 * @param {string} [options.intersection=null] The intersection type.
 * @param {boolean} [options.bull=false] Whether to include a bullet point.
 * @param {string} [options.trailingNewLines='\n'] The new lines to append at the end.
 * @returns {Object} The builder object for chaining.
 *
 * @example
 * builder.wLine({
 *   tag: '@param',
 *   name: 'str1',
 *   type: 'string',
 *   desc: 'The first string.',
 *   intersection: null,
 *   bull: false,
 * });
 *
 * @example
 * builder.wLine({
 *   desc: 'This is a regular description line.',
 *   bull: false,
 * });
 */

/** Appends a regular JSDoc line
 * @callback wStr
 * @param {string} text The text to include.
 * @param {boolean} [bull=false] Whether to include a bullet point.
 * @returns {string} The formatted string.
 *
 * @example
 * builder.wStr('This is a regular description line.', false);
 */

/** Appends a JSDoc `@typedef` annotation.
 * @callback wTypedef
 * @param {string} name The name of the typedef.
 * @param {string} [desc=null] The description of the typedef.
 * @param {string} [intersection=null] The intersection type.
 * @param {string} [type="Object"] The type annotation.
 * @returns {string} The formatted JSDoc `@typedef` annotation.
 * @example
 * builder.wTypedef('MyType', { type: 'Object' });
 */

/** Appends a JSDoc `@property` annotation.
 * @callback wProp
 * @param {string} name The name of the property.
 * @param {string} tAnnotation The type annotation.
 * @param {string} desc The description of the property.
 * @returns {string} The formatted JSDoc `@property` annotation.
 */

/** Appends a JSDoc `@parameter` annotation.
 * @callback wParam
 * @param {string} name The name of the parameter.
 * @param {string} type The type annotation.
 * @param {string} desc The description of the parameter.
 * @returns {string} The formatted JSDoc `@param` annotation.
 */

/** Appends a JSDoc `@throws` annotation (with Error type expression).
 * @callback wThrowsErr
 * @param {string} desc The description of the error.
 * @returns {string} The formatted JSDoc `@throws` annotation.
 *
 * @example
 * builder.wThrows('An error occurred.');
 */

/** Appends a JSDoc `@deprecated` annotation.
 * @callback wDeprecated
 * @param {string} desc The description of the deprecation.
 * @returns {string} The formatted JSDoc `@deprecated` annotation.
 *
 * @example
 * builder.wDeprecated('This method is deprecated.');
 */

/** Appends a JSDoc `@see` annotation.
 * @callback wSee
 * @param {string} ref The reference to include.
 * @returns {string} The formatted JSDoc `@see` annotation.
 *
 * @example
 * builder.wSee('MyClass');
 */

/** Appends a JSDoc `@example` annotation.
 * @callback wExample
 * @returns {string} The formatted JSDoc `@example` annotation.
 *
 * @example
 * builder.wExample();
 */

/** Appends a JSDoc `@constructor` annotation.
 * @callback wConstructor
 * @returns {string} The formatted JSDoc `@constructor` annotation.
 *
 * @example
 * builder.wConstructor();
 */

/** Appends a JSDoc `@this` annotation.
 * @callback wThis
 * @param {string} type The type annotation.
 * @returns {string} The formatted JSDoc `@this` annotation.
 *
 * @example
 * builder.wThis('MyClass');
 */

/** Appends a JSDoc `@extends` annotation.
 * @callback wExtends
 * @param {string} type The type annotation.
 * @returns {string} The formatted JSDoc `@extends` annotation.
 *
 * @example
 * builder.wExtends('ParentClass');
 */

/** Appends a JSDoc `@private` annotation.
 * @callback wPrivate
 * @returns {string} The formatted JSDoc `@private` annotation.
 *
 * @example
 * builder.wPrivate();
 */

/** Appends a JSDoc `@public` annotation.
 * @callback wPublic
 * @returns {string} The formatted JSDoc `@public` annotation.
 *
 * @example
 * builder.wPublic();
 */

/** Appends a JSDoc `@static` annotation.
 * @callback wStatic
 * @returns {string} The formatted JSDoc `@static` annotation.
 *
 * @example
 * builder.wStatic();
 */

/** Appends a JSDoc `@memberof` annotation.
 * @callback wMemberOf
 * @param {string} parent The parent to include.
 * @returns {string} The formatted JSDoc `@memberof` annotation.
 *
 * @example
 * builder.wMemberOf('MyNamespace');
 */

/** Appends a JSDoc `@callback` annotation.
 * @callback wCallback
 * @param {string} name The name of the callback.
 * @returns {string} The formatted JSDoc `@callback` annotation.
 *
 * @example
 * builder.wCallback('MyCallback');
 */

/** Appends a JSDoc `@description` annotation.
 * @callback wDescription
 * @param {string} desc The description to include.
 * @returns {string} The formatted JSDoc `@description` annotation.
 *
 * @example
 * builder.wDescription('This is a description.');
 */

/** Appends a JSDoc `@function` annotation.
 * @callback wFunction
 * @param {string} name The name of the function.
 * @returns {string} The formatted JSDoc `@function` annotation.
 *
 * @example
 * builder.wFunction('myFunction');
 */

/** Appends a JSDoc `@method` annotation.
 * @callback wMethod
 * @param {string} name The name of the method.
 * @returns {string} The formatted JSDoc `@method` annotation.
 *
 * @example
 * builder.wMethod('myMethod');
 */

/** Appends a JSDoc `@module` annotation.
 * @callback wModule
 * @param {string} name The name of the module.
 * @returns {string} The formatted JSDoc `@module` annotation.
 *
 * @example
 * builder.wModule('myModule');
 */

/** Appends a JSDoc `@namespace` annotation.
 * @callback wNamespace
 * @param {string} name The name of the namespace.
 * @returns {string} The formatted JSDoc `@namespace` annotation.
 *
 * @example
 * builder.wNamespace('myNamespace');
 */
