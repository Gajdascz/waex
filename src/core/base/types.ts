import { LOG_TYPES } from "./constants.js";
import type { LogDetail } from "../logger/logger.js";

type Procedure = (...args: unknown[]) => void;

type LogLevel = typeof LOG_TYPES[keyof typeof LOG_TYPES]
type EntityMethodReturnType = Partial<LogDetail> | Partial<LogDetail>[] | boolean 

type Entities<T> = T[] | Record<string,T>
interface EntityManager<EntityConfig,EntitySelector,Entity>{
  read: (target?: EntitySelector) => Entity | Entities<Entity>
  create: (config: EntityConfig|EntityConfig[]) => EntityMethodReturnType;
  update: (target: EntitySelector, updateData: EntityConfig) => EntityMethodReturnType;
  delete: (target: EntitySelector) => EntityMethodReturnType;
  reset: () => EntityMethodReturnType; 
}
export type { Procedure, EntityManager, LogDetail, LogLevel }