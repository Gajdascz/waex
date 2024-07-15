import { createChain, type ChainArgs, type Chain } from './Chain.js';
import { pkg } from './chainMethods.js';

const createBuilder = (): Chain =>
  createChain({
    startFn: pkg.open,
    endFn: pkg.close,
    initMethods: pkg.chainMethods,
  } as ChainArgs);

export default createBuilder;


// /**@type {w_props} */
// // w_props: function (props) {
// //   this.curr += props.forEach((p) => {
// //     this.curr += this.curr.prop(p.name, p.type, p.desc);
// //     if (p.details?.length > 1)
// //       p.details.forEach((d) => (this.curr += this.str(d.text, d.bull)));
// //   });
// //   return this;
// // },
