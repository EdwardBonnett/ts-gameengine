import { Entity, EntityParams } from "../entities/entity";

export class WorldMap {
    mapName: string = 'Map';

    backgroundEntity?: typeof Entity;

    entitiesToLoad: Array<{
        config: EntityParams,
        entity: typeof Entity
    }> = [];

    entities: Array<Entity> = [];
}