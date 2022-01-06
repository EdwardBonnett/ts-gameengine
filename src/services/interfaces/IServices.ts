import { IDebugService } from './IDebugService';
import { IEntityService } from './IEntityService';
import { IGameService } from './IGameService';
import { IInputService } from './IInputService';
import { IMapService } from './IMapService';
import { IPhysicsService } from './IPhysicsService';
import { IRenderService } from './IRenderService';
import { ITextureService } from './ITextureService';
import { IUIService } from './IUIService';

export interface IServices {
    Debug: IDebugService;
    Entity: IEntityService;
    Game: IGameService;
    Input: IInputService;
    Map: IMapService;
    Physics: IPhysicsService;
    Textures: ITextureService;
    Render: IRenderService;
    UI: IUIService;
}
