import { isInBounds, getBoundError, buildLogDetail } from '../base/helpers.js';
import type { EntityManager, LogDetail } from "../base/types.js"

//#region TYPES
interface CommandConfig {
  runner: string, 
  cmd: string, 
  args: string[] | [], 
  label: string,
  logColor: string,
  infoColor?: string,
  errorColor?: string,
  warningColor?: string,
}
interface Command extends CommandConfig {
  str: string;
} 
type Commands = Command[];
type CommandSelector = string | number;
type CommandManagerType = EntityManager<CommandConfig,CommandSelector,Command> 
export type {CommandConfig,Command,CommandManagerType,Commands};
//#endregion

//#endregion
class CommandManager implements CommandManagerType {
  private commands:Commands = [];
  private buildCmdStr(runner:string,cmd:string,args:string[]|[]) {
    if(!runner || !cmd) throw new Error(`Command configuration must have runner and command.`);
    return`${runner} ${cmd}${args.length ? ` ${args.join(` `)}`: ""}`
  }
  public create(config: CommandConfig |CommandConfig[]) {
    if(!Array.isArray(config)) config = [config]; 
    const logDetails:LogDetail[] = []
    config.forEach(cf => {
      const cmdStr = this.buildCmdStr(cf.runner,cf.cmd,cf.args);
      const command = {...cf,str:cmdStr};
      this.commands.push(command);
      logDetails.push(buildLogDetail({message: `Command: ${cmdStr} created.`}))
    });
    return logDetails;
  }
  public read(): Command|Commands { return this.commands.map((cmd) => ({...cmd})) }
  public update(target: CommandSelector, updateProperties: Partial<CommandConfig>) {
    if(!isInBounds(target,this.commands)) throw new Error(getBoundError(target,this.commands));
    const t = this.commands[+target];
    const {
      label = t.label,
      runner = t.runner,
      args = t.args,
      cmd = t.cmd,
      logColor = t.logColor,
      infoColor = t.infoColor,
      warningColor=t.warningColor,
      errorColor=t.errorColor
    } = updateProperties
    const str = this.buildCmdStr(runner,cmd,args); 
    this.commands[+target] = {runner, args,cmd,logColor,label,str,infoColor,warningColor,errorColor};
    return buildLogDetail({
      message: `Command: ${str} updated`,
    });
  }
  public delete(target:CommandSelector) {
    if(!isInBounds(target,this.commands)) throw new Error(getBoundError(target,this.commands));
    this.commands.splice(+target,1);
    return buildLogDetail({
      message: `Command at ${String(target)} deleted`
    });
  }
  public reset() { 
    this.commands = [] 
    return buildLogDetail({
      message: `All commands deleted.`
    })
  }
}

const commandManager = new CommandManager();
export default commandManager