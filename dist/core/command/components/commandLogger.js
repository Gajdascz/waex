import { LOG_LEVELS, Logger } from '../../logger/Logger.js';
import { objCompare, getTime } from '../../utils/helpers.js';
/**
 * Logger context for the command manager.
 */
const context = {
    label: '[CMD]',
    color: '#1a8f00',
};
/**
 * Generates log details for an executed command.
 * @param result - The result of the executed command.
 * @returns The detailed log information of the executed command.
 */
const executedDetail = (result) => {
    const { commandObj, indicate, commandStr, execErr, stderr, stdout } = result;
    const label = commandObj.label;
    const level = execErr ? LOG_LEVELS.error : LOG_LEVELS.log;
    const body = [
        { key: 'time', value: getTime() },
    ];
    if (stderr)
        body.push({ key: 'stderr', value: stderr, color: commandObj.errorColor ?? '#ff3636' });
    if (stdout)
        body.push({ key: 'stdout', value: stdout });
    return {
        head: {
            command: commandStr,
            label,
            level,
            indicate: indicate ?? execErr ? 'error' : 'success',
            color: commandObj.color,
        },
        body,
    };
};
/**
 * Generates log details for a created command.
 * @param cmd - The command that was created.
 * @returns The detailed log information of the created command.
 */
const createdDetail = (cmd) => ({
    head: {
        command: `Created Command`,
        level: LOG_LEVELS.info,
        indicate: 'success',
        ...context,
    },
    body: [
        { key: 'time', value: getTime() },
        { key: 'label', value: cmd.label },
        { key: 'runner', value: cmd.runner },
        { key: 'args', value: cmd.args },
        { key: 'str', value: cmd.str },
    ],
});
/**
 * Generates log details for an updated command.
 * @param oldCmd - The old command before update.
 * @param newCmd - The new command after update.
 * @returns The detailed log information of the updated command.
 */
const updatedDetail = (oldCmd, newCmd) => ({
    head: {
        command: `Updated Command`,
        level: LOG_LEVELS.info,
        indicate: 'success',
        ...context,
    },
    body: [
        { key: 'time', value: getTime() },
        ...Object.entries(objCompare(oldCmd, newCmd)).map(([key, value]) => ({
            key,
            value,
        })),
    ],
});
/**
 * Generates log details for a deleted command.
 * @param cmdStr - The command string that was deleted.
 * @returns The detailed log information of the deleted command.
 */
const deletedDetail = (cmdStr) => ({
    head: {
        command: `Deleted Command`,
        indicate: 'success',
        ...context,
    },
    body: [
        { key: 'time', value: getTime() },
        { key: 'command', value: cmdStr },
    ],
});
/**
 * Generates log details for resetting the command manager.
 * @returns The detailed log information of the reset action.
 */
const resetDetail = () => ({
    head: {
        command: `Reset Command Manager`,
        level: LOG_LEVELS.info,
        indicate: 'success',
        ...context,
    },
    body: [{ key: 'time', value: getTime() }],
});
/**
 * Creates a command logger with specified log handlers.
 * @param logger - The logger to use for logging command details.
 * @returns The command logger with handlers for different command actions.
 */
const createCommandLogger = (logger) => ({
    /**
     * Logs the details of a created command.
     * @param cmd - The command that was created.
     */
    created: (cmd) => {
        logger.log(createdDetail(cmd));
    },
    /**
     * Logs the details of an updated command.
     * @param oldCmd - The old command before update.
     * @param newCmd - The new command after update.
     */
    updated: (oldCmd, newCmd) => {
        logger.log(updatedDetail(oldCmd, newCmd));
    },
    /**
     * Logs the details of a deleted command.
     * @param cmdStr - The command string that was deleted.
     */
    deleted: (cmdStr) => {
        logger.log(deletedDetail(cmdStr));
    },
    /**
     * Logs the details of a reset action in the command manager.
     */
    reset: () => {
        logger.log(resetDetail());
    },
    /**
     * Logs the details of an executed command.
     * @param result - The result of the executed command.
     */
    executed: (result) => {
        logger.log(executedDetail(result));
    },
});
export default createCommandLogger;
//# sourceMappingURL=commandLogger.js.map