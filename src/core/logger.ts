import { APP_DEFAULTS, LOG_TYPES, type RGBColor,type Indicator } from "../utils/constants.js"
import chalk from 'chalk';

interface LogOptions {
  type: typeof LOG_TYPES[keyof typeof LOG_TYPES];
  color: RGBColor;
  errorColor: RGBColor;
  label: string;
  hideCommand: boolean;
  hideMsg: boolean;
  isErr: boolean;
  command?: string;
  indicator?: Indicator;
  detail?: string;
}
const defaultLogOptions: Partial<LogOptions> = {
  command: undefined,
  indicator: undefined,
  detail: undefined,
  hideCommand: false,
  isErr: false,
  hideMsg: false,
  type: LOG_TYPES.LOG,
  label: APP_DEFAULTS.LABEL,
  color: APP_DEFAULTS.COLORS.LOG,
  errorColor: APP_DEFAULTS.COLORS.ERR, 
} 

const log = (msg: string, opts=defaultLogOptions) => {
  const options = Object.assign({}, defaultLogOptions, opts) as LogOptions;
  const {
    command,
    indicator,
    detail,
    hideCommand,
    isErr,
    hideMsg,
    type,
    label,
    color,
    errorColor,
  } = options;
  const logMsg = [];
  if(indicator) logMsg.push(`${chalk.rgb(...indicator.COLOR).bold(indicator.SYMBOL)} `);
  if(label) logMsg.push(`${chalk.bold(label)} `);
  if(!hideCommand && command) logMsg.push(command);
  if(!hideMsg && msg) logMsg.push(msg);
  if(detail) logMsg.push(detail);
  const finalMsg = logMsg.join(` `);
  if(isErr) console[type](chalk.rgb(...errorColor)(finalMsg));
  else console[type](chalk.rgb(...color)(finalMsg));
  };

const logger = {
  log,
  fileChanged: (path: string) => { log(`File Change Detected: ${path}`, {indicator: APP_DEFAULTS.INDICATORS.NEUTRAL})}
}

export default logger




// const loggers = {
//   success: (command,label,result=null) => { log(command, { label: labels[label], prefix: resultStatusIndicators.success, detail:result }); },
//   cmdError: (command, status) => { log(`Command failed${status ? ` with status ${status} ` : ''}: ${command}`, { label: labels.error }); },
//   genErr: (msg) => { log(`${msg}`, { label: labels.error, prefix: resultStatusIndicators.error }); },
//   eslintErr: (err) => { log(`${err}`, {label: labels.eslint, prefix: resultStatusIndicators.error }); },
// };
