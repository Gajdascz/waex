import type { LogLevel } from '../loggerUtils.js';
import { type IndicatorManagerType, type Indicator, type Indicators, type IndicatorSelector, type CreateIndicatorArgs, type IndicatorConfig } from './indicatorConfig.js';
/**
 * Manages a collection of indicators, providing CRUD operations and additional functionalities.
 */
declare class IndicatorManager implements IndicatorManagerType {
    private indicators;
    /**
     * Returns an error indicating that the specified indicator is not registered.
     * @param target - The target indicator selector.
     * @returns The error indicating that the target is not registered.
     */
    private getNotRegisteredErr;
    /**
     * Finds the first indicator of the specified log level.
     * @param level - The log level to search for.
     * @returns The first indicator with the specified log level, or undefined if none found.
     */
    private findFirstOfLevel;
    /**
     * Creates an instance of IndicatorManager.
     * @param [indicators] - Optional initial list of indicators to create.
     */
    constructor(indicators?: CreateIndicatorArgs);
    /**
     * Reads the indicators. If a target is specified, returns the indicator matching the target key.
     * @param [target] - The key of the indicator to read.
     * @returns The requested indicator or all indicators.
     * @throws {Error} If the target is not found.
     */
    read(target?: IndicatorSelector): Indicator | Indicators;
    /**
     * Reads the first indicator with the specified log level.
     * @param level - The log level of the indicator to read.
     * @returns The first indicator with the specified log level.
     * @throws {Error} If no indicator with the specified log level is found.
     */
    readByLevel(level: LogLevel): Indicator;
    /**
     * Creates new indicators from the provided configuration(s).
     * @param config - The indicator configuration(s).
     * @returns The instance of IndicatorManager.
     * @throws {Error} If an indicator with the specified key already exists.
     */
    create(config: CreateIndicatorArgs): this;
    /**
     * Updates an existing indicator with new properties.
     * @param target - The key of the indicator to update.
     * @param updateProperties - The properties to update.
     * @returns The instance of IndicatorManager.
     * @throws {Error} If the target is not found or if attempting to overwrite a base indicator key.
     */
    update(target: IndicatorSelector, updateProperties: IndicatorConfig): this;
    /**
     * Deletes an indicator by its key.
     * @param target - The key of the indicator to delete.
     * @returns The instance of IndicatorManager.
     * @throws {Error} If the target is not found or if attempting to delete a base indicator.
     */
    delete(target: IndicatorSelector): this;
    /**
     * Resets the indicator manager by clearing all indicators.
     * @returns The instance of IndicatorManager.
     */
    reset(): this;
    /**
     * Gets the keys of all registered indicators.
     * @returns The keys of all registered indicators.
     */
    get keys(): (keyof Indicators)[];
}
/**
 * Wraps an instance of IndicatorManager to provide additional methods.
 * @param manager - The instance of IndicatorManager to wrap.
 * @returns An object with methods to interact with the IndicatorManager.
 */
declare const wrapIndicatorManager: (manager: IndicatorManager) => {
    /**
     * Registers a new indicator.
     * @param indicatorConfig - The configuration of the indicator to register.
     */
    registerIndicator(indicatorConfig: CreateIndicatorArgs): void;
    /**
     * Gets an indicator by its key.
     * @param [target] - The key of the indicator to get.
     * @returns The requested indicator or all indicators.
     */
    getIndicator(target?: string): Indicator | Indicators;
    /**
     * Gets an indicator by its log level.
     * @param level - The log level of the indicator to get.
     * @returns The first indicator with the specified log level.
     */
    getIndicatorByLevel(level: LogLevel): Indicator;
    /**
     * Updates an indicator by its key.
     * @param target - The key of the indicator to update.
     * @param updateProperties - The properties to update.
     * @returns The instance of the indicatorManager.
     */
    updateIndicator(target: string, updateProperties: IndicatorConfig): IndicatorManager;
    /**
     * Removes an indicator by its key.
     * @param target - The key of the indicator to remove.
     * @returns The instance of the indicatorManager.
     */
    removeIndicator(target: string): IndicatorManager;
    /**
     * Clears all indicators.
     * @returns The instance of the indicatorManager.
     */
    clearAllIndicators(): IndicatorManager;
    /**
     * Gets the keys of all registered indicators.
     * @returns The keys of all registered indicators.
     */
    readonly keys: string[];
};
export { IndicatorManager, wrapIndicatorManager, type IndicatorManagerType, type Indicator, type Indicators, type IndicatorSelector, type CreateIndicatorArgs, type IndicatorConfig, };
//# sourceMappingURL=IndicatorManager.d.ts.map