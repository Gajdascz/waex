import chokidar from 'chokidar';
import ConfigAPI from './core/config/api.js';
import { DEFAULT_CONFIG } from './core/base/constants.js';
import { debounce } from './core/base/helpers.js';

const api = new ConfigAPI(DEFAULT_CONFIG);

const initWatcher = () => {
  const watcher = chokidar.watch('./src/**/*.{js,ts}', {
    ignored: /node_modules/,
    persistent: true,
    cwd: '.',
  });
  watcher.on(
    'change',
    debounce(async (path) => {
      await api.executeCommands(String(path));
      api.log(`File change detected at : ${path as string}`);
    }, api.debounceRate),
  );
  watcher.on('error', (error:string) => {
    api.log(`Watcher error: ${error}`);
  });
};

initWatcher();
