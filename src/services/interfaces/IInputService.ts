import { IService } from './IService';

export interface IInputService extends IService {
    isKeyPressed (key: string): boolean;
    isKeyDown (key: string): boolean;
    isLastKeyDown (key: string): boolean;
    getLastKeyDown (): string | null;
    isKeyUp (key: string): boolean;
    isKeyReleased (key: string): boolean;
    update (): void;
}
