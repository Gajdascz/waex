import type { LogDetail } from '../../logger/Logger.js';
import type { Command, CommandConfig } from '../CommandManager.js';
import { LOG_LEVELS, Logger } from '../../logger/Logger.js';
import type { CommandResult } from './commandRunner.js';
import { DateTime } from 'luxon';

const objColors = (o: Partial<CommandConfig>) => ({
  log: o.logColor,
  info: o.infoColor,
  warning: o.warningColor,
  error: o.errorColor,
})



const context = {
  label: '[CMD]',
  logColor: '#1a8f00'
}
const getTime = ():string => DateTime.local().toLocaleString(DateTime.DATETIME_SHORT);

type DetailBuilder<T> = (t: T) => LogDetail;
const executed: DetailBuilder<CommandResult> = (result) => {
  const {
    commandObj,
    indicate,
    commandStr,
    executionTime,
    execErr,
    stderr,
    stdout,
  } = result;
  const label = commandObj.label;
  const level = execErr ? LOG_LEVELS.ERROR : LOG_LEVELS.LOG;
   
  return {
    head: {
      command: commandStr,
      label,
      level,
      indicate,
    },
    body: {
      time: getTime(),
      executionTime,
      stderr,
      stdout,
    },
    colors: objColors(commandObj),
  };
};

const created: DetailBuilder<Command> = (cmd: Command) => ({
  head: {
    command: `Command Created`,
    level: LOG_LEVELS.INFO,
    label: cmd.label,
    indicate: 'success',    
  },
  body: {
    time: getTime(),
    runner: cmd.runner,
    args: String(cmd.args),
    str: cmd.str,
  }
})

const updated: DetailBuilder<Command> = (oldCmd:Command,newCmd:Command) => {
  return {head: {
    command: `${oldCmd.label} Updated`,
    level: LOG_LEVELS.INFO,
    label: newCmd.label,
    indicate: 'success',    
  },
  body: {
    time: getTime(),
    runner: `${oldCmd.runner} => ${newCmd.runner}`cmd.runner,
    args: String(cmd.args),
  }
}}

const createCommandLogger = (logger: Logger) => {
  return {
    created: (cmd: Command) => {
      logger.log(created(cmd));
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
      indicate?: string,
    ) => {
      logger.log(
        detailBuilders.executed(message, cmd, level, detail, indicate),
      );
    },
    reset: () => {
      logger.log(detailBuilders.reset());
    },
  };
};
export default createCommandLogger;
