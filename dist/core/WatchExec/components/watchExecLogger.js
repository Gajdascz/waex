import { Logger } from '../../logger/Logger.js';
const context = {
  label: '[WATCH_EXEC]',
  color: '#e76d38',
};
const noCommandsDetail = () => ({
  head: {
    command: 'No commands registered to execute.',
    level: 'warn',
    ...context,
  },
});
const executeCommandsErrorDetail = () => ({
  head: {
    command: 'Execute Commands',
    level: 'error',
    ...context,
  },
});
const changeDetectedDetail = (filePath) => ({
  head: { command: `File Change Detected at: ${filePath}`, ...context },
});
const createWatchExecLogger = (logger) => ({
  main: logger,
  changeDetected: (filePath) => {
    logger.log(changeDetectedDetail(filePath));
  },
  noCommands: () => {
    logger.log(noCommandsDetail());
  },
  execCmdsErr: () => {
    logger.log(executeCommandsErrorDetail());
  },
});
export { createWatchExecLogger };
//# sourceMappingURL=watchExecLogger.js.map
