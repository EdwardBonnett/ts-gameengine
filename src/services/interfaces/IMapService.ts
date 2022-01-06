import { IEntity } from '../../entities/interfaces/IEntity';
import { WorldMap } from '../../models/worldMap';
import { IService } from './IService';

export interface IMapService extends IService {
    currentMap?: WorldMap;
    changeMap (map: typeof WorldMap): Promise<void>;
    loadMap (map: typeof WorldMap): Promise<void>;
    unloadMap (): void;
    removeEntityFromMap (entity: IEntity): void;
    addEntityToMap (entity: IEntity): void;

    update (dt: number): void;
}
