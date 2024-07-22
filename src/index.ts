import { WatchExec } from './core/WatchExec/WatchExec.js';
/**
 * WatchExec is a development tool that monitors files/directories and executes predefined commands when changes are detected.
 * It can be used to automate repetitive tasks such as code formatting, linting, and testing.
 *
 * Key Features:
 * - **File Watching**: Uses `chokidar` to watch for file changes. The watcher can be configured to ignore certain files, follow symlinks, use polling, and more.
 * - **Command Execution**: Executes a series of predefined commands when file changes are detected. Commands are configured with specific runners (e.g., `npx`) and arguments.
 * - **Logging**: Includes a customizable logging mechanism to provide feedback on the execution of commands and the detection of file changes.
 * - **Configuration**: The application can be configured through a `ConfigOptions` object, which includes settings for debounce rate, file watcher options, logger options, and commands.
 *
 */
export { WatchExec };
