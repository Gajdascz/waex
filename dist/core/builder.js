import { createChain } from './Chain.js';
import { pkg } from './chainMethods.js';
const builder = createChain({
    startFn: pkg.open,
    endFn: pkg.close,
    initMethods: pkg.chainMethods,
});
export default builder;
// import './Types.js';
// import { BLOCK_TAGS, BASIC_TYPES } from './constants.js';
// import Chain from './Chain.ts';
// import { allWriteMethods, openJSDoc, closeJSDoc } from './chainMethods.js';
// const builder = Chain(openJSDoc, closeJSDoc, {
//   errMsgLabel: 'wJSDoc builder',
//   methods: allWriteMethods,
// });
// console.log(builder);
// console.log(builder.start().wNl().end());
// /**@type {w_props} */
// // w_props: function (props) {
// //   this.curr += props.forEach((p) => {
// //     this.curr += this.curr.prop(p.name, p.type, p.desc);
// //     if (p.details?.length > 1)
// //       p.details.forEach((d) => (this.curr += this.str(d.text, d.bull)));
// //   });
// //   return this;
// // },
//# sourceMappingURL=builder.js.map