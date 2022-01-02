import { delay, inject, singleton } from "tsyringe";
import { EntityParams, Entity } from "../entities/entity";
import { GameService } from "./gameService";
import { DebugService } from "./debugService";
import { InputService } from "./inputService";
import { MapService } from "./mapService";
import { TextureService } from "./textureService";

@singleton()
export class EntityService {

    entities: Array<Entity> = [];

    constructor (
        @inject(delay(() => GameService)) private gameService: GameService,
        @inject(delay(() => InputService)) private inputService: InputService,
        @inject(TextureService) private textureService: TextureService,
        @inject(DebugService) private debugService: DebugService,
        @inject(MapService) private mapService: MapService) {
    }

    async createEntityFromParams (params: EntityParams) {
        this.createEntity(Entity, params);
    }

    async createEntity (entityType: typeof Entity, params?: EntityParams) {
        const entity = new entityType(this.gameService, this.textureService, this.inputService, this.mapService, this, this.debugService);
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