# waex

:warning: This project is in early development and is not stable. :warning:

waex, short for watch execute, is a development tool that uses chokidar to watch for file changes and sequentially execute commands on those changed files.

## Features

- **Configuration:** Most of the app is configurable and flexible.
- **Debouncing:** When enabled, calls to event handlers are debounced to reduce unnecessary processing.
- **Processing Limiting:** When enabled, the watcher ignores execution requests until it has finished its current task.

## How to use

1. Install from the desired branch (source for development dist for use).
2. Configure by:

- Including a waex.config.json file in the root of your directory [Example Config File](./waex.config.json)
- Supplying the path to your configuration file when instantiating the WatchExec class.
- Supplying a configuration object directly to the WatchExec class.

3. Import and Instantiate the WatchExec class.

## To do

- Implement dynamic console grouping for logs.
  - eg. command executions are cohesive (grouped) but the events that triggered them are not.
- Improve documentation
  - Finish this document (README)
  - Cleanup and finish code comments for typedoc.
- Write tests.
- General cleanup and maintenance.
