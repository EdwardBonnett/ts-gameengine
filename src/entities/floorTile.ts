import Entity, { EntityParams } from "./entity";

export default class FloorTile extends Entity {
    init (params: EntityParams) {
        super.init({
            ...params,
            name: 'FloorTile',
            resourcePath: '/FloorTile.json',
            currentAnimation: 'FloorTile',
            looping: false,
        });
    }

}