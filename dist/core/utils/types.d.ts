/**
 * A type representing a collection of entities, which can be either an array or a record.
 * @template T - The type of the entities.
 */
type Entities<T> = T[] | Record<string, T>;
/**
 * An interface for managing entities, providing CRUD operations and a reset function.
 * @template EntityConfig - The type for the configuration of the entities.
 * @template EntitySelector - The type for selecting entities.
 * @template Entity - The type of the entities being managed.
 */
interface EntityManager<EntityConfig, EntitySelector, Entity> {
    read: (target?: EntitySelector) => Entity | Entities<Entity> | undefined;
    create: (config: EntityConfig | EntityConfig[]) => this;
    update: (target: EntitySelector, updateData: EntityConfig) => this;
    delete: (target: EntitySelector) => this;
    reset: () => this;
}
export type { EntityManager };
//# sourceMappingURL=types.d.ts.map