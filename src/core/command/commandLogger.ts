import type { LogDetail, LogLevel } from '../base/types.js';
import type { Command } from './CommandManager.js';
import { Logger } from '../logger/logger.js';

const detailBuilders = {
  context: { label: '[CMD]', logColor: '#4e7200' },
  created: (cmd: Command): LogDetail => ({
    message: `Command ${cmd.str} created`,
    detail: `runner: ${cmd.runner}\n cmd: ${cmd.cmd}\n args:${cmd.args.join(' ')}`,
    ...detailBuilders.context,
  }),
  updated: (oldCmd: Command, newCmd: Command): LogDetail => {
    const changes = Object.keys(oldCmd).reduce((acc, curr) => {
      if (oldCmd[curr] === newCmd[curr]) return acc;
      acc += `${curr}: ${String(oldCmd[curr])} => ${String(newCmd[curr])}\n`;
      return acc;
    }, ``);
    return {
      message: `Command Updated`,
      detail: changes,
      ...detailBuilders.context,
    };
  },
  deleted: (cmdStr: string): LogDetail => ({
    message: `Command: ${cmdStr} deleted`,
    ...detailBuilders.context,
  }),
  executed: (
    message: string,
    cmd: Command,
    level: LogLevel,
    detail?: string,
  ): LogDetail => ({
    message,
    level,
    detail,
    command: cmd.str,
    label: cmd.label,
    logColor: cmd.logColor,
    infoColor: cmd.infoColor,
    warningColor: cmd.warningColor,
    errorColor: cmd.errorColor,
    indicatorKey: cmd.indicatorKey,
  }),
  reset: (): LogDetail => ({
    message: `CommandManager Reset`,
    ...detailBuilders.context,
  }),
};

const createCommandLogger = (logger: Logger) => {
  return {
    created: (cmd: Command) => {
      logger.log(detailBuilders.created(cmd));
    },
    updated: (oldCmd: Command, newCmd: Command) => {
      logger.log(detailBuilders.updated(oldCmd, newCmd));
    },
    deleted: (cmdStr: string) => {
      logger.log(detailBuilders.deleted(cmdStr));
    },
    executed: (
      message: string,
      cmd: Command,
      level: LogLevel,
      detail?: string,
    ) => {
      logger.log(detailBuilders.executed(message, cmd, level, detail));
    },
    reset: () => {
      logger.log(detailBuilders.reset());
    },
  };
};
export default createCommandLogger;
