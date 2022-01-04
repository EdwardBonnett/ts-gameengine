import 'reflect-metadata';
import { container, } from 'tsyringe';
import { DebugService } from './services/debugService';
import { EntityService } from './services/entityService';
import { GameService } from './services/gameService';
import { InputService } from './services/inputService';
import { MapService } from './services/mapService';
import { PhysicsService } from './services/physicsService';
import { Services } from './services/services';
import { TextureService } from './services/textureService';

container.registerSingleton(Services.Game, GameService);
container.registerSingleton(Services.Textures, TextureService);
container.registerSingleton(Services.Entity, EntityService);
container.registerSingleton(Services.Input, InputService);
container.registerSingleton(Services.Map, MapService);
container.registerSingleton(Services.Physics, PhysicsService);
container.registerSingleton(Services.Debug, DebugService);
const service = container.resolve(GameService);

service.init();