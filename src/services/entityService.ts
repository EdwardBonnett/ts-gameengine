import { singleton } from "tsyringe";
import { EntityParams, Entity } from "../entities/entity";
import { ServiceAccessor } from "./serviceAccessor";

@singleton()
export class EntityService extends ServiceAccessor {

    entities: Array<Entity> = [];

    async createEntityFromParams (params: EntityParams) {
        this.createEntity(Entity, params);
    }

    async createEntity (entityType: typeof Entity, params?: EntityParams) {
        const entity = new entityType();
        await entity.init(params);

        if (entity.global) {
            const existingGlobal = this.entities.find(a => a.global && a.name === entity.name);
            // If we just created another global object then destroy it (have to init it first to check it's global)
            if (existingGlobal) {
                entity.destroy();
                return existingGlobal;
            }
        }

        this.entities.push(entity);

        if (params?.children) {
            params.children?.forEach(async (child) => {
                const childEntity = await this.createEntity(
                    child.entity, 
                    { ...child.config, parent: entity }
                );
                entity.children.push(childEntity);
            });
        }
        return entity;
    }

    async removeEntity (entity: Entity) {
        const index = this.entities.indexOf(entity);
        if (index > -1) {
            this.entities.splice(index, 1);
        }
    }
}