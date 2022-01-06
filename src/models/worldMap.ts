import { Entity } from '../entities/entity';
import { IEntity } from '../entities/interfaces/IEntity';
import { IEntityParams } from '../entities/interfaces/IEntityParams';

export class WorldMap {
    mapName = 'Map';

    backgroundEntity?: typeof Entity;

    width = 64;

    height = 64;

    entitiesToLoad: Array<{
        config: IEntityParams,
        entity: typeof Entity
    }> = [];

    entities: Array<IEntity> = [];
}
