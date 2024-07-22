import { appDefaults, type ConfigOptions } from './config.js';
import fs from 'fs';
import path from 'path';
import { type LoggerDefaults } from '../../logger/Logger.js';
import { type WatchExecCstrArgs } from '../WatchExec.js';
import chalk from 'chalk';

/**
 * Merges provided logger defaults with application defaults.
 * @param provided Provided logger defaults.
 * @returns  Merged logger defaults.
 */
const mergeLoggerDefaults = (provided: Partial<LoggerDefaults>): LoggerDefaults => {
  const defs = appDefaults.logger.defaults;
  return {
    colors: { ...defs.colors, ...provided.colors },
    label: provided.label ?? defs.label,
    level: provided.level ?? defs.level,
  };
};

/**
 * Parses and merges the provided configuration object with the application defaults.
 * @param configOptions Provided configuration options.
 * @returns Merged configuration options.
 */
const parseObjectConfig = (configOptions: Partial<ConfigOptions>): ConfigOptions => {
  const { debounceRate, limitProcessing, watcher, commands, logger } = configOptions;
  const debounce = debounceRate ?? appDefaults.debounceRate;
  const watch = { ...appDefaults.watcher, ...watcher };
  const log = {
    indicators: logger?.indicators ?? appDefaults.logger.indicators,
    defaults: logger?.defaults ? mergeLoggerDefaults(logger.defaults) : appDefaults.logger.defaults,
  };
  const cmd = commands ?? appDefaults.commands;
  const limiter = limitProcessing ?? appDefaults.limitProcessing;
  return {
    debounceRate: debounce,
    limitProcessing: limiter,
    watcher: watch,
    logger: log,
    commands: cmd,
  };
};

/**
 * Parses the JSON configuration file from the given path.
 * @param [configPath] Path to the JSON configuration file.
 * @returns Parsed and merged configuration options.
 */
const parseJSONConfig = (configPath?: string) => {
  const finalPath = configPath ?? path.resolve('./waex.config.json');
  try {
    const config = JSON.parse(fs.readFileSync(finalPath, 'utf-8')) as ConfigOptions;
    return parseObjectConfig(config);
  } catch (err) {
    throw new Error(`Failed to load configuration from ${finalPath}: ${String(err)}`);
  }
};
const context = {
  color: '#3b00b9',
  label: '[LOAD_STRATEGY]',
};
/**
 * Loads the configuration based on the provided argument.
 * @param configOptions Configuration options or path.
 * @returns Merged configuration options.
 */
export default (configOptions: WatchExecCstrArgs): ConfigOptions | never => {
  if (configOptions === undefined) {
    console.log(
      chalk.bold.hex(context.color)(
        `  ${context.label} Attempting to parse config at project root: ./waex.config.json`,
      ),
    );
    return parseJSONConfig();
  }
  if (typeof configOptions === 'string') {
    console.log(
      chalk.bold.hex(context.color)(
        `  ${context.label} Attempting to parse config at: ${configOptions}`,
      ),
    );
    return parseJSONConfig(configOptions);
  }
  if (typeof configOptions === 'object') {
    console.log(chalk.bold.hex(context.color)(`  ${context.label} Parsing Object config`));
    return parseObjectConfig(configOptions);
  }
  throw new Error(`WatchExec Load Strategy Failed: ${String(configOptions)}`);
};
