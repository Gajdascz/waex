import chalk from 'chalk';
import initialize from "./initialize.js";
import type { CONFIG_OPTIONS } from '../base/constants.js';

class ConfigAPI {
  private _debounceRate: number
  private _errorColor: string
  private _errorTint:string
  private _color: string
  private _label: string
  private _command: CommandManager  
  private _indicator: IndicatorManager
  private _log: LogManager

  constructor(configOptions:ConfigOptions) {
    const config = initialize(configOptions);
    const {application,managerRefs} = config
    this._debounceRate = application.debounceRate
    this._errorColor = application.errorColor
    this._color = application.color
    this._label = application.label
    this._errorTint = application.errorTint
    this._command = managerRefs.command
    this._indicator = managerRefs.indicator 
    this._log = managerRefs.log
  }

  get debounceRate() { return this._debounceRate }
  set debounceRate(value) { this._debounceRate = value; }
  
  get errorColor() { return this._errorColor; }
  set errorColor(value) { this._errorColor = value; }

  get errorTint() { return this._errorTint }
  set errorTint(value) { this._errorTint = value }
  
  get color() { return this._color}
  set color(value) {this._color = value}

  get label() {return this._label}
  set label(value) {this._label = value}

  registerCommand(commandConfig: CommandConfig | CommandConfig[]) { this._command.register(commandConfig) }
  getAllCommands() { return this._command.getAll(); }
  getCommand(index:string|number) {return this._command.get(index) }
  updateCommand(index: number|string, updateProperties:CommandConfig) { return this._command.update(index,updateProperties); }
  removeCommand(index:number|string) { return this._command.remove(index) }
  clearAllCommands() {return this._command.reset() }
  

}

export default ConfigAPI