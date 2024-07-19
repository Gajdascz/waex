import chalk from 'chalk';
import { LOG_TYPES } from '../base/constants.js';
import type { LogLevel } from '../base/types.js';
import {
  IndicatorManager,
  wrapIndicatorManager,
  type CreateIndicatorArgs,
} from './IndicatorManager.js';
interface LoggerDefaults {
  label: string;
  logColor: string;
  infoColor: string;
  errorColor: string;
  warningColor: string;
  level: LogLevel;
}

interface LoggerCstrArgs {
  loggerDefaults: LoggerDefaults;
  indicators?: CreateIndicatorArgs;
}

interface LogDetail {
  message: string;
  level?: LogLevel;
  label?: string;
  command?: string;
  detail?: string;
  indicatorKey?: string;
  logColor?: string;
  infoColor?: string;
  errorColor?: string;
  warningColor?: string;
}
class Logger {
  private i;
  private loggerDefaults: LoggerDefaults;

  constructor(args: LoggerCstrArgs) {
    const { loggerDefaults, indicators } = args;
    this.loggerDefaults = loggerDefaults;
    this.i = wrapIndicatorManager(new IndicatorManager(indicators));
  }

  private buildStr(s: LogDetail) {
    let indicator: string | undefined = undefined;
    if (s.indicatorKey)
      indicator = this.i.getIndicator(s.indicatorKey).str as string;
    else if (s.level) indicator = this.i.getIndicatorByLevel(s.level).str;
    return `${indicator ? `${indicator} ` : ''}${s.label ? s.label : ''}${s.command ? ` ${s.command}` : ''}${s.message}${s.detail ? `\n${s.detail}` : ''}`;
  }
  private resolveColor(detail: LogDetail, level: LogLevel): string {
    switch (level) {
      case LOG_TYPES.INFO:
        return detail.infoColor ?? this.loggerDefaults.infoColor;
      case LOG_TYPES.WARN:
        return detail.warningColor ?? this.loggerDefaults.warningColor;
      case LOG_TYPES.ERROR:
        return detail.errorColor ?? this.loggerDefaults.errorColor;
      default:
        return detail.logColor ?? this.loggerDefaults.logColor;
    }
  }
  public updateDefaults(d: Partial<LoggerDefaults>) {
    this.loggerDefaults = { ...this.loggerDefaults, ...d };
  }
  public log(detail: LogDetail) {
    const level = detail.level ?? this.loggerDefaults.level;
    const msgColor = this.resolveColor(detail, level);
    const str = this.buildStr(detail);
    console[level](chalk.hex(msgColor)(str));
  }
}
export { Logger, type LogDetail, type LoggerDefaults, type LoggerCstrArgs };
