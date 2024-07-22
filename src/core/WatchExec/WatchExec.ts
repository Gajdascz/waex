import type { ConfigOptions } from './components/config.js';
import { constructAndWrapCommandManager, type CommandConfig } from '../command/CommandManager.js';
import { Logger } from '../logger/Logger.js';
import chokidar from 'chokidar';
import loadStrategy from './components/loadStrategy.js';
import { debounce, normalizeAsArray } from '../utils/helpers.js';
import { createWatchExecLogger } from './components/watchExecLogger.js';
/**
 * Type representing the constructor arguments for WatchExec.
 */
type WatchExecCstrArgs = string | Partial<ConfigOptions> | undefined;

/**
 * Class to watch files and execute commands on file changes.
 */
class WatchExec {
  private debounceRate?: number;
  private isProcessing?: boolean;
  private changeHandler?: (filePath: string) => void;
  private cmdMgr;

  constructor(configOptions?: WatchExecCstrArgs) {
    const { debounceRate, limitProcessing, watcher, logger, commands } =
      loadStrategy(configOptions);
    if (debounceRate) this.debounceRate = debounceRate;
    if (limitProcessing) this.isProcessing = false;
    this.watcher = chokidar.watch(watcher.paths, watcher.options);
    this.logger = createWatchExecLogger(new Logger(logger));
    this.cmdMgr = constructAndWrapCommandManager(this.logger.main, commands);
    this.setChangeHandler();
  }
  private executeCommands = async (filePath: string) => {
    const commands = this.cmdMgr.get();
    if (!commands) {
      this.logger.noCommands();
      return;
    }
    const cmds = normalizeAsArray(commands);
    try {
      for (const cmd of cmds) {
        const result = await this.cmdMgr.execute(filePath, cmd);
        this.cmdMgr.logExecuted(result);
      }
    } catch (err) {
      this.logger.execCmdsErr(err as Error);
    }
  };
  private setChangeHandler() {
    let handler: (filePath: string) => Promise<void>;
    if (this.isProcessing === undefined) {
      handler = async (filePath: string) => {
        this.logger.changeDetected(filePath);
        await this.executeCommands(filePath);
      };
    } else
      handler = async (filePath: string) => {
        if (this.isProcessing) return;
        this.logger.changeDetected(filePath);
        this.isProcessing = true;
        try {
          await this.executeCommands(filePath);
        } finally {
          this.isProcessing = false;
        }
      };
    if (typeof this.changeHandler === 'function') this.watcher.off('change', this.changeHandler);
    this.changeHandler =
      this.debounceRate ? debounce(handler, this.debounceRate) : handler;
    this.watcher.on('change', this.changeHandler);
  }
  public logger;
  public watcher;

  public registerCommand(cmdConfig: CommandConfig | CommandConfig[]) {
    this.cmdMgr.register(cmdConfig);
    this.setChangeHandler();
  }
  public setDebounceRate(ms: number) {
    this.debounceRate = ms;
    this.setChangeHandler();
  }
  public setLimitProcessing(state: boolean) {
    const prevState = this.isProcessing;
    if (state) this.isProcessing = false;
    else this.isProcessing = undefined;
    if (prevState !== this.isProcessing) this.setChangeHandler();
  }
}

export { WatchExec, type WatchExecCstrArgs };
