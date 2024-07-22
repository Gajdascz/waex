import { LOG_LEVELS } from '../../logger/Logger.js';
/**
 * The debounce rate in milliseconds.
 */
const debounceRate = 500;
/**
 * The configuration for the file watcher.
 */
const watcherConfig = {
    paths: './src/**/*.{js,ts}',
    options: {
        persistent: true,
        // Path Filtering
        ignored: '/node_modules/',
        ignoreInitial: false,
        followSymlinks: true,
        cwd: '.',
        // Performance
        usePolling: false,
        interval: 100,
        binaryInterval: 300,
        alwaysStat: false,
        // depth: 99,
        // awaitWriteFinish: {
        // stabilityThreshold: 2000,
        // pollInterval: 100,
        // },
        // Errors
        ignorePermissionErrors: false,
        atomic: true,
    },
};
/**
 * The configuration for the logger.
 */
const loggerConfig = {
    defaults: {
        label: '[APP]',
        level: LOG_LEVELS.log,
        colors: {
            log: '#87ceeb',
            info: '#0dbaff',
            error: '#ff3232',
            warning: '#c48c1d',
        },
    },
    indicators: [],
};
/**
 * The list of command configurations.
 */
const commands = [];
/**
 * The default configuration options for the application.
 */
const appDefaults = {
    debounceRate,
    limitProcessing: true,
    watcher: watcherConfig,
    logger: loggerConfig,
    commands,
};
export { appDefaults };
//# sourceMappingURL=config.js.map