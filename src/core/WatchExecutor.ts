import type { ConfigOptions } from './utils/config.js';
import { CommandManager } from './command/CommandManager.js';
import { Logger } from './logger/Logger.js';
import chokidar from 'chokidar';
import loadStrategy from './utils/loadStrategy.js';

// const api = new ConfigAPI(defaultConfig);

// const initWatcher = () => {
//   const watcher = chokidar.watch('./src/**/*.{js,ts}', {
//     ignored: /node_modules/,
//     persistent: true,
//     cwd: '.',
//   });
//   watcher.on(
//     'change',
//     debounce(async (path) => {
//       await api.executeCommands(String(path));
//       api.log(`File change detected at : ${path as string}`);
//     }, api.debounceRate),
//   );
//   watcher.on('error', (error:string) => {
//     api.log(`Watcher error: ${error}`);
//   });
// };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type fnBindRecord = Record<string, (...args: any[]) => any>;
const bound = (to: unknown, keyValues: fnBindRecord): fnBindRecord =>
  Object.entries(keyValues).reduce((acc: fnBindRecord, [key, fn]) => {
    acc[key] = fn.bind(to);
    return acc;
  }, {});

/* eslint-disable @typescript-eslint/unbound-method */
// bound() fixes this error.
const wrapCommandManager = (commandManager: CommandManager) =>
  bound(commandManager, {
    register: commandManager.create,
    execute: commandManager.execute,
    delete: commandManager.delete,
    update: commandManager.update,
    reset: commandManager.reset,
    get: commandManager.read,
  });
/* eslint-enable @typescript-eslint/unbound-method */

type WatchExecutorCstrArgs = string | Partial<ConfigOptions> | undefined;

class WatchExecutor {
  private debounceRate: number;

  constructor(configOptions: WatchExecutorCstrArgs) {
    const { debounceRate, watcher, logger, commands } =
      loadStrategy(configOptions);
    this.debounceRate = debounceRate;
    this.watcher = chokidar.watch(watcher.paths, watcher.options);
    this.logger = new Logger(logger);
    this.commands = wrapCommandManager(
      new CommandManager(this.logger, commands),
    );
  }

  public logger;
  public watcher;
  public commands;
}

export { WatchExecutor, type WatchExecutorCstrArgs };
