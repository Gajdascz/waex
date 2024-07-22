import chalk from 'chalk';
import { normalizeAsArray } from '../../../utils/helpers.js';
import { BASE_INDICATOR_KEY_SET, getBaseIndicators, } from './indicatorConfig.js';
/**
 * Manages a collection of indicators, providing CRUD operations and additional functionalities.
 */
class IndicatorManager {
    indicators = {};
    /**
     * Returns an error indicating that the specified indicator is not registered.
     * @param target - The target indicator selector.
     * @returns The error indicating that the target is not registered.
     */
    getNotRegisteredErr(target) {
        return new Error(`${target} not found in registered indicators.`);
    }
    /**
     * Finds the first indicator of the specified log level.
     * @param level - The log level to search for.
     * @returns The first indicator with the specified log level, or undefined if none found.
     */
    findFirstOfLevel(level) {
        for (const key in this.indicators) {
            const currentIndicator = this.indicators[key];
            if (currentIndicator.level === level)
                return currentIndicator;
        }
    }
    /**
     * Creates an instance of IndicatorManager.
     * @param [indicators] - Optional initial list of indicators to create.
     */
    constructor(indicators) {
        const configArr = getBaseIndicators();
        if (indicators)
            configArr.push(...normalizeAsArray(indicators));
        configArr.forEach((cf) => this.create(cf));
    }
    /**
     * Reads the indicators. If a target is specified, returns the indicator matching the target key.
     * @param [target] - The key of the indicator to read.
     * @returns The requested indicator or all indicators.
     * @throws {Error} If the target is not found.
     */
    read(target) {
        if (!target)
            return structuredClone(this.indicators);
        if (target in this.indicators)
            return { ...this.indicators[target] };
        throw this.getNotRegisteredErr(target);
    }
    /**
     * Reads the first indicator with the specified log level.
     * @param level - The log level of the indicator to read.
     * @returns The first indicator with the specified log level.
     * @throws {Error} If no indicator with the specified log level is found.
     */
    readByLevel(level) {
        const indicator = this.findFirstOfLevel(level);
        if (!indicator)
            throw new Error(`${level} not found in registered indicators.`);
        return indicator;
    }
    /**
     * Creates new indicators from the provided configuration(s).
     * @param config - The indicator configuration(s).
     * @returns The instance of IndicatorManager.
     * @throws {Error} If an indicator with the specified key already exists.
     */
    create(config) {
        normalizeAsArray(config).forEach((cf) => {
            if (cf.key in this.indicators)
                throw new Error(`${cf.key} is already a registered indicator.`);
            this.indicators[cf.key] = {
                ...cf,
                str: chalk.hex(cf.color).bold(cf.symbol),
            };
        });
        return this;
    }
    /**
     * Updates an existing indicator with new properties.
     * @param target - The key of the indicator to update.
     * @param updateProperties - The properties to update.
     * @returns The instance of IndicatorManager.
     * @throws {Error} If the target is not found or if attempting to overwrite a base indicator key.
     */
    update(target, updateProperties) {
        if (!(target in this.indicators))
            throw this.getNotRegisteredErr(target);
        if (BASE_INDICATOR_KEY_SET.has(target)) {
            if (updateProperties.key && updateProperties.key !== target)
                throw new Error(`Cannot overwrite the key of a base indicator.`);
        }
        const mergedProps = { ...this.indicators[target], ...updateProperties };
        this.indicators[target] = mergedProps;
        return this;
    }
    /**
     * Deletes an indicator by its key.
     * @param target - The key of the indicator to delete.
     * @returns The instance of IndicatorManager.
     * @throws {Error} If the target is not found or if attempting to delete a base indicator.
     */
    delete(target) {
        if (!(target in this.indicators))
            throw this.getNotRegisteredErr(target);
        if (BASE_INDICATOR_KEY_SET.has(target))
            throw new Error(`Cannot delete a base indicator. You can update base indicators or add custom ones.`);
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete this.indicators[target];
        return this;
    }
    /**
     * Resets the indicator manager by clearing all indicators.
     * @returns The instance of IndicatorManager.
     */
    reset() {
        this.indicators = {};
        return this;
    }
    /**
     * Gets the keys of all registered indicators.
     * @returns The keys of all registered indicators.
     */
    get keys() {
        return Object.keys(this.indicators);
    }
}
/**
 * Wraps an instance of IndicatorManager to provide additional methods.
 * @param manager - The instance of IndicatorManager to wrap.
 * @returns An object with methods to interact with the IndicatorManager.
 */
const wrapIndicatorManager = (manager) => ({
    /**
     * Registers a new indicator.
     * @param indicatorConfig - The configuration of the indicator to register.
     */
    registerIndicator(indicatorConfig) {
        manager.create(indicatorConfig);
    },
    /**
     * Gets an indicator by its key.
     * @param [target] - The key of the indicator to get.
     * @returns The requested indicator or all indicators.
     */
    getIndicator(target) {
        return manager.read(target);
    },
    /**
     * Gets an indicator by its log level.
     * @param level - The log level of the indicator to get.
     * @returns The first indicator with the specified log level.
     */
    getIndicatorByLevel(level) {
        return manager.readByLevel(level);
    },
    /**
     * Updates an indicator by its key.
     * @param target - The key of the indicator to update.
     * @param updateProperties - The properties to update.
     * @returns The instance of the indicatorManager.
     */
    updateIndicator(target, updateProperties) {
        return manager.update(target, updateProperties);
    },
    /**
     * Removes an indicator by its key.
     * @param target - The key of the indicator to remove.
     * @returns The instance of the indicatorManager.
     */
    removeIndicator(target) {
        return manager.delete(target);
    },
    /**
     * Clears all indicators.
     * @returns The instance of the indicatorManager.
     */
    clearAllIndicators() {
        return manager.reset();
    },
    /**
     * Gets the keys of all registered indicators.
     * @returns The keys of all registered indicators.
     */
    get keys() {
        return manager.keys;
    },
});
export { IndicatorManager, wrapIndicatorManager, };
//# sourceMappingURL=IndicatorManager.js.map