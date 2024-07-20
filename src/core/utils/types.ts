type Entities<T> = T[] | Record<string, T>;
interface EntityManager<EntityConfig, EntitySelector, Entity> {
  read: (target?: EntitySelector) => Entity | Entities<Entity>;
  create: (config: EntityConfig | EntityConfig[]) => this;
  update: (target: EntitySelector, updateData: EntityConfig) => this;
  delete: (target: EntitySelector) => this;
  reset: () => this;
}
export type { EntityManager };
