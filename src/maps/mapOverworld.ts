import { CollisionComponent } from '../components/collisionComponent';
import { DoorComponent } from '../components/doorComponent';
import { PushableComponent } from '../components/pushableComponent';
import { SolidComponent } from '../components/solidComponent';
import { Entity } from '../entities/entity';
import { FloorTile } from '../entities/floorTile';
import { IEntityParams } from '../entities/interfaces/IEntityParams';
import { Player } from '../entities/player';
import { RedTile } from '../entities/redTile';
import { TiledAnimation } from '../entities/tiledAnimation';
import { WorldMap } from '../models/worldMap';
import { MapHouse } from './mapHouse';

export class MapOverworld extends WorldMap {
    mapName = 'Overworld';

    backgroundEntity = FloorTile;

    tileBackground = true;

    width = 1000;

    height = 1000;

    entitiesToLoad: Array<{ config: IEntityParams, entity: typeof Entity}> = [
        {
            entity: TiledAnimation,
            config: {
                x: 0,
                y: 0,
                scaleX: 1,
                scaleY: 1,
                additionalComponents: [
                    { component: DoorComponent },
                ],
                componentProps: {
                    DoorComponent: { room: MapHouse, x: 15, y: 3 },
                },
            },
        },
        {
            entity: RedTile,
            config: {
                x: 10,
                y: 10,
                scaleX: 1,
                scaleY: 1,
                z: 99,
                additionalComponents: [
                    { component: SolidComponent },
                    { component: PushableComponent },
                    { component: CollisionComponent },
                ],
                debug: {
                    collisionRect: true,
                },
            },
        },
        {
            entity: Player,
            config: {
                x: 5,
                y: 5,
                children: [
                    {
                        entity: RedTile,
                        config: {
                            additionalComponents: [
                                { component: CollisionComponent },
                            ],
                            componentProps: {
                                RenderComponent: {
                                    visible: true,
                                },
                            },
                            x: 10,
                            scaleX: 1,
                            y: 0,
                            debug: {
                                collisionRect: true,
                            },
                        },
                    },
                ],
            },
        },
    ]
}
