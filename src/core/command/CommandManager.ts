import { promisify } from 'util';
import { exec as execCb } from 'child_process';
import {
  isInBounds,
  getBoundError,
  normalizeAsArray,
} from '../base/helpers.js';
import type { EntityManager } from '../base/types.js';
import type { Logger } from '../logger/logger.js';
import createCommandLogger from './commandLogger.js';

//#region TYPES
interface CommandConfig {
  runner: string;
  cmd: string;
  args: string[] | [];
  label: string;
  logColor: string;
  infoColor?: string;
  errorColor?: string;
  warningColor?: string;
  indicatorKey?: string;
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

const exec = promisify(execCb);

//#endregion
class CommandManager implements CommandManagerType {
  private commands: Commands = [];
  private logger;

  constructor(logger: Logger, commands?: CommandConfig[]) {
    this.logger = createCommandLogger(logger);
    if (commands) commands.forEach((cmd) => this.create(cmd));
  }

  private buildCmdStr(runner: string, cmd: string, args: string[] | []) {
    if (!runner || !cmd)
      throw new Error(`Command configuration must have runner and command.`);
    return `${runner} ${cmd}${args.length ? ` ${args.join(` `)}` : ''}`;
  }
  public create(config: CommandConfig | CommandConfig[]) {
    config = normalizeAsArray(config);
    config.forEach((cf) => {
      const cmdStr = this.buildCmdStr(cf.runner, cf.cmd, cf.args);
      const command = { ...cf, str: cmdStr };
      this.commands.push(command);
      this.logger.created(command);
    });
    return this;
  }
  public read(): Command | Commands {
    return this.commands.map((cmd) => ({ ...cmd }));
  }
  public update(
    target: CommandSelector,
    updateProperties: Partial<CommandConfig>,
  ) {
    if (!isInBounds(target, this.commands))
      throw new Error(getBoundError(target, this.commands));
    const oldCmd = { ...this.commands[+target] };
    this.commands[+target] = { ...oldCmd, ...updateProperties };
    const newCmd = { ...this.commands[+target] };
    this.logger.updated(oldCmd, newCmd);
    return this;
  }
  public delete(target: CommandSelector) {
    if (!isInBounds(target, this.commands))
      throw new Error(getBoundError(target, this.commands));
    const [deleted] = this.commands.splice(+target, 1);
    this.logger.deleted(deleted.str);
    return this;
  }
  public reset() {
    this.commands = [];
    this.logger.reset();
    return this;
  }
  async execute(path: string) {
    try {
      for (const command of this.commands) {
        console.log(command);
        console.log(command.str);
        const fullCmd =
          command.reqPath ? `${command.str} ${path}` : command.str;
        const { stderr, stdout } = await exec(fullCmd);
        console.log(stderr);
        console.log(stdout);
      }
    } catch (err) {
      console.error(err);
    }
    return this;
  }
}
export {
  CommandManager,
  type CommandConfig,
  type Command,
  type CommandManagerType,
  type Commands,
};
