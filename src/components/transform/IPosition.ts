import { IEntity } from '../../entities/interfaces/IEntity';

export interface IPosition {
    init (entity: IEntity): IPosition;
    x: number;
    y: number;
    z: number;
}
