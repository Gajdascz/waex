import type { CommandConfig } from '../../command/CommandManager.js';
import { LOG_LEVELS, type LoggerConfig } from '../../logger/Logger.js';

/**
 * Options for configuring the file watcher.
 * persistent - Whether the watcher should continue running as long as files are being watched.
 * ignored - Files or directories to be ignored.
 * ignoreInitial - Whether to ignore the initial add events.
 * followSymlinks - Whether to follow symlinks.
 * cwd - The base directory for watching.
 * usePolling - Whether to use file system polling.
 * interval - The polling interval.
 * binaryInterval - The polling interval for binary files.
 * alwaysStat - Whether to always stat files.
 * awaitWriteFinish - Options for awaiting write finish.
 * awaitWriteFinish.stabilityThreshold - The threshold for stability in milliseconds.
 * awaitWriteFinish.pollInterval - The polling interval for stability checks.
 * ignorePermissionErrors - Whether to ignore permission errors.
 * atomic - Whether to use atomic writes.
 * [depth] - The depth of subdirectories to watch.
 */
interface ChokidarOptions {
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
/**
 * Configuration for the file watcher.
 * paths - The paths to watch.
 * options - The options for the watcher.
 */
interface WatcherConfig {
  paths: string | string[];
  options?: Partial<ChokidarOptions>;
}
/**
 * Configuration options for the application.
 *  - debounceRate: The debounce rate in milliseconds or false to disable.
 *  - limitProcessing: Prevents further changes on a path that is currently being processed from triggering concurrent events.
 *  - watcher: The configuration for the file watcher.
 *  - logger: The configuration for the logger.
 *  - commands: The list of command configurations.
 */
interface ConfigOptions {
  debounceRate: number | false;
  limitProcessing: boolean;
  watcher: WatcherConfig;
  logger: LoggerConfig;
  commands: CommandConfig[];
}
/**
 * The debounce rate in milliseconds.
 */
const debounceRate = 500;
/**
 * The configuration for the file watcher.
 */
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
    // awaitWriteFinish: {
    // stabilityThreshold: 2000,
    // pollInterval: 100,
    // },

    // Errors
    ignorePermissionErrors: false,
    atomic: true,
  },
};
/**
 * The configuration for the logger.
 */
const loggerConfig: LoggerConfig = {
  defaults: {
    label: '[APP]',
    level: LOG_LEVELS.log,
    colors: {
      log: '#87ceeb',
      info: '#0dbaff',
      error: '#ff3232',
      warning: '#c48c1d',
    },
  },
  indicators: [],
};
/**
 * The list of command configurations.
 */
const commands = [] as CommandConfig[];
/**
 * The default configuration options for the application.
 */
const appDefaults: ConfigOptions = {
  debounceRate,
  limitProcessing: true,
  watcher: watcherConfig,
  logger: loggerConfig,
  commands,
};
export { appDefaults, type ConfigOptions };
