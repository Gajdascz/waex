import { initialize, type ConfigOptions } from './initialize.js';
import type { CommandConfig } from '../command/CommandManager.js';

class ConfigAPI {
  private _debounceRate: number;
  private _commandManager;
  private _logger;
  constructor(configOptions?: Partial<ConfigOptions>) {
    const config = initialize(configOptions);
    const { debounceRate, command, logger } = config;
    this._debounceRate = debounceRate;
    this._commandManager = command;
    this._logger = logger;
  }

  get debounceRate() {
    return this._debounceRate;
  }
  set debounceRate(value) {
    this._debounceRate = value;
  }

  registerCommand(commandConfig: CommandConfig | CommandConfig[]) {
    this._commandManager.create(commandConfig);
  }
  getAllCommands() {
    return this._commandManager.read();
  }
  getCommand(index: string | number) {
    return this._commandManager.read(index);
  }
  updateCommand(index: number | string, updateProperties: CommandConfig) {
    return this._commandManager.update(index, updateProperties);
  }
  removeCommand(index: number | string) {
    return this._commandManager.delete(index);
  }
  clearAllCommands() {
    return this._commandManager.reset();
  }
  log(msg: string) {
    this._logger.log({ message: msg });
  }

  async executeCommands(path:string) {
    await this._commandManager.execute(path);
  }
}

export default ConfigAPI;
