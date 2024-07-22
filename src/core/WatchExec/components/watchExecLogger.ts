import { Logger, type LogDetail } from '../../logger/Logger.js';

const context = {
  label: '[WATCH_EXEC]',
  color: '#e76d38',
};

const noCommandsDetail = (): LogDetail => ({
  head: {
    command: 'No commands registered to execute.',
    level: 'warn',
    ...context,
  },
});

const executeCommandsErrorDetail = (): LogDetail => ({
  head: {
    command: 'Execute Commands',
    level: 'error',
    ...context,
  },
});

const changeDetectedDetail = (filePath: string): LogDetail => ({
  head: { command: `File Change Detected at: ${filePath}`, ...context },
});

interface WatchExecLogger {
  main: Logger;
  changeDetected: (filePath: string) => void;
  noCommands: () => void;
  execCmdsErr: (err: Error) => void;
}

const createWatchExecLogger = (logger: Logger): WatchExecLogger => ({
  main: logger,
  changeDetected: (filePath: string) => {
    logger.log(changeDetectedDetail(filePath));
  },
  noCommands: () => {
    logger.log(noCommandsDetail());
  },
  execCmdsErr: () => {
    logger.log(executeCommandsErrorDetail());
  },
});

export { createWatchExecLogger, type WatchExecLogger };
