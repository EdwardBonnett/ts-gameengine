import Entity, { EntityParams } from "../entities/entity";

export default class WorldMap {
    mapName: string = 'Map';

    backgroundEntity?: typeof Entity;

    entitiesToLoad: Array<{
        config: EntityParams,
        entity: typeof Entity
    }> = [];

    entities: Array<Entity> = [];
}