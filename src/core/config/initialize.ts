import commandManager from '../command/commandManager.js';
import indicatorManager from '../logger/logIndicatorManager.js';
import { COMMANDS, LOGGER, } from '../base/constants.js';
import type { CommandConfig, CommandManagerType } from '../command/commandManager.js';
import type { IndicatorConfig } from '../logger/logIndicatorManager.js';
import type Logger from '../logger/logger.js';

interface CommandOptions {
  loadDefaultCommands: boolean;
  addCommands: CommandConfig | CommandConfig[],
}

interface LoggerOptions {
  loadDefaultIndicators: boolean;
  defaultLabel: string,
  defaultLogMsgColor: string,
  defaultErrorColor: string,
  defaultWarningColor: string,
  addIndicators: IndicatorConfig | IndicatorConfig[],
}

interface ConfigOptions {
  debounceRate: number, 
  commandOptions: CommandOptions,
  loggerOptions: LoggerOptions,
}

interface Configuration {
  debounceRate: number;
  logger: Logger,
  command: CommandManagerType
}
const CONFIG_OPTIONS: ConfigOptions = {
  debounceRate: APP_CONFIG.debounceRate,
  appLabel: APP_CONFIG.label,
  appErrorColor: APP_CONFIG.errorColor,
  appErrorTintColor: APP_CONFIG.errorTint,
  appLogMsgColor: APP_CONFIG.color,
  loadDefaultIndicators: true,
  loadDefaultCommands: true,
  addCommands: [],
  addIndicators: [],
} as const

export default (opts: Partial<ConfigOptions>): Configuration=> {
  const { 
    debounceRate = CONFIG_OPTIONS.debounceRate,
    loadDefaultCommands = CONFIG_OPTIONS.loadDefaultCommands,
    loadDefaultIndicators = CONFIG_OPTIONS.loadDefaultIndicators,
    appLabel = CONFIG_OPTIONS.appLabel,
    appErrorColor = CONFIG_OPTIONS.appErrorColor,
    appErrorTintColor = CONFIG_OPTIONS.appErrorTintColor,
    appLogMsgColor = CONFIG_OPTIONS.appLogMsgColor,
    addCommands = CONFIG_OPTIONS.addCommands,
    addIndicators = CONFIG_OPTIONS.addIndicators
  } = opts
  if(loadDefaultCommands) commandManager.create(COMMANDS);
  if(loadDefaultIndicators) indicatorManager.create(INDICATORS);
  commandManager.create(addCommands);
  indicatorManager.create(addIndicators);
  return {
      debounceRate,
      label: appLabel,
      errorTint: appErrorTintColor,
      color: appLogMsgColor,
      errorColor?: appErrorColor,
      command: commandManager,
      logger: logManager
    }

  }