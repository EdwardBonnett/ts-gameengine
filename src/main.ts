import 'reflect-metadata';
import { container } from 'tsyringe';
import { createApp } from 'vue';
import { DebugService } from './services/debugService';
import { EntityService } from './services/entityService';
import { GameService } from './services/gameService';
import { InputService } from './services/inputService';
import { IGameService } from './services/interfaces/IGameService';
import { MapService } from './services/mapService';
import { PhysicsService } from './services/physicsService';
import { RenderService } from './services/renderService';
import { ServiceAccessor } from './services/serviceAccessor';
import { Services } from './services/services';
import { TextureService } from './services/textureService';
import { UIService } from './services/uiService';
import App from './ui/App.vue';

container.registerSingleton(Services.Game, GameService);
container.registerSingleton(Services.Textures, TextureService);
container.registerSingleton(Services.Entity, EntityService);
container.registerSingleton(Services.Input, InputService);
container.registerSingleton(Services.Map, MapService);
container.registerSingleton(Services.Physics, PhysicsService);
container.registerSingleton(Services.Debug, DebugService);
container.registerSingleton(Services.Render, RenderService);
container.registerSingleton(Services.UI, UIService);

const services = new ServiceAccessor();
const game = services.getService<IGameService>(Services.Game);
game.init();

createApp(App).mount('#app');
