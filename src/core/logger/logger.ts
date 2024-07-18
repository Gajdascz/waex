import chalk from 'chalk';
import { LOG_TYPES } from "../base/constants.js";
import type { LogLevel } from "../base/types.js";
import indicatorManager, { type IndicatorCstrArgs } from "./logIndicatorManager.js";


interface LoggerDefaults {
  label: string;
  logColor: string;
  infoColor:string;
  errorColor: string;
  warningColor: string;
}
interface LoggerCstrArgs {
  loggerDefaults:LoggerDefaults;
  indicators?: IndicatorCstrArgs;
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
  warningColor?:string;
}
export type {LogDetail, LoggerDefaults, LoggerCstrArgs}

const buildLogDetail = (d:LogDetail):LogDetail => ({
  ...d
})
export { buildLogDetail }

class Logger {
  protected i = indicatorManager
  private static instance:Logger;
  private loggerDefaults: LoggerDefaults
  private buildStr(s:LogDetail) {
    let indicator: string|undefined = undefined;
    if(s.indicatorKey) indicator = this.i.getIndicator(s.indicatorKey).str as string;
    else if (s.level) indicator = this.i.getIndicatorByLevel(s.level).str; 
    return `${indicator ? `${indicator} ` : ''}${s.label?s.label:''}${s.command ? ` ${s.command}`:''}${s.message}${s.detail?`\n${s.detail}`:''}` 
  }
  private process(logDetail: LogDetail) { 
    const {
        level = LOG_TYPES.LOG,
        logColor = this.loggerDefaults.logColor,
        infoColor = this.loggerDefaults.logColor,
        errorColor = this.loggerDefaults.errorColor,
        warningColor = this.loggerDefaults.warningColor,
    } = logDetail
    const str = this.buildStr(logDetail);
    let msgColor;
    switch(level) {
      case LOG_TYPES.LOG:   msgColor = logColor; break;
      case LOG_TYPES.INFO:  msgColor = infoColor; break;
      case LOG_TYPES.WARN:  msgColor = warningColor; break;
      case LOG_TYPES.ERROR: msgColor = errorColor; break;
      default: msgColor = logColor; 
    }
    return {level, str: chalk.hex(msgColor)(str)};
  }
  private constructor(args: LoggerCstrArgs) {
    const {loggerDefaults, indicators} = args;    
    this.loggerDefaults = loggerDefaults;
    if(indicators) this.i.registerIndicator(indicators);
  }
  public static getInstance(args?: LoggerCstrArgs): Logger {
    if(Logger.instance instanceof Logger) return Logger.instance;
    if(args) {
      Logger.instance = new Logger(args);
      return Logger.instance;
    }
    throw new Error(`Logger not initialized and getLogger was not provided constructor arguments.`);
  }
  public updateDefaults(d:Partial<LoggerDefaults>) {
    this.loggerDefaults = { ...this.loggerDefaults, ...d};
  }
  public send(logDetail: LogDetail|LogDetail[]) {
    if(!Array.isArray(logDetail)) logDetail = [logDetail];
    logDetail.forEach(detail => {
      const {level,str} = this.process(detail);
      console[level](str);
    })
  }
}
export default Logger