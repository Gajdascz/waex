import { promisify } from 'util';
import { exec as execCb } from 'child_process';
import path from 'path';
import type { Command } from './commandManagerUtils.js';

interface CommandResult {
  commandObj: Command;
  commandStr: string;
  executionTime: number;
  indicate?: string;
  stdout?: string;
  stderr?: string;
  execErr?: Error;
}
const exec = promisify(execCb);

const run = async (
  command: Command,
  args: string[],
): Promise<CommandResult> => {
  const cmdStr = `${command.runner} ${args.join(' ')}`;
  const start = Date.now();
  try {
    const { stdout, stderr } = await exec(cmdStr, {
      timeout: 10000,
    });
    const executionTime = Date.now() - start;
    return {
      commandObj: command,
      commandStr: cmdStr,
      stdout,
      stderr,
      executionTime,
    };
  } catch (err) {
    const executionTime = Date.now() - start;
    return {
      commandObj: command,
      commandStr: cmdStr,
      execErr: err as Error,
      executionTime,
    };
  }
};

const getFinalArgs = (command: Command, filePath: string) =>
  command.reqPath ? [...command.args, path.resolve(filePath)] : command.args;

const execute = async (filePath: string, command: Command) => {
  const args = getFinalArgs(command, filePath);
  return run(command, args);
};

export { execute, type CommandResult };
