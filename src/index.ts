import chokidar from 'chokidar';
import { execSync } from 'child_process';
import chalk from 'chalk';
    



// const watcher = {
//   curr: null,
//   fns: {
//     formatAndLint: async (path) => {
//       try{
//         await runCommand('npx', ['prettier', '--write', path], 'prettier');
//         await runCommand('npx', ['eslint', '--fix', path], 'eslint');
//       } catch (err) {
//         loggers.genErr(`(formatAndLint) ${err.message}`);
//       }
//     },
//     runTSX: async () => runCommand('npm',['run','tsx'],'tsx')
//   },
//   async init() {
//     this.curr = chokidar.watch('./src/**/*.{js,ts}', {
//       ignored: /node_modules/,
//       persistent: true,
//       cwd: '.',
//     });
//     this.curr.on('change', debounce(async (path) => {
//       loggers.fileChanged(path);
//         await watcher.fns.formatAndLint(path);
//         await watcher.fns.runTSX()
//     }),DEBOUNCE_MS);
//     watcher.curr.on('error', (error) => { loggers.genErr(`Watcher error: ${error}`); });
//     await watcher.fns.runTSX()
//   },
// };

// await watcher.init();
