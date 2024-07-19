import { CommandManager } from '../command/CommandManager.js';
import { DEFAULT_CONFIG, INDICATORS } from '../base/constants.js';
import type {
  CommandConfig,
  CommandManagerType,
} from '../command/CommandManager.js';
import { normalizeAsArray, flatMerge } from '../base/helpers.js';
import type { LogLevel } from '../base/types.js';
import { Logger } from '../logger/logger.js';
import { type IndicatorConfig } from '../logger/IndicatorManager.js';

interface LoggerOptions {
  label: string;
  logColor: string;
  infoColor: string;
  warningColor: string;
  errorColor: string;
  loadDefault: boolean;
  addIndicators: IndicatorConfig | IndicatorConfig[];
  level: LogLevel;
}

interface ConfigOptions {
  debounceRate: number;
  logger: LoggerOptions;
  commands: CommandConfig[];
}

interface Configuration {
  debounceRate: number;
  command: CommandManagerType;
  logger: Logger;
}

const initialize = (opts?: Partial<ConfigOptions>): Configuration => {
  const debounceRate = opts?.debounceRate ?? DEFAULT_CONFIG.debounceRate;
  const loggerOptions = (
    opts?.logger ?
      flatMerge(DEFAULT_CONFIG.logger, opts.logger)
    : DEFAULT_CONFIG.logger) as LoggerOptions;
  
  loggerOptions.addIndicators = normalizeAsArray(loggerOptions.addIndicators);

  const indicators: IndicatorConfig[] =
    loggerOptions.loadDefault ?
      [...INDICATORS, ...loggerOptions.addIndicators]
    : loggerOptions.addIndicators;

  const logger = new Logger({ loggerDefaults: loggerOptions, indicators });

  const command = new CommandManager(logger, opts?.commands);

  return {
    debounceRate,
    command,
    logger,
  };
};

export { initialize, type ConfigOptions };
