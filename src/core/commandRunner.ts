import { promisify } from 'util';
import {exec as execCb} from 'child_process';

import { type ConfiguredCommand } from "../utils/constants.js";
import logger from './logger.js';

const exec = promisify(execCb);

const runCommand = async (command: ConfiguredCommand, path: string) =>  {
  const {runner,cmd,args,color,label,errorColor} = command;
  const cmdStr = `${runner} ${cmd}${args.length ? ` ${args.join(` `)}`: ""}${path ? ` ${path}` : ""}`
  try {
    const {stdout, stderr} = await exec(cmdStr);
    
  } catch (err) {
  }
  return new Promise((resolve, reject)=> {
    try {
      loggers.success(cmdStr(command, args),label,buffer.toString());
      resolve();
    } catch (error) {
      if(label === 'eslint'){
        loggers.eslintErr(error.stdout.toString());
        if (error.stderr && error.stderr.length > 0) loggers.eslintErr(error.stderr.toString());
        }
      else {
        loggers.cmdError(cmdStr(command, args), error.status);
        if (error.stdout) loggers.cmdError(`stdout: ${error.stdout.toString()}`);
        if (error.stderr && error.stderr.length > 0) loggers.cmdError(`stderr: ${error.stderr.toString()}`);
      }      
      reject(error);
    }
  })
};