import { DebugService } from "./debugService";
import { EntityService } from "./entityService";
import { GameService } from "./gameService";
import { InputService } from "./inputService";
import { MapService } from "./mapService";
import { PhysicsService } from "./physicsService";
import { TextureService } from "./textureService";

export const Services = {
    Debug: Symbol.for('Debug'),
    Entity: Symbol.for('Entity'),
    Game: Symbol.for('Game'),
    Input: Symbol.for('Input'),
    Map: Symbol.for('Map'),
    Physics: Symbol.for('Physics'),
    Textures: Symbol.for('Textures')
}

export interface IServices {
    Debug: DebugService;
    Entity: EntityService;
    Game: GameService;
    Input: InputService;
    Map: MapService;
    Physics: PhysicsService;
    Textures: TextureService;
}