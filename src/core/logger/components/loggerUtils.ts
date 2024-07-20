import type { CreateIndicatorArgs } from './indicators/indicatorConfig.js';

//#region Constants
const LOG_LEVELS = {
  LOG: 'log',
  INFO: 'info',
  WARN: 'warn',
  ERROR: 'error',
} as const;
//#endregion Constants

//#region Types
type LogLevel = (typeof LOG_LEVELS)[keyof typeof LOG_LEVELS];

interface LoggerColors {
  log: string;
  info: string;
  error: string;
  warning: string;
}
interface LoggerDefaults {
  label: string;
  level: LogLevel;
  colors: LoggerColors;
}

interface LoggerConfig {
  defaults: LoggerDefaults;
  indicators?: CreateIndicatorArgs;
}

type LogDetailBody = Record<string, string>;

interface LogDetailHead {
  command: string;
  indicate?: string;
  level?: LogLevel;
  label?: string;
}
type LogDetailColors = Partial<LoggerColors>;

interface LogDetail {
  head: LogDetailHead;
  body?: LogDetailBody;
  colors?: LogDetailColors;
}
//#endregion Types

//#region Helpers
const resolveColor = (
  level: LogLevel,
  defaultColors: LoggerColors,
  providedColors: LogDetailColors = {},
) => {
  const { log, info, warning, error } = providedColors;
  switch (level) {
    case LOG_LEVELS.INFO:
      return info ?? defaultColors.info;
    case LOG_LEVELS.WARN:
      return warning ?? defaultColors.warning;
    case LOG_LEVELS.ERROR:
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
