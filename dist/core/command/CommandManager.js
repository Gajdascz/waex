import { normalizeAsArray } from '../utils/helpers.js';
import createCommandLogger from './components/commandLogger.js';
import { execute } from './components/commandRunner.js';
import { isInBounds, getBoundError, } from './components/commandManagerUtils.js';
import { bound } from '../utils/helpers.js';
/**
 * Manages a list of commands, providing CRUD operations and execution functionality.
 */
class CommandManager {
    commands = [];
    logger;
    /**
     * Creates an instance of CommandManager.
     * @param logger - The logger instance to use for logging command actions.
     * @param [commands] - Optional initial list of command configurations to create.
     */
    constructor(logger, commands) {
        this.logger = createCommandLogger(logger);
        if (commands)
            commands.forEach((cmd) => this.create(cmd));
    }
    /**
     * Builds a command string from the runner and arguments.
     * @param runner - The command runner.
     * @param args - The arguments for the command.
     * @returns The built command string.
     * @throws {Error} If the runner is not provided.
     */
    buildCmdStr(runner, args) {
        if (!runner)
            throw new Error(`Command configuration must have runner.`);
        return `${runner} ${args.length ? args.join(` `) : ''}`;
    }
    /**
     * Creates new commands from the provided configuration(s).
     * @param config - The command configuration(s).
     * @returns The instance of CommandManager.
     */
    create(config) {
        config = normalizeAsArray(config);
        config.forEach((cf) => {
            const cmdStr = this.buildCmdStr(cf.runner, cf.args);
            const command = { ...cf, str: cmdStr };
            this.commands.push(command);
            this.logger.created(command);
        });
        return this;
    }
    /**
     * Reads commands. If a command key is provided, returns the command matching the key.
     * If no key is provided, returns all commands.
     * @param [cmdKey] - The key of the command to read.
     * @returns The command matching the key, all commands, or undefined if the key does not match any command.
     */
    read(cmdKey) {
        if (!cmdKey)
            return this.commands.map((cmd) => ({ ...cmd }));
        else
            return this.commands.find((cmd) => cmd.key === cmdKey);
    }
    /**
     * Updates an existing command with new properties.
     * @param target - The target command to update.
     * @param updateProperties - The properties to update.
     * @returns The instance of CommandManager.
     * @throws {Error} If the target index is out of bounds.
     */
    update(target, updateProperties) {
        if (!isInBounds(target, this.commands))
            throw new Error(getBoundError(target, this.commands));
        const oldCmd = { ...this.commands[+target] };
        this.commands[+target] = { ...oldCmd, ...updateProperties };
        const newCmd = { ...this.commands[+target] };
        this.logger.updated(oldCmd, newCmd);
        return this;
    }
    /**
     * Deletes a command by its selector.
     * @param target - The target command to delete.
     * @returns The instance of CommandManager.
     * @throws {Error} If the target index is out of bounds.
     */
    delete(target) {
        if (!isInBounds(target, this.commands))
            throw new Error(getBoundError(target, this.commands));
        const [deleted] = this.commands.splice(+target, 1);
        this.logger.deleted(deleted.str);
        return this;
    }
    /**
     * Resets the command manager by clearing all commands.
     * @returns The instance of CommandManager.
     */
    reset() {
        this.commands = [];
        this.logger.reset();
        return this;
    }
}
/**
 * Wraps the CommandManager methods to ensure proper binding of `this`.
 * @param {CommandManager} commandManager - The CommandManager instance to wrap.
 * @returns {WrappedCommandManager} The wrapped CommandManager methods.
 */
/* eslint-disable @typescript-eslint/unbound-method */
const wrapCommandManager = (commandManager) => bound(commandManager, {
    register: commandManager.create,
    delete: commandManager.delete,
    update: commandManager.update,
    reset: commandManager.reset,
    get: commandManager.read,
    execute,
    logExecuted: commandManager.logger.executed
});
/* eslint-enable @typescript-eslint/unbound-method */
const constructAndWrapCommandManager = (logger, commands) => {
    const manager = new CommandManager(logger, commands);
    return wrapCommandManager(manager);
};
export { CommandManager, constructAndWrapCommandManager, };
//# sourceMappingURL=CommandManager.js.map