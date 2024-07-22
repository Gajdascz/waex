import type { CreateIndicatorArgs } from './indicators/indicatorConfig.js';

//#region Constants
/**
 * Log levels used in the logging system.
 */
const LOG_LEVELS = {
  log: 'log',
  info: 'info',
  warn: 'warn',
  error: 'error',
} as const;
//#endregion Constants

//#region Types
/**
 * Type representing log levels.
 */
type LogLevel = (typeof LOG_LEVELS)[keyof typeof LOG_LEVELS];

/**
 * Colors used for different log levels in the logger.
 * log - The color for log level.
 * info - The color for info level.
 * error - The color for error level.
 * warning - The color for warning level.
 */
interface LoggerColors {
  log: string;
  info: string;
  error: string;
  warning: string;
}

/**
 * Default settings for the logger.
 * label - The default label for logs.
 * level - The default log level.
 * colors - The default colors for log levels.
 */
interface LoggerDefaults {
  label: string;
  level: LogLevel;
  colors: LoggerColors;
}
/**
 * Configuration for the logger.
 * defaults - The default settings for the logger.
 * [indicators] - Optional indicators to create.
 */
interface LoggerConfig {
  defaults: LoggerDefaults;
  indicators?: CreateIndicatorArgs;
}
/**
 * An entry in the body of a log detail.
 * key - The key for the entry.
 * value - The value for the entry.
 * [color] - The color for the entry.
 */
interface LogDetailBodyEntry {
  key: string;
  value: unknown;
  color?: string;
}
/**
 * The body of a log detail, which is an array of entries.
 */
type LogDetailBody = LogDetailBodyEntry[];
/**
 * The head of a log detail, containing primary information about the log.
 * command - The command associated with the log.
 * [indicate] - Additional indication information.
 * [level] - The log level.
 * [label] - The label for the log.
 * [color] - The color for the log.
 */
interface LogDetailHead {
  command: string;
  indicate?: string;
  level?: LogLevel;
  label?: string;
  color?: string;
}
/**
 * Colors for a log detail, allowing partial override of default logger colors.
 */
type LogDetailColors = Partial<LoggerColors>;
/**
 * Detailed information about a log entry.
 * head - The head section of the log detail.
 * [body] - The body section of the log detail.
 */
interface LogDetail {
  head: LogDetailHead;
  body?: LogDetailBody;
}
//#endregion Types

//#region Helpers
/**
 * Resolves the appropriate color for a log level, using provided or default colors.
 * @param level - The log level to resolve the color for.
 * @param defaultColors - The default colors for log levels.
 * @param [providedColors] - Optional colors provided for overriding defaults.
 * @returns The resolved color for the log level.
 */
const resolveColor = (
  level: LogLevel,
  defaultColors: LoggerColors,
  providedColors: LogDetailColors = {},
) => {
  const { log, info, warning, error } = providedColors;
  switch (level) {
    case LOG_LEVELS.info:
      return info ?? defaultColors.info;
    case LOG_LEVELS.warn:
      return warning ?? defaultColors.warning;
    case LOG_LEVELS.error:
      return error ?? defaultColors.error;
    default:
      return log ?? defaultColors.log;
  }
};
//#endregion Helpers

export { resolveColor, LOG_LEVELS };

export type {
  LogDetail,
  LogDetailColors,
  LogDetailHead,
  LogDetailBody,
  LoggerConfig,
  LogLevel,
  LoggerDefaults,
  LoggerColors,
};
