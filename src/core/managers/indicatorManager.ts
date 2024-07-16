import { LOG_TYPES, type RGBColor, type ChalkString } from "../../utils/constants.js";
import chalk from 'chalk';
import logger from "../logger.js";

const indicators:Indicators = {}
const addIndicator = (c: IndicatorConfig) => indicators[c.key] = chalk.rgb(...c.color).bold(c.symbol);


interface IndicatorConfig {
  key: string;
  color: RGBColor;
  symbol: string;
}
type ConfiguredIndicator = ChalkString
type Indicators = Record<string,ConfiguredIndicator>
interface IndicatorManager {
  register: (config: IndicatorConfig | IndicatorConfig[]) => true | never;
  getAll: () => Indicators[];
  update: (target: string, updateProperties: IndicatorConfig) => true | never;
  remove: (target: string) => true | never;
  reset: () => boolean; 
}
const indicatorManager: IndicatorManager= {
  register: (config: IndicatorConfig | IndicatorConfig[]) => {
    if(!Array.isArray(config)) config = [config]; 
    config.forEach(cf => {
      if(cf.key in indicators) logger.log(`${cf.key} indicator has been overwritten.`, {type: LOG_TYPES.WARN})
      addIndicator(cf);
    });
    return true;
  },
  getAll: () => Object.entries(indicators).map(([key,value]) => ({key,value})),
  update: (target: string, updateProperties: IndicatorConfig) => {
    if(!(target in indicators)) throw new Error(`${target} not found in registered indicators.`);
    addIndicator(updateProperties);
    return true;
  },
  remove: (target: string) => {
    if(!(target in indicators)) throw new Error(`${target} not found in registered indicators.`);
    return true;
  },
  reset: () => { 
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    Object.keys(indicators).forEach(i => delete indicators[i]); 
    return true}
}

export default indicatorManager
export type {IndicatorConfig,ConfiguredIndicator,IndicatorManager,Indicators}