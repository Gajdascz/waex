//#region Constants
/**
 * Log levels used in the logging system.
 */
const LOG_LEVELS = {
    log: 'log',
    info: 'info',
    warn: 'warn',
    error: 'error',
};
//#endregion Types
//#region Helpers
/**
 * Resolves the appropriate color for a log level, using provided or default colors.
 * @param level - The log level to resolve the color for.
 * @param defaultColors - The default colors for log levels.
 * @param [providedColors] - Optional colors provided for overriding defaults.
 * @returns The resolved color for the log level.
 */
const resolveColor = (level, defaultColors, providedColors = {}) => {
    const { log, info, warning, error } = providedColors;
    switch (level) {
        case LOG_LEVELS.info:
            return info ?? defaultColors.info;
        case LOG_LEVELS.warn:
            return warning ?? defaultColors.warning;
        case LOG_LEVELS.error:
            return error ?? defaultColors.error;
        default:
            return log ?? defaultColors.log;
    }
};
//#endregion Helpers
export { resolveColor, LOG_LEVELS };
//# sourceMappingURL=loggerUtils.js.map