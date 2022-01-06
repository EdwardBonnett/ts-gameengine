import { singleton } from 'tsyringe';
import { IUIService } from './interfaces/IUIService';
import { Service } from './service';

@singleton()
export class UIService extends Service implements IUIService {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    subscriptions: Record<string, Record<string, (...params: any) => void>> = {};

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    subscribeEvent (subscriberId: string, eventId: string, func: (...params: any) => void) {
        if (!this.subscriptions[eventId]) {
            this.subscriptions[eventId] = {};
        }
        this.subscriptions[eventId][subscriberId] = func;
    }

    init () {
        // TODO
    }

    showMessage (text: string) {
        if (this.subscriptions.message) {
            Object.values(this.subscriptions.message).forEach((sub) => {
                sub(text);
            });
        }
    }
}
