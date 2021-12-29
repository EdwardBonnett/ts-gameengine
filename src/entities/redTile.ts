import Entity, { EntityParams } from "./entity";

export default class RedTile extends Entity {
    init (params: EntityParams) {
        super.init({
            name: 'RedTile',
            resourceName: 'FloorTile',
            resourcePath: '/FloorTile.json',
            currentAnimation: 'RedTile',
            looping: false,
            ...params,
        });
    }

}