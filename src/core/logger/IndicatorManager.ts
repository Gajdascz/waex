import chalk from 'chalk';
import type { EntityManager, LogLevel } from '../base/types.js';
import { normalizeAsArray } from '../base/helpers.js';

interface IndicatorConfig {
  key: string;
  level: LogLevel;
  color: string;
  symbol: string;
}
interface Indicator extends IndicatorConfig {
  str: string;
}
type Indicators = Record<string, Indicator>;
type IndicatorSelector = string;
interface IndicatorManagerType
  extends EntityManager<IndicatorConfig, IndicatorSelector, Indicator> {
  readByLevel(level: LogLevel): Indicator | never;
}

type CreateIndicatorArgs = IndicatorConfig | IndicatorConfig[];

class IndicatorManager implements IndicatorManagerType {
  private indicators: Indicators = {};
  private addIndicator(c: IndicatorConfig) {
    this.indicators[c.key] = { ...c, str: chalk.hex(c.color).bold(c.symbol) };
  }
  private isRegistered(target: IndicatorSelector) {
    return target in this.indicators;
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
    if (indicators) {
      const nIndicators = normalizeAsArray(indicators);
      nIndicators.forEach((ind) => this.create(ind));
    }
  }

  public read(target?: IndicatorSelector): Indicator | Indicators {
    if (target) {
      if (!this.isRegistered(target)) throw this.getNotRegisteredErr(target);
      return this.indicators[target];
    }
    return structuredClone(this.indicators);
  }
  public readByLevel(level: LogLevel): Indicator {
    const indicator = this.findFirstOfLevel(level);
    if (!indicator)
      throw new Error(`${level} not found in registered indicators.`);
    return indicator;
  }
  public create(config: CreateIndicatorArgs) {
    if (!Array.isArray(config)) config = [config];
    config.forEach((cf) => {
      if (this.isRegistered(cf.key))
        throw new Error(`${cf.key} is already a registered indicator.`);
      this.addIndicator(cf);
    });
    return this;
  }
  public update(target: IndicatorSelector, updateProperties: IndicatorConfig) {
    if (!this.isRegistered(target)) throw this.getNotRegisteredErr(target);
    this.addIndicator(updateProperties);
    return this;
  }
  public delete(target: IndicatorSelector) {
    if (!this.isRegistered(target)) throw this.getNotRegisteredErr(target);
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
});
export {
  IndicatorManager,
  wrapIndicatorManager,
  type IndicatorConfig,
  type Indicator,
  type Indicators,
  type IndicatorSelector,
  type IndicatorManagerType,
  type CreateIndicatorArgs,
};
