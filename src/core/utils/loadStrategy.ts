import { appDefaults } from './config.js';
import fs from 'fs';
import path from 'path';
import type { ConfigOptions } from './config.js';
import type { LoggerDefaults } from '../logger/Logger.js';
import type { WatchExecutorCstrArgs } from '../WatchExecutor.js';

/**
 * Merges provided logger defaults with application defaults.
 * @param provided Provided logger defaults.
 * @returns  Merged logger defaults.
 */
const mergeLoggerDefaults = (
  provided: Partial<LoggerDefaults>,
): LoggerDefaults => {
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
const parseObjectConfig = (
  configOptions: Partial<ConfigOptions>,
): ConfigOptions => {
  const { debounceRate, watcher, commands, logger } = configOptions;
  const debounce = debounceRate ?? appDefaults.debounceRate;
  const watch = { ...appDefaults.watcher, ...watcher };
  const log = {
    indicators: logger?.indicators ?? appDefaults.logger.indicators,
    defaults:
      logger?.defaults ?
        mergeLoggerDefaults(logger.defaults)
      : appDefaults.logger.defaults,
  };
  const cmd = commands ?? appDefaults.commands;
  return {
    debounceRate: debounce,
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
  const finalPath =
    configPath ?? path.resolve(import.meta.dirname, './waex.config.json');
  try {
    const config = JSON.parse(
      fs.readFileSync(finalPath, 'utf-8'),
    ) as ConfigOptions;
    return parseObjectConfig(config);
  } catch (err) {
    throw new Error(
      `Failed to load configuration from ${finalPath}: ${String(err)}`,
    );
  }
};

/**
 * Loads the configuration based on the provided argument.
 * @param configOptions Configuration options or path.
 * @returns Merged configuration options.
 */
export default (
  configOptions: WatchExecutorCstrArgs,
): ConfigOptions | never => {
  if (configOptions === undefined) return parseJSONConfig();
  if (typeof configOptions === 'string') return parseJSONConfig(configOptions);
  if (typeof configOptions === 'object') {
    return parseObjectConfig(configOptions);
  }
  throw new Error(
    `WatchExecutor Load Strategy Failed: ${String(configOptions)}`,
  );
};
