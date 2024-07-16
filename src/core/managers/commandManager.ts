import {APP_DEFAULTS,type RGBColor } from '../../utils/constants.js';
import { applyErrTint, isInBounds, getBoundError } from '../../utils/helpers.js';


const configureCommand = (config: Partial<CommandConfig>): ConfiguredCommand => {
  const { runner, cmd, args = [], color = APP_DEFAULTS.COLORS.LOG, label = `[${cmd?.toUpperCase() ?? APP_DEFAULTS.LABEL}]` } = config;
  if(!runner || !cmd) throw new Error(`Command configuration must have runner and command.`);
  return {
    runner,
    cmd,
    args,
    color,
    label,
    errorColor: applyErrTint(color)
  };
};
const commands: ConfiguredCommand[]=[]


interface CommandConfig {
  runner: string, 
  cmd: string, 
  args: string[] | [], 
  color: RGBColor,
  label: string
}
interface ConfiguredCommand extends CommandConfig {
  errorColor: RGBColor;
}

interface CommandManager {
  register: (config: Partial<CommandConfig> | Partial<CommandConfig>[]) => true | never;
  getAll: () => ConfiguredCommand[];
  update: (index: string|number, updateProperties: Partial<CommandConfig>) => true | never;
  remove: (index: string|number) => true | never;
  reset: () => boolean; 
}
const commandManager: CommandManager = {
  register: (config: Partial<CommandConfig> | Partial<CommandConfig>[]) => {
    if(!Array.isArray(config)) config = [config]; 
    config.forEach(cf => {
      const cmd = configureCommand(cf);
      commands.push(cmd);
    });
    return true;
  },
  getAll: (): ConfiguredCommand[] => commands.map((cmd: ConfiguredCommand) => ({...cmd})),
  update: (index: string | number, updateProperties: Partial<ConfiguredCommand>) => {
    if(!isInBounds(index,commands)) throw new Error(getBoundError(index,commands));
    if(commands[+index]) commands[+index] = {...commands[+index], ...updateProperties}
    return true;
  },
  remove: (index: string | number) => {
    if(!isInBounds(index,commands)) throw new Error(getBoundError(index,commands));
    commands.splice(+index,1);
    return true;
  },
  reset: () => {
    commands.length = 0;
    return commands.length === 0;
  }
}

export default commandManager
export type {CommandConfig,ConfiguredCommand,CommandManager}