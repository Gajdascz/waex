import {
  LOG_LEVELS,
  type LogDetail,
  type LogDetailColors,
  type LogDetailHead,
  type LogDetailBody,
  type LoggerConfig,
  type LogLevel,
  type LoggerDefaults,
  type LoggerColors,
} from './components/loggerUtils.js';
/**
 * Logger class to manage logging with customizable indicators and colors.
 */
declare class Logger {
  private i;
  private defaults;
  private console;
  /**
   * Creates an instance of Logger.
   * @param args - Configuration for the logger.
   */
  constructor(args: LoggerConfig);
  /**
   * Gets the indicator string based on the log level and optional indication key.
   * @param level - The log level.
   * @param [indicate] - Optional indication key.
   * @returns The indicator string.
   */
  private getIndicatorStr;
  /**
   * Creates the header for a log group.
   * @param headDetail - The details of the log header.
   * @returns An object containing the log level, header string, and color.
   */
  private createGroupHead;
  /**
   * Writes the body of a log group.
   * @param body - The details of the log body.
   * @param msgColor - The color for the log messages.
   * @param level - The log level.
   */
  private writeGroupBody;
  private createGroupHeaderStr;
  /**
   * Gets the keys of all registered indicators.
   * @returns The keys of all registered indicators.
   */
  get indicatorKeys(): string[];
  /**
   * Updates the default settings for the logger.
   * @param d - The new default settings.
   */
  updateDefaults(d: Partial<LoggerDefaults>): void;
  /**
   * Logs a detail object.
   * @param detail - The detail object to log.
   */
  log(detail: LogDetail): void;
}
export {
  Logger,
  LOG_LEVELS,
  type LogDetail,
  type LogDetailColors,
  type LogDetailHead,
  type LogDetailBody,
  type LoggerConfig,
  type LogLevel,
  type LoggerDefaults,
  type LoggerColors,
};
//# sourceMappingURL=Logger.d.ts.map
