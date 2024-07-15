import chokidar from 'chokidar';
import { execSync } from 'child_process';
import chalk from 'chalk';
    

const DEBOUNCE_MS = 100;

const labels = {
  default: ['[WATCHER]', '#87ceeb'],
  success: ['[SUCCESS]', '#006400'],
  error: ['[ERROR]', '#ff8888'],
  warn: ['[WARNING]', '#ffff00'],
  eslint: ['[ESLINT]', '#4B32C3'],
  prettier: ['[PRETTIER]', '#56B3B4'],
  tsx: ['[TSX]', '#0FFFA0']
};

const resultStatusIndicators = {
  success: chalk.hex('#006400').bold(`✔ `),
  error: chalk.hex('#ff0000').bold('✘ '),
  neutral: chalk.hex('#696969').bold(`○ `)
}

const log = (msg, { 
  label: [label, color] = labels.default, 
  type = 'log', 
  prefix = resultStatusIndicators.neutral, 
  command, 
  detail
  } = {}) => {
    const nMsg = msg.trim();
    if(nMsg.length === 0) return;
    let logMsg = label ? `${chalk.hex(color).bold(`${label}`)} ${chalk.hex(color)(`${command ? `${command} ${nMsg}` : nMsg }`)}` : `${chalk.hex(color)(`${nMsg}`)}`;
    if(prefix) logMsg = prefix += logMsg;
    if(detail) logMsg += `${chalk.hex(color)(`${detail}`)}`
    console[type](logMsg);
  };

const loggers = {
  fileChanged: (path) => log(`File Changed: ${path}`),
  success: (command,label,result=null) => log(command, { label: labels[label], prefix: resultStatusIndicators.success, detail:result }),
  cmdError: (command, status) => log(`Command failed${status ? ` with status ${status} ` : ''}: ${command}`, { label: labels.error }),
  genErr: (msg) => log(`${msg}`, { label: labels.error, prefix: resultStatusIndicators.error }),
  eslintErr: (err) => log(`${err}`, {label: labels.eslint, prefix: resultStatusIndicators.error }),
};

const cmdStr = (cmd, args) => `${cmd} ${args.join(' ')} `;

const runCommand = (command, args, label) => {
  return new Promise((resolve, reject)=> {
    try {
      const buffer = execSync(cmdStr(command, args), { stdio: 'pipe', shell: true });
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
const debounce = (func, delay) => {
  let debounceTimer;
  return function() {
    const context = this;
    const args = arguments;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(context, args), delay);
  }
};


const watcher = {
  curr: null,
  fns: {
    formatAndLint: async (path) => {
      try{
        await runCommand('npx', ['prettier', '--write', path], 'prettier');
        await runCommand('npx', ['eslint', '--fix', path], 'eslint');
      } catch (err) {
        loggers.genErr(`(formatAndLint) ${err.message}`);
      }
    },
    runTSX: async () => runCommand('npm',['run','tsx'],'tsx')
  },
  async init() {
    this.curr = chokidar.watch('./src/**/*.{js,ts}', {
      ignored: /node_modules/,
      persistent: true,
      cwd: '.',
    });
    this.curr.on('change', debounce(async (path) => {
      loggers.fileChanged(path);
        await watcher.fns.formatAndLint(path);
        await watcher.fns.runTSX()
    }),DEBOUNCE_MS);
    watcher.curr.on('error', (error) => loggers.genErr(`Watcher error: ${error}`));
    await watcher.fns.runTSX()
  },
};

await watcher.init();
