import FloorTile from "../entities/floorTile";
import Player from "../entities/player";
import WorldMap from "../models/worldMap";

export default class MapHouse extends WorldMap {
    mapName = 'House';

    backgroundEntity = FloorTile;
    
    entitiesToLoad = [
        { entity: Player, config: { x: 5, y: 5 } },
    ]
}