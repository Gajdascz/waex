import chalk from 'chalk';
import type { EntityManager, LogLevel } from "../base/types.js";

interface IndicatorConfig { 
  key: string, 
  level: LogLevel, 
  color: string, 
  symbol: string 
}
interface Indicator extends IndicatorConfig {
  str: string
}
type Indicators = Record<string,Indicator>
type IndicatorSelector = string
interface IndicatorManagerType extends EntityManager<IndicatorConfig,IndicatorSelector,Indicator> {
  readByLevel(level:LogLevel): Indicator | never;
}

type IndicatorCstrArgs = IndicatorConfig | IndicatorConfig[] ;

export type {IndicatorConfig,Indicator,Indicators,IndicatorSelector,IndicatorManagerType, IndicatorCstrArgs};


class IndicatorManager implements IndicatorManagerType{
  private indicators:Indicators = {}
  private addIndicator(c:IndicatorConfig) { this.indicators[c.key] = {...c, str: chalk.hex(c.color).bold(c.symbol) } }
  private isRegistered(target: IndicatorSelector) { return target in this.indicators }
  private getNotRegisteredErr(target: IndicatorSelector):Error { return new Error(`${target} not found in registered indicators.`) }
  private findFirstOfLevel(level: LogLevel) { 
    for(const key in this.indicators) {
      const currentIndicator = this.indicators[key];
      if(currentIndicator.level === level) return currentIndicator;
    }
  }
  create(config: IndicatorCstrArgs) {
      if(!Array.isArray(config)) config = [config]; 
      config.forEach(cf => {
        if(this.isRegistered(cf.key)) throw new Error(`${cf.key} is already a registered indicator.`);
        this.addIndicator(cf);
      });
    return {};
  }
  read(target?:IndicatorSelector): Indicator|Indicators {
    if(target) { 
      if(!this.isRegistered(target)) throw this.getNotRegisteredErr(target);
      return this.indicators[target];
    }
    return structuredClone(this.indicators)
  }
  readByLevel(level: LogLevel): Indicator {
    const indicator = this.findFirstOfLevel(level);
    if(!indicator) throw new Error(`${level} not found in registered indicators.`);
    return indicator;
  }
  update(target: IndicatorSelector, updateProperties: IndicatorConfig) {
    if(!this.isRegistered(target)) throw this.getNotRegisteredErr(target);
    this.addIndicator(updateProperties);
    return true;
  }
  delete(target: IndicatorSelector) {
    if(!this.isRegistered(target)) throw this.getNotRegisteredErr(target);
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete this.indicators[target];
    return true;
  }
  reset() {
    this.indicators = {}
    return { message: "Indicators Reset" }
  }
}

const indicatorManager = new IndicatorManager();
export default {
  registerIndicator(indicatorConfig: IndicatorCstrArgs) { indicatorManager.create(indicatorConfig) },
  getIndicator(target?:string) {return indicatorManager.read(target) },
  getIndicatorByLevel(level: LogLevel){return indicatorManager.readByLevel(level)},
  updateIndicator(target: string, updateProperties: IndicatorConfig) { return indicatorManager.update(target, updateProperties); },
  removeIndicator(target:string) { return indicatorManager.delete(target) },
  clearAllIndicators() {return indicatorManager.reset() },
}
