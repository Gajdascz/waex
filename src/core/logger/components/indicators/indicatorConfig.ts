import { LOG_LEVELS, type LogLevel } from '../loggerUtils.js';
import type { EntityManager } from '../../../utils/types.js';

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

const BASE_INDICATOR_KEYS = {
  NEUTRAL: 'neutral',
  SUCCESS: 'success',
  INFO: 'info',
  WARN: 'warn',
  ERROR: 'error',
} as const;

const BASE_INDICATOR_KEY_SET = new Set<string>(
  Object.values(BASE_INDICATOR_KEYS),
);

interface IndicatorConfig {
  key: string;
  level: LogLevel;
  color: string;
  symbol: string;
}
const BASE_INDICATORS: IndicatorConfig[] = [
  {
    key: BASE_INDICATOR_KEYS.NEUTRAL,
    level: LOG_LEVELS.LOG,
    color: '#696969',
    symbol: '○',
  },
  {
    key: BASE_INDICATOR_KEYS.SUCCESS,
    level: LOG_LEVELS.LOG,
    color: '#006500',
    symbol: `✔`,
  },
  {
    key: BASE_INDICATOR_KEYS.INFO,
    level: LOG_LEVELS.INFO,
    color: '#057ddf',
    symbol: 'ⓘ',
  },
  {
    key: BASE_INDICATOR_KEYS.WARN,
    level: LOG_LEVELS.WARN,
    color: '#ffff00',
    symbol: '⚠️',
  },
  {
    key: BASE_INDICATOR_KEYS.ERROR,
    level: LOG_LEVELS.ERROR,
    color: '#ff5555',
    symbol: '✘',
  },
] as const;

const getBaseIndicators = (): IndicatorConfig[] =>
  BASE_INDICATORS.map((cf) => ({ ...cf }));

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
