import { constructAndWrapCommandManager } from '../command/CommandManager.js';
import { Logger } from '../logger/Logger.js';
import chokidar from 'chokidar';
import loadStrategy from './components/loadStrategy.js';
import { debounce, normalizeAsArray } from '../utils/helpers.js';
import { createWatchExecLogger } from './components/watchExecLogger.js';
/**
 * Class to watch files and execute commands on file changes.
 */
class WatchExec {
    debounceRate;
    isProcessing;
    changeHandler;
    cmdMgr;
    constructor(configOptions) {
        const { debounceRate, limitProcessing, watcher, logger, commands } = loadStrategy(configOptions);
        if (debounceRate)
            this.debounceRate = debounceRate;
        if (limitProcessing)
            this.isProcessing = false;
        this.watcher = chokidar.watch(watcher.paths, watcher.options);
        this.logger = createWatchExecLogger(new Logger(logger));
        this.cmdMgr = constructAndWrapCommandManager(this.logger.main, commands);
        this.setChangeHandler();
    }
    executeCommands = async (filePath) => {
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
        }
        catch (err) {
            this.logger.execCmdsErr(err);
        }
    };
    setChangeHandler() {
        let handler;
        if (this.isProcessing === undefined) {
            handler = async (filePath) => {
                this.logger.changeDetected(filePath);
                await this.executeCommands(filePath);
            };
        }
        else
            handler = async (filePath) => {
                if (this.isProcessing)
                    return;
                this.logger.changeDetected(filePath);
                this.isProcessing = true;
                try {
                    await this.executeCommands(filePath);
                }
                finally {
                    this.isProcessing = false;
                }
            };
        if (typeof this.changeHandler === 'function')
            this.watcher.off('change', this.changeHandler);
        this.changeHandler = this.debounceRate ? debounce(handler, this.debounceRate) : handler;
        this.watcher.on('change', this.changeHandler);
    }
    logger;
    watcher;
    registerCommand(cmdConfig) {
        this.cmdMgr.register(cmdConfig);
        this.setChangeHandler();
    }
    setDebounceRate(ms) {
        this.debounceRate = ms;
        this.setChangeHandler();
    }
    setLimitProcessing(state) {
        const prevState = this.isProcessing;
        if (state)
            this.isProcessing = false;
        else
            this.isProcessing = undefined;
        if (prevState !== this.isProcessing)
            this.setChangeHandler();
    }
}
export { WatchExec };
//# sourceMappingURL=WatchExec.js.map