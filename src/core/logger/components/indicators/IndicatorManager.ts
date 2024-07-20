import chalk from 'chalk';
import type { LogLevel } from '../loggerUtils.js';
import { normalizeAsArray } from '../../../utils/helpers.js';
import {
  BASE_INDICATOR_KEY_SET,
  getBaseIndicators,
  type IndicatorManagerType,
  type Indicator,
  type Indicators,
  type IndicatorSelector,
  type CreateIndicatorArgs,
  type IndicatorConfig,
} from './indicatorConfig.js';

class IndicatorManager implements IndicatorManagerType {
  private indicators: Indicators = {};
  private addIndicator(c: IndicatorConfig) {
    this.indicators[c.key] = { ...c, str: chalk.hex(c.color).bold(c.symbol) };
  }
  private getNotRegisteredErr(target: IndicatorSelector): Error {
    return new Error(`${target} not found in registered indicators.`);
  }
  private findFirstOfLevel(level: LogLevel) {
    for (const key in this.indicators) {
      const currentIndicator = this.indicators[key];
      if (currentIndicator.level === level) return currentIndicator;
    }
  }
  constructor(indicators?: CreateIndicatorArgs) {
    const configArr = getBaseIndicators();
    if (indicators) configArr.push(...normalizeAsArray(indicators));
    configArr.forEach((cf) => this.create(cf));
  }

  public read(target?: IndicatorSelector): Indicator | Indicators {
    if (!target) return structuredClone(this.indicators);
    if (target in this.indicators) return { ...this.indicators[target] };
    throw this.getNotRegisteredErr(target);
  }
  public readByLevel(level: LogLevel): Indicator {
    const indicator = this.findFirstOfLevel(level);
    if (!indicator)
      throw new Error(`${level} not found in registered indicators.`);
    return indicator;
  }
  public create(config: CreateIndicatorArgs) {
    normalizeAsArray(config).forEach((cf) => {
      if (cf.key in this.indicators)
        throw new Error(`${cf.key} is already a registered indicator.`);
      this.addIndicator(cf);
    });
    return this;
  }
  public update(target: IndicatorSelector, updateProperties: IndicatorConfig) {
    if (!(target in this.indicators)) throw this.getNotRegisteredErr(target);
    if (BASE_INDICATOR_KEY_SET.has(target)) {
      if (updateProperties.key && updateProperties.key !== target)
        throw new Error(`Cannot overwrite the key of a base indicator.`);
    }
    const mergedProps = { ...this.indicators[target], ...updateProperties };
    this.addIndicator(mergedProps);
    return this;
  }
  public delete(target: IndicatorSelector) {
    if (!(target in this.indicators)) throw this.getNotRegisteredErr(target);
    if (BASE_INDICATOR_KEY_SET.has(target))
      throw new Error(
        `Cannot delete a base indicator. You can update base indicators or add custom ones.`,
      );
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete this.indicators[target];
    return this;
  }
  public reset() {
    this.indicators = {};
    return this;
  }
}

const wrapIndicatorManager = (manager: IndicatorManager) => ({
  registerIndicator(indicatorConfig: CreateIndicatorArgs) {
    manager.create(indicatorConfig);
  },
  getIndicator(target?: string) {
    return manager.read(target);
  },
  getIndicatorByLevel(level: LogLevel) {
    return manager.readByLevel(level);
  },
  updateIndicator(target: string, updateProperties: IndicatorConfig) {
    return manager.update(target, updateProperties);
  },
  removeIndicator(target: string) {
    return manager.delete(target);
  },
  clearAllIndicators() {
    return manager.reset();
  },
  getAllKeys(){
    const indicators = manager.read();
    if(Array.isArray(indicators)) {
      return indicators.map((i:Indicator) => i.key)
    }
  }
});
export {
  IndicatorManager,
  wrapIndicatorManager,
  type IndicatorManagerType,
  type Indicator,
  type Indicators,
  type IndicatorSelector,
  type CreateIndicatorArgs,
  type IndicatorConfig,
};
