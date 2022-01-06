import { IService } from './IService';

export interface IUIService extends IService {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    subscribeEvent (subscriberId: string, eventId: string, func: (...params: any) => void): void;
    showMessage (text: string): void;
}
