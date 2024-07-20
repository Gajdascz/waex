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

class Logger {
  private i;
  private defaults: LoggerDefaults;

  constructor(args: LoggerConfig) {
    const { defaults, indicators } = args;
    this.defaults = defaults;
    this.i = wrapIndicatorManager(new IndicatorManager(indicators));
  }
  private getIndicatorStr(level: LogLevel, indicate?: string) {
    if (indicate) return this.i.getIndicator(indicate).str as string;
    return this.i.getIndicatorByLevel(level).str;
  }
  private buildGroupHead(headDetail: LogDetailHead) {
    const {
      command,
      indicate,
      label = this.defaults.label,
      level = this.defaults.level,
    } = headDetail;
    return {
      level,
      head: `${this.getIndicatorStr(level, indicate)} ${label} ${command}`,
    };
  }
  public get indicatorKeys(): string[]|undefined {
    return this.i.getAllKeys();
  }
  public updateDefaults(d: Partial<LoggerDefaults>) {
    this.defaults = { ...this.defaults, ...d };
  }
  public log(detail: LogDetail) {
    const { level, head } = this.buildGroupHead(detail.head);
    const msgColor = resolveColor(level, this.defaults.colors, detail.colors);
    console.group(chalk.hex(msgColor)(head));
    if (detail.body)
      Object.entries(detail.body).forEach(([key, value]) => {
        console[level](chalk.hex(msgColor)(`${key}: ${value}`));
      });
    console.groupEnd();
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
