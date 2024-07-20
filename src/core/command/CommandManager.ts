import { normalizeAsArray } from '../utils/helpers.js';
import type { Logger } from '../logger/Logger.js';
import createCommandLogger from './components/commandLogger.js';
import execute from './components/commandRunner.js';
import {
  isInBounds,
  getBoundError,
  type CommandManagerType,
  type Commands,
  type CommandConfig,
  type Command,
  type CommandSelector,
} from './components/commandManagerUtils.js';

class CommandManager implements CommandManagerType {
  private commands: Commands = [];
  private logger;

  constructor(logger: Logger, commands?: CommandConfig[]) {
    this.logger = createCommandLogger(logger);
    if (commands) commands.forEach((cmd) => this.create(cmd));
  }

  private buildCmdStr(runner: string, args: string[] | []) {
    if (!runner) throw new Error(`Command configuration must have runner.`);
    return `${runner} ${args.length ? args.join(` `) : ''}`;
  }
  public create(config: CommandConfig | CommandConfig[]) {
    config = normalizeAsArray(config);
    config.forEach((cf) => {
      const cmdStr = this.buildCmdStr(cf.runner, cf.args);
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
  async execute(filePath: string) {
    for (const command of this.commands) {
      const result = await execute(filePath, command);
      this.logger.executed(result);
    }
    return this;
  }
}
export { CommandManager, type Commands, type CommandConfig, type Command };
