import type { EntityManager } from '../../utils/types.js';
/**
 * Configuration for a command.
 *  - runner: The command runner.
 *  - args: The arguments for the command.
 *  - label:  The label for the command.
 *  - color: The color associated with the command.
 *  - [infoColor]: The info color for the command.
 *  - [errorColor]: The error color for the command.
 *  - [warningColor]: The warning color for the command.
 *  - [reqPath]: Indicates if the command requires a file path.
 */
interface CommandConfig {
  runner: string;
  args: string[] | [];
  label: string;
  color: string;
  key: string;
  infoColor?: string;
  errorColor?: string;
  warningColor?: string;
  reqPath?: boolean;
}
/**
 * Represents a command with additional properties.
 *  - str: The command string.
 *  - [key]: Additional properties.
 */
interface Command extends CommandConfig {
  str: string;
  [key: string]: string | string[] | [] | undefined | boolean;
}
/**
 * Array of Command objects.
 */
type Commands = Command[];
/**
 * Selector for a command, which can be either a string or a number.
 */
type CommandSelector = string | number;
/**
 * Command manager type that extends EntityManager with additional execute method.
 *  - execute: Executes a command by path.
 */
type CommandManagerType = EntityManager<CommandConfig, CommandSelector, Command>;
/**
 * Generates an error message indicating that the provided index is out of bounds.
 * @param index - The index that is out of bounds.
 * @param arr - The array being indexed.
 * @returns The error message.
 */
declare const getBoundError: (index: number | string, arr: unknown[]) => string;
/**
 * Checks if the provided index is within the bounds of the array.
 * @param index - The index to check.
 * @param arr - The array being indexed.
 * @returns True if the index is within bounds, false otherwise.
 */
declare const isInBounds: (index: number | string, arr: unknown[]) => boolean | 0;
export {
  getBoundError,
  isInBounds,
  type Command,
  type Commands,
  type CommandManagerType,
  type CommandConfig,
  type CommandSelector,
};
//# sourceMappingURL=commandManagerUtils.d.ts.map
