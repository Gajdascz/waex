import chalk from 'chalk';
import {
  IndicatorManager,
  wrapIndicatorManager,
} from './components/indicators/IndicatorManager.js';
import {
  resolveColor,
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
import { Console } from 'console';
import { stdout, stderr } from 'process';

// TODO Add dynamic grouping and improve variable names.
/**
 * Logger class to manage logging with customizable indicators and colors.
 */
class Logger {
  private i;
  private defaults: LoggerDefaults;
  private console;
  /**
   * Creates an instance of Logger.
   * @param args - Configuration for the logger.
   */
  constructor(args: LoggerConfig) {
    const { defaults, indicators } = args;
    this.defaults = defaults;
    this.i = wrapIndicatorManager(new IndicatorManager(indicators));
    this.console = new Console({ stdout, stderr, groupIndentation: 2 });
  }
  /**
   * Gets the indicator string based on the log level and optional indication key.
   * @param level - The log level.
   * @param [indicate] - Optional indication key.
   * @returns The indicator string.
   */
  private getIndicatorStr(level: LogLevel, indicate?: string) {
    if (indicate) return this.i.getIndicator(indicate).str as string;
    return this.i.getIndicatorByLevel(level).str;
  }
  /**
   * Creates the header for a log group.
   * @param headDetail - The details of the log header.
   * @returns An object containing the log level, header string, and color.
   */
  private createGroupHead(headDetail: LogDetailHead) {
    const {
      command,
      indicate,
      color,
      label = this.defaults.label,
      level = this.defaults.level,
    } = headDetail;
    return {
      level,
      head: chalk.bold(`${this.getIndicatorStr(level, indicate)} ${label} ${command}`),
      color,
    };
  }

  /**
   * Writes the body of a log group.
   * @param body - The details of the log body.
   * @param msgColor - The color for the log messages.
   * @param level - The log level.
   */
  private writeGroupBody(body: LogDetailBody, msgColor: string, level: LogLevel) {
    body.forEach((entry, index) => {
      const { key, value, color } = entry;
      const c = color ?? msgColor;
      const keyStr = index === body.length - 1 ? `┗━ ${key}` : `┣━ ${key}`;
      if (key === 'stdout' || key === 'stderr') {
        this.console.group(this.createGroupHeaderStr(keyStr, c));
        const strArr = String(value).split('\n');
        strArr.forEach((line, strArrIndex) => {
          const bodyStr = strArrIndex === strArr.length - 1 ? `┗━ ${line}` : `┣━ ${line}`;
          const finalColor = line.includes('error') ? this.defaults.colors.error : c;
          this.console[level](chalk.hex(finalColor)(bodyStr));
        });
        this.console.groupEnd();
      } else {
        this.console[level](chalk.hex(c)(`${chalk.bold.italic(keyStr)}: ${String(value)}`));
      }
    });
  }
  private createGroupHeaderStr = (str: string, color: string) => chalk.bold.italic.hex(color)(str);

  /**
   * Gets the keys of all registered indicators.
   * @returns The keys of all registered indicators.
   */
  public get indicatorKeys() {
    return this.i.keys;
  }
  /**
   * Updates the default settings for the logger.
   * @param d - The new default settings.
   */
  public updateDefaults(d: Partial<LoggerDefaults>) {
    this.defaults = { ...this.defaults, ...d };
  }
  /**
   * Logs a detail object.
   * @param detail - The detail object to log.
   */
  public log(detail: LogDetail) {
    const { level, head, color } = this.createGroupHead(detail.head);
    const msgColor = color ?? resolveColor(level, this.defaults.colors);
    this.console.group(chalk.hex(msgColor)(head));
    if (detail.body) this.writeGroupBody(detail.body, msgColor, level);
    this.console.groupEnd();
    this.console.log();
  }
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
