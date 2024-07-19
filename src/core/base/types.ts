import { LOG_TYPES } from './constants.js';
import type { LogDetail } from '../logger/logger.js';

type AsyncProcedure = (...args: unknown[]) => Promise<void>;


type LogLevel = (typeof LOG_TYPES)[keyof typeof LOG_TYPES];

type Entities<T> = T[] | Record<string, T>;
interface EntityManager<EntityConfig, EntitySelector, Entity> {
  read: (target?: EntitySelector) => Entity | Entities<Entity>;
  create: (config: EntityConfig | EntityConfig[]) => this;
  update: (target: EntitySelector, updateData: EntityConfig) => this;
  delete: (target: EntitySelector) => this;
  reset: () => this;
}
export type { AsyncProcedure, EntityManager, LogDetail, LogLevel };
