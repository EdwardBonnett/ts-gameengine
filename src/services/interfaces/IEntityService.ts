import { Entity } from '../../entities/entity';
import { IEntity } from '../../entities/interfaces/IEntity';
import { IEntityParams } from '../../entities/interfaces/IEntityParams';
import { IService } from './IService';

export interface IEntityService extends IService {
    entities: Array<IEntity>;
    createEntityFromParams (params: IEntityParams): Promise<IEntity>;
    createEntity (EntityType: typeof Entity, params?: IEntityParams): Promise<IEntity>;
    removeEntity (entity: IEntity): Promise<void>;
}
