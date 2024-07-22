import { LOG_LEVELS } from '../loggerUtils.js';
/**
 * Base indicator keys.
 */
const BASE_INDICATOR_KEYS = {
    neutral: 'neutral',
    success: 'success',
    info: 'info',
    warn: 'warn',
    error: 'error',
};
/**
 * A set of base indicator keys.
 */
const BASE_INDICATOR_KEY_SET = new Set(Object.values(BASE_INDICATOR_KEYS));
/**
 * Array of base indicator configurations.
 */
const BASE_INDICATORS = [
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
];
/**
 * Returns a copy of the base indicators.
 * @returns A copy of the base indicator configurations.
 */
const getBaseIndicators = () => BASE_INDICATORS.map((cf) => ({ ...cf }));
export { BASE_INDICATOR_KEYS, BASE_INDICATOR_KEY_SET, BASE_INDICATORS, getBaseIndicators, };
//# sourceMappingURL=indicatorConfig.js.map