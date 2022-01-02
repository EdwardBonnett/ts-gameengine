import DoorComponent from "../components/doorComponent";
import PushableComponent from "../components/pushableComponent";
import SolidComponent from "../components/solidComponent";
import Entity, { EntityParams } from "../entities/entity";
import FloorTile from "../entities/floorTile";
import Player from "../entities/player";
import RedTile from "../entities/redTile";
import WorldMap from "../models/worldMap";
import MapHouse from "./mapHouse";

export default class MapOverworld extends WorldMap {
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
                components: [{ component: DoorComponent }], 
                componentProps: { door: { room: MapHouse, x: 15, y: 3 } }},
        },
        {
            entity: RedTile, 
            config: {  
                x: 10, 
                y: 10, 
                scaleX: 1, 
                scaleY: 1, 
                components: [
                    { component: SolidComponent },
                    { component: PushableComponent }
                ], 
            }
        },
        { 
            entity: Player,
            config: { x: 5, y: 5, visible: true, scaleX: 2, children: [
                {
                    entity: RedTile,
                    config: {
                        x: 10,
                        scaleX: 1,
                        visible: true,
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