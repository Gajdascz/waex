import type { EntityManager } from '../../utils/types.js';
//#region TYPES

interface CommandConfig {
  runner: string;
  args: string[] | [];
  label: string;
  logColor: string;
  infoColor?: string;
  errorColor?: string;
  warningColor?: string;
  reqPath?: boolean;
}
interface Command extends CommandConfig {
  str: string;
  [key: string]: string | string[] | [] | undefined | boolean;
}
type Commands = Command[];
type CommandSelector = string | number;
interface CommandManagerType
  extends EntityManager<CommandConfig, CommandSelector, Command> {
  execute: (path: string) => Promise<this>;
}
//#endregion
const getBoundError = (index: number | string, arr: unknown[]) =>
  `Provided index is out of bounds: ${arr.length === 0 ? `No commands have been registered` : `| got: ${String(index)} | min: 0 | max: ${String(arr.length - 1)} |`}`;
const isInBounds = (index: number | string, arr: unknown[]) =>
  arr.length && +index >= 0 && +index < arr.length;

export {
  getBoundError,
  isInBounds,
  type Command,
  type Commands,
  type CommandManagerType,
  type CommandConfig,
  type CommandSelector,
};
