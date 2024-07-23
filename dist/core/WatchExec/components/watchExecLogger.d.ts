import { Logger } from '../../logger/Logger.js';
interface WatchExecLogger {
    main: Logger;
    changeDetected: (filePath: string) => void;
    noCommands: () => void;
    execCmdsErr: (err: Error) => void;
}
declare const createWatchExecLogger: (logger: Logger) => WatchExecLogger;
export { createWatchExecLogger, type WatchExecLogger };
//# sourceMappingURL=watchExecLogger.d.ts.map