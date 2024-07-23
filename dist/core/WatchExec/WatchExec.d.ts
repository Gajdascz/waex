import type { ConfigOptions } from './components/config.js';
import { type CommandConfig } from '../command/CommandManager.js';
import chokidar from 'chokidar';
/**
 * Type representing the constructor arguments for WatchExec.
 */
type WatchExecCstrArgs = string | Partial<ConfigOptions> | undefined;
/**
 * Class to watch files and execute commands on file changes.
 */
declare class WatchExec {
  private debounceRate?;
  private isProcessing?;
  private changeHandler?;
  private cmdMgr;
  constructor(configOptions?: WatchExecCstrArgs);
  private executeCommands;
  private setChangeHandler;
  logger: import('./components/watchExecLogger.js').WatchExecLogger;
  watcher: chokidar.FSWatcher;
  registerCommand(cmdConfig: CommandConfig | CommandConfig[]): void;
  setDebounceRate(ms: number): void;
  setLimitProcessing(state: boolean): void;
}
export { WatchExec, type WatchExecCstrArgs };
//# sourceMappingURL=WatchExec.d.ts.map
