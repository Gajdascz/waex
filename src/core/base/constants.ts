import type { CommandConfig } from "../command/commandManager.js";

const LOG_TYPES = {
  LOG: 'log',
  INFO: 'info',
  WARN: 'warn',
  ERROR: 'error',
} as const;

//#region Defaults
const LOGGER = {
  TYPES: LOG_TYPES,
  label: '[APP]',
  color: '#87ceeb',
  errorColor: '#9c0000',
  warningColor: '#805500',
  INDICATORS: [
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
    color:  '#ffff00',
    symbol: '⚠️',
  },
  {
    key: 'error',
    level: LOG_TYPES.ERROR,
    color: '#ff5555',
    symbol: '✘',
  },
] as const

}

// TODO: Implement automated necessary package install and file configuration when loadDefaultCommands is true.
const COMMANDS: CommandConfig[] = [
  {
    runner: 'npx',
    cmd: 'prettier',
    args: ['--write'],
    label: '[PRETTIER]',
    logColor: '#56B3FF',
  },
  {
    runner: 'npx',
    cmd: 'eslint',
    args: ['--fix'],
    label: '[ESLINT]',
    logColor: '#4B32C3'
  },
  {
    runner: 'npm run',
    cmd: 'tsx',
    args: [],
    label: '[TSX]',
    logColor: '#0FFFA0'
  },
] as const

export {  COMMANDS, LOGGER, LOG_TYPES };