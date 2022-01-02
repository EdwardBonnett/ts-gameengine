import { Entity } from "../../entities/entity";

export interface IPosition {
    init (entity: Entity): IPosition;
    x: number;
    y: number;
    z: number;
}