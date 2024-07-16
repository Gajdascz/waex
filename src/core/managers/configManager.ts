import chalk from 'chalk';
import commandManager, { type CommandConfig, type CommandManager, type ConfiguredCommand} from './commandManager.js';
import indicatorManager, {type IndicatorConfig,type IndicatorManager,type Indicators } from './indicatorManager.js';
import { ALL } from '../../utils/defaults.js';
import type { RGBColor } from '../../utils/constants.js';

const {INDICATORS, COMMANDS, MISC, CONFIG} = ALL;

interface ConfigOptions {
  refreshDebounce: number, 
  loadDefaultIndicators: boolean;
  loadDefaultCommands: boolean;
  commands: CommandConfig | CommandConfig[],
  indicators: IndicatorConfig | IndicatorConfig[],
  defaultLabel: string,
  defaultErrorColor: RGBColor,
  defaultErrorTintColor: RGBColor,
  defaultAppLogMsgColor: RGBColor,
}
const options: Partial<ConfigOptions> = {
  refreshDebounce: 100,
  defaultLabel: '[WATCHER]',
  defaultErrorColor:     [255, 0, 0],     //#750000,
  defaultErrorTintColor: [50, 0, 0],      //#320000,
  defaultAppLogMsgColor: [135, 206, 235], //##87ceeb,
  loadDefaultIndicators: true,
  loadDefaultCommands: true,
} 
const initialize = (opts: Partial<ConfigOptions>) => {
  if(!opts.commands && opts.loadDefaultCommands) commandManager.register(COMMANDS as CommandConfig[]);
  else if(opts.commands) commandManager.register(opts.commands)
  if(opts.loadDefaultIndicators) indicatorManager.register(INDICATORS as IndicatorConfig[]);
  if(opts.indicators) indicatorManager.register(opts.indicators)
}
