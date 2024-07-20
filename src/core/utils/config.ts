import type { CommandConfig } from '../command/CommandManager.js';
import { LOG_LEVELS, type LoggerConfig } from '../logger/Logger.js';

interface WatcherOptions {
  persistent: boolean;
  ignored: string | RegExp;
  ignoreInitial: boolean;
  followSymlinks: boolean;
  cwd: string;
  usePolling: boolean;
  interval: number;
  binaryInterval: number;
  alwaysStat: boolean;
  awaitWriteFinish: {
    stabilityThreshold: number;
    pollInterval: number;
  };
  ignorePermissionErrors: boolean;
  atomic: boolean | number;
  depth?: number;
}
interface WatcherConfig {
  paths: string | string[];
  options: WatcherOptions;
}
interface ConfigOptions {
  debounceRate: number;
  watcher: WatcherConfig;
  logger: LoggerConfig;
  commands: CommandConfig[];
}

const debounceRate = 300;
const watcherConfig: WatcherConfig = {
  paths: './src/**/*.{js,ts}',
  options: {
    persistent: true,

    // Path Filtering
    ignored: '/node_modules/',
    ignoreInitial: false,
    followSymlinks: true,
    cwd: '.',

    // Performance
    usePolling: false,
    interval: 100,
    binaryInterval: 300,
    alwaysStat: false,
    // depth: 99,
    awaitWriteFinish: {
      stabilityThreshold: 2000,
      pollInterval: 100,
    },

    // Errors
    ignorePermissionErrors: false,
    atomic: true,
  },
};
const loggerConfig: LoggerConfig = {
  defaults: {
    label: '[APP]',
    level: LOG_LEVELS.LOG,
    colors: {
      log: '#87ceeb',
      info: '#0dbaff',
      error: '#9c0000',
      warning: '#805500',
    },
  },
  indicators: [],
};
const commands = [
  {
    runner: 'npx',
    args: ['prettier', '--write'],
    label: '[PRETTIER]',
    logColor: '#56B3FF',
    reqPath: true,
  },
  {
    runner: 'npx',
    args: ['eslint', '--fix'],
    label: '[ESLINT]',
    logColor: '#4B32C3',
    reqPath: true,
  },
  {
    runner: 'npx',
    args: ['tsx'],
    label: '[TSX]',
    logColor: '#0FFFA0',
    reqPath: true,
  },
] as CommandConfig[];

const appDefaults: ConfigOptions = {
  debounceRate,
  watcher: watcherConfig,
  logger: loggerConfig,
  commands,
};
export { appDefaults, type ConfigOptions };
