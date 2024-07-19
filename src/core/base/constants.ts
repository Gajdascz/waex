import type { CommandConfig } from '../command/CommandManager.js';
import { type IndicatorConfig } from '../logger/IndicatorManager.js';

const LOG_TYPES = {
  LOG: 'log',
  INFO: 'info',
  WARN: 'warn',
  ERROR: 'error',
} as const;

const INDICATORS: IndicatorConfig[] = [
  {
    key: 'neutral',
    level: LOG_TYPES.LOG,
    color: '#696969',
    symbol: '○',
  },
  {
    key: 'success',
    level: LOG_TYPES.INFO,
    color: '#006500',
    symbol: `✔`,
  },
  {
    key: 'warn',
    level: LOG_TYPES.WARN,
    color: '#ffff00',
    symbol: '⚠️',
  },
  {
    key: 'error',
    level: LOG_TYPES.ERROR,
    color: '#ff5555',
    symbol: '✘',
  },
];

const COMMANDS: CommandConfig[] = [
  {
    runner: 'npx',
    cmd: 'prettier',
    args: ['--write'],
    label: '[PRETTIER]',
    logColor: '#56B3FF',
    reqPath: true,
  },
  {
    runner: 'npx',
    cmd: 'eslint',
    args: ['--fix'],
    label: '[ESLINT]',
    logColor: '#4B32C3',
    reqPath: true,
  },
  {
    runner: 'npx',
    cmd: 'tsx',
    args: ['src/index.ts'],
    label: '[TSX]',
    logColor: '#0FFFA0',
    reqPath: false,
  },
] as const;

const LOGGER = {
  types: LOG_TYPES,
  defaults: {
    label: '[APP]',
    logColor: '#87ceeb',
    infoColor: '#0dbaff',
    errorColor: '#9c0000',
    warningColor: '#805500',
    loadDefault: true,
    addIndicators: [],
    level: LOG_TYPES.LOG,
  },
};

const DEBOUNCE_RATE = 100;
const DEFAULT_CONFIG = {
  debounceRate: DEBOUNCE_RATE,
  logger: { ...LOGGER.defaults },
  commands: COMMANDS
} as const;

export {
  DEFAULT_CONFIG,
  DEBOUNCE_RATE,
  INDICATORS,
  COMMANDS,
  LOGGER,
  LOG_TYPES,
};
