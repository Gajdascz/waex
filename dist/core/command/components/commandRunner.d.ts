import type { Command } from './commandManagerUtils.js';
/**
 * Represents the result of executing a command.
 */
interface CommandResult {
    commandObj: Command;
    commandStr: string;
    indicate?: string;
    stdout?: string;
    stderr?: string;
    execErr?: Error;
}
/**
 * Executes a command on a specified file path.
 * @param filePath - The path of the file to execute the command on.
 * @param command - The command object containing the runner and arguments.
 * @returns The result of the command execution.
 */
declare const execute: (filePath: string, command: Command) => Promise<CommandResult>;
export { execute, type CommandResult };
//# sourceMappingURL=commandRunner.d.ts.map