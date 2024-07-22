import { LOG_LEVELS, type LogLevel } from '../loggerUtils.js';
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
type Indicator = IndicatorConfig & { str: string };
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
const BASE_INDICATOR_KEYS = {
  neutral: 'neutral',
  success: 'success',
  info: 'info',
  warn: 'warn',
  error: 'error',
} as const;
/**
 * A set of base indicator keys.
 */
const BASE_INDICATOR_KEY_SET = new Set<string>(Object.values(BASE_INDICATOR_KEYS));

/**
 * Array of base indicator configurations.
 */
const BASE_INDICATORS: IndicatorConfig[] = [
  {
    key: BASE_INDICATOR_KEYS.neutral,
    level: LOG_LEVELS.log,
    color: '#696969',
    symbol: '○',
  },
  {
    key: BASE_INDICATOR_KEYS.success,
    level: LOG_LEVELS.log,
    color: '#006500',
    symbol: `✔`,
  },
  {
    key: BASE_INDICATOR_KEYS.info,
    level: LOG_LEVELS.info,
    color: '#057ddf',
    symbol: 'ⓘ',
  },
  {
    key: BASE_INDICATOR_KEYS.warn,
    level: LOG_LEVELS.warn,
    color: '#ffff00',
    symbol: '⚠️',
  },
  {
    key: BASE_INDICATOR_KEYS.error,
    level: LOG_LEVELS.error,
    color: '#ff5555',
    symbol: '✘',
  },
] as const;
/**
 * Returns a copy of the base indicators.
 * @returns A copy of the base indicator configurations.
 */
const getBaseIndicators = (): IndicatorConfig[] => BASE_INDICATORS.map((cf) => ({ ...cf }));

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
