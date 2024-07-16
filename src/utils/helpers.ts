import type { RGBChannel, RGBColor } from "./constants.js";



const applyErrTint = (rgb: RGBColor) => rgb.map((channel: RGBChannel, index: number) => Math.min(channel + TINT[index],255)) as RGBColor;

const getBoundError = (index: number | string, arr: unknown[]) => `Provided index is out of bounds: ${arr.length === 0 ? `No commands have been registered` : `| got: ${String(index)} | min: 0 | max: ${String(arr.length-1)} |`}`
const isInBounds = (index: number | string, arr: unknown[]) => arr.length && +index >= 0 && +index < arr.length;


export {applyErrTint,getBoundError,isInBounds}