import 'reflect-metadata';
import { container, } from 'tsyringe';
import EntityService from './services/entityService';
import GameService from './services/gameService';
import InputService from './services/inputService';
import MapService from './services/mapService';
import TextureService from './services/textureService';

container.registerSingleton(GameService);
container.registerSingleton(TextureService);
container.registerSingleton(EntityService);
container.registerSingleton(InputService);
container.registerSingleton(MapService);
const service = container.resolve(GameService);
service.init();