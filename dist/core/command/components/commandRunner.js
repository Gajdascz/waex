import { promisify } from 'util';
import { exec as execCb } from 'child_process';
import path from 'path';
const exec = promisify(execCb);
const cleanStdStr = (str, filePath) => str
    .trim()
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line !== '' && line !== filePath)
    .join('\n');
/**
 * Executes a command with the given arguments and returns the result.
 * @param command - The command object containing the runner and arguments.
 * @param args - The arguments to pass to the command.
 * @returns The result of the command execution.
 */
const run = async (command, args) => {
    const cmdStr = `${command.runner} ${args.join(' ')}`;
    // helper getFinalArgs always appends the file path to the end of the command's arguments array.
    const filePath = args[args.length - 1];
    try {
        const { stdout, stderr } = await exec(cmdStr);
        return {
            commandObj: command,
            commandStr: cmdStr,
            stdout: stdout ? cleanStdStr(stdout, filePath) : stdout,
            stderr: stderr ? cleanStdStr(stderr, filePath) : stderr,
        };
    }
    catch (err) {
        const { stdout, stderr } = err;
        return {
            commandObj: command,
            commandStr: cmdStr,
            stdout: stdout ? cleanStdStr(stdout, filePath) : stdout,
            stderr: stderr ? cleanStdStr(stderr, filePath) : stderr,
        };
    }
};
/**
 * Generates the final arguments for the command based on whether the command requires a file path.
 * @param command - The command object containing the runner and arguments.
 * @param filePath - The file path to include in the arguments if required.
 * @returns The final arguments for the command.
 */
const getFinalArgs = (command, filePath) => command.reqPath ? [...command.args, path.resolve(filePath)] : command.args;
/**
 * Executes a command on a specified file path.
 * @param filePath - The path of the file to execute the command on.
 * @param command - The command object containing the runner and arguments.
 * @returns The result of the command execution.
 */
const execute = async (filePath, command) => {
    const args = getFinalArgs(command, filePath);
    const r = await run(command, args);
    return r;
};
export { execute };
//# sourceMappingURL=commandRunner.js.map