import { singleton } from 'tsyringe';
import { Entity } from '../entities/entity';
import { IEntity } from '../entities/interfaces/IEntity';
import { IEntityParams } from '../entities/interfaces/IEntityParams';
import { IEntityService } from './interfaces/IEntityService';
import { Service } from './service';

@singleton()
export class EntityService extends Service implements IEntityService {
    entities: Array<IEntity> = [];

    async createEntityFromParams (params: IEntityParams) {
        return this.createEntity(Entity, params);
    }

    async createEntity (EntityType: typeof Entity, params?: IEntityParams) {
        const entity = new EntityType();
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
                    { ...child.config, parent: entity },
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
