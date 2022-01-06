import { Component } from '../../components/component';
import { Entity } from '../entity';
import { IEntity } from './IEntity';

export interface IEntityParams {
    id?: string;
    name?: string;
    x?: number;
    y?: number;
    z?: number;
    layer?: string | number;
    width?: number;
    height?: number;
    scaleX?: number;
    scaleY?: number;
    components?: Array<{ component: typeof Component, props?: object }>;
    additionalComponents?: Array<{ component: typeof Component, props?: object }>;
    componentProps?: Record<string, object>;
    global?: boolean;
    debug?: {
        collisionRect?: boolean;
        drawRaycasts?: boolean;
    };
    parent?: IEntity;
    children?: Array<{
        config: IEntityParams,
        entity: typeof Entity
    }>;
}
