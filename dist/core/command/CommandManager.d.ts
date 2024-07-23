import type { Logger } from '../logger/Logger.js';
import { type CommandResult } from './components/commandRunner.js';
import { type CommandManagerType, type Commands, type CommandConfig, type Command, type CommandSelector } from './components/commandManagerUtils.js';
import { type FnRecord } from '../utils/helpers.js';
/**
 * Manages a list of commands, providing CRUD operations and execution functionality.
 */
declare class CommandManager implements CommandManagerType {
    private commands;
    logger: {
        created: (cmd: Command) => void;
        updated: (oldCmd: Command, newCmd: Command) => void;
        deleted: (cmdStr: string) => void;
        reset: () => void;
        executed: (result: CommandResult) => void;
    };
    /**
     * Creates an instance of CommandManager.
     * @param logger - The logger instance to use for logging command actions.
     * @param [commands] - Optional initial list of command configurations to create.
     */
    constructor(logger: Logger, commands?: CommandConfig[]);
    /**
     * Builds a command string from the runner and arguments.
     * @param runner - The command runner.
     * @param args - The arguments for the command.
     * @returns The built command string.
     * @throws {Error} If the runner is not provided.
     */
    private buildCmdStr;
    /**
     * Creates new commands from the provided configuration(s).
     * @param config - The command configuration(s).
     * @returns The instance of CommandManager.
     */
    create(config: CommandConfig | CommandConfig[]): this;
    /**
     * Reads commands. If a command key is provided, returns the command matching the key.
     * If no key is provided, returns all commands.
     * @param [cmdKey] - The key of the command to read.
     * @returns The command matching the key, all commands, or undefined if the key does not match any command.
     */
    read(cmdKey?: CommandSelector): Command | Commands | undefined;
    /**
     * Updates an existing command with new properties.
     * @param target - The target command to update.
     * @param updateProperties - The properties to update.
     * @returns The instance of CommandManager.
     * @throws {Error} If the target index is out of bounds.
     */
    update(target: CommandSelector, updateProperties: Partial<CommandConfig>): this;
    /**
     * Deletes a command by its selector.
     * @param target - The target command to delete.
     * @returns The instance of CommandManager.
     * @throws {Error} If the target index is out of bounds.
     */
    delete(target: CommandSelector): this;
    /**
     * Resets the command manager by clearing all commands.
     * @returns The instance of CommandManager.
     */
    reset(): this;
}
interface WrappedCommandManager extends FnRecord {
    register: (config: CommandConfig | CommandConfig[]) => this;
    delete: (target: CommandSelector) => this;
    update: (target: CommandSelector, updateProperties: Partial<CommandManager>) => this;
    reset: () => this;
    get: (cmdKey?: CommandSelector) => Command | Commands | undefined;
    execute: (filePath: string, command: Command) => Promise<CommandResult>;
    logExecuted: (result: CommandResult) => void;
}
declare const constructAndWrapCommandManager: (logger: Logger, commands?: CommandConfig[]) => WrappedCommandManager;
export { CommandManager, constructAndWrapCommandManager, type Commands, type CommandConfig, type Command, type WrappedCommandManager, };
//# sourceMappingURL=CommandManager.d.ts.map