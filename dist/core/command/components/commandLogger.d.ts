import type { Command } from '../CommandManager.js';
import { Logger } from '../../logger/Logger.js';
import type { CommandResult } from './commandRunner.js';
/**
 * Creates a command logger with specified log handlers.
 * @param logger - The logger to use for logging command details.
 * @returns The command logger with handlers for different command actions.
 */
declare const createCommandLogger: (logger: Logger) => {
  /**
   * Logs the details of a created command.
   * @param cmd - The command that was created.
   */
  created: (cmd: Command) => void;
  /**
   * Logs the details of an updated command.
   * @param oldCmd - The old command before update.
   * @param newCmd - The new command after update.
   */
  updated: (oldCmd: Command, newCmd: Command) => void;
  /**
   * Logs the details of a deleted command.
   * @param cmdStr - The command string that was deleted.
   */
  deleted: (cmdStr: string) => void;
  /**
   * Logs the details of a reset action in the command manager.
   */
  reset: () => void;
  /**
   * Logs the details of an executed command.
   * @param result - The result of the executed command.
   */
  executed: (result: CommandResult) => void;
};
export default createCommandLogger;
//# sourceMappingURL=commandLogger.d.ts.map
