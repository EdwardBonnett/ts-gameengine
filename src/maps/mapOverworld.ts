import { CollisionComponent } from "../components/collisionComponent";
import { DoorComponent } from "../components/doorComponent";
import { PushableComponent } from "../components/pushableComponent";
import { RenderComponent } from "../components/renderComponent";
import { SolidComponent } from "../components/solidComponent";
import { Entity, EntityParams } from "../entities/entity";
import { FloorTile } from "../entities/floorTile";
import { Player } from "../entities/player";
import { RedTile } from "../entities/redTile";
import { WorldMap } from "../models/worldMap";
import { MapHouse } from "./mapHouse";

export class MapOverworld extends WorldMap {
    mapName = 'Overworld';

    backgroundEntity = FloorTile;

    entitiesToLoad:  Array<{ config: EntityParams, entity: typeof Entity}> = [
        {
            entity: RedTile, 
            config: {  
                x: 10, 
                y: 5, 
                scaleX: 1, 
                scaleY: 1, 
                components: [{ component: DoorComponent, props:  { room: MapHouse, x: 15, y: 3 }  }], 
            }
        },
        {
            entity: RedTile, 
            config: {  
                x: 10, 
                y: 10, 
                scaleX: 1, 
                scaleY: 1, 
                z: 99,
                components: [
                    { component: SolidComponent },
                    { component: PushableComponent },
                    { component: CollisionComponent, },
                    {
                        component: RenderComponent, 
                        props: {
                            resourceName: 'FloorTile',
                            resourcePath: '/FloorTile.json',
                            currentAnimation: 'RedTile',
                            looping: false
                        }
                    }
                ], 
                debug: {
                    collisionRect: true
                }
            }
        },
        { 
            entity: Player,
            config: { x: 5, y: 5, children: [
                {
                    entity: RedTile,
                    config: {
                        components: [
                            { component: CollisionComponent, },
                            {
                                component: RenderComponent, 
                                props: {
                                    id: 'tile',
                                    resourceName: 'FloorTile',
                                    resourcePath: '/FloorTile.json',
                                    currentAnimation: 'RedTile',
                                    looping: false,
                                    visible: false,
                                }
                            }
                        ],
                        x: 10,
                        scaleX: 1,
                        y: 0,
                        debug: {
                            collisionRect: true
                        }
                    }
                }
            ]}
        },
    ]
}