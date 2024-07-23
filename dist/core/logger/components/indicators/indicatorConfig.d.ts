import { type LogLevel } from '../loggerUtils.js';
import type { EntityManager } from '../../../utils/types.js';
/**
 * Configuration for an indicator.
 * key - The key for the indicator.
 * level - The log level for the indicator.
 * color - The color associated with the indicator.
 * symbol - The symbol representing the indicator.
 */
interface IndicatorConfig {
  key: string;
  level: LogLevel;
  color: string;
  symbol: string;
}
/**
 * An indicator with an additional string representation.
 */
type Indicator = IndicatorConfig & {
  str: string;
};
/**
 * A record of indicators.
 */
type Indicators = Record<string, Indicator>;
/**
 * A selector for an indicator, which is a string.
 */
type IndicatorSelector = string;
/**
 * Indicator manager type that extends EntityManager with additional methods.
 * readByLevel - Reads an indicator by its log level.
 * keys - The keys of the indicators.
 */
interface IndicatorManagerType
  extends EntityManager<IndicatorConfig, IndicatorSelector, Indicator> {
  readByLevel(level: LogLevel): Indicator | never;
  keys: (keyof Indicators)[];
}
/**
 * Arguments for creating indicators, which can be a single config or an array of configs.
 */
type CreateIndicatorArgs = IndicatorConfig | IndicatorConfig[];
/**
 * Base indicator keys.
 */
declare const BASE_INDICATOR_KEYS: {
  readonly neutral: 'neutral';
  readonly success: 'success';
  readonly info: 'info';
  readonly warn: 'warn';
  readonly error: 'error';
};
/**
 * A set of base indicator keys.
 */
declare const BASE_INDICATOR_KEY_SET: Set<string>;
/**
 * Array of base indicator configurations.
 */
declare const BASE_INDICATORS: IndicatorConfig[];
/**
 * Returns a copy of the base indicators.
 * @returns A copy of the base indicator configurations.
 */
declare const getBaseIndicators: () => IndicatorConfig[];
export {
  BASE_INDICATOR_KEYS,
  BASE_INDICATOR_KEY_SET,
  BASE_INDICATORS,
  getBaseIndicators,
  type IndicatorConfig,
  type Indicator,
  type Indicators,
  type IndicatorManagerType,
  type CreateIndicatorArgs,
  type IndicatorSelector,
};
//# sourceMappingURL=indicatorConfig.d.ts.map
