import { promisify } from 'util';
import { exec as execCb } from 'child_process';
import path from 'path';
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
const exec = promisify(execCb);

const cleanStdStr = (str: string, filePath: string) =>
  str
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
const run = async (command: Command, args: string[]): Promise<CommandResult> => {
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
  } catch (err) {
    const { stdout, stderr } = err as { stdout: string; stderr: string };
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
const getFinalArgs = (command: Command, filePath: string) =>
  command.reqPath ? [...command.args, path.resolve(filePath)] : command.args;

/**
 * Executes a command on a specified file path.
 * @param filePath - The path of the file to execute the command on.
 * @param command - The command object containing the runner and arguments.
 * @returns The result of the command execution.
 */
const execute = async (filePath: string, command: Command) => {
  const args = getFinalArgs(command, filePath);
  const r = await run(command, args);
  return r;
};

export { execute, type CommandResult };
