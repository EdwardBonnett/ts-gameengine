import { container } from 'tsyringe';
import { IServices } from './interfaces/IServices';
import { Service } from './service';
import { Services } from './services';

export class ServiceAccessor {
    private static _services?: IServices;

    getService<T extends Service> (service: symbol | string) {
        return container.resolve<T>(service);
    }

    get services (): IServices {
        if (ServiceAccessor._services) return ServiceAccessor._services;
        const keys: Partial<Record<keyof typeof Services, Service>> = {};
        Object.keys(Services).forEach((key) => {
            keys[key as keyof typeof Services] = this.getService(Services[key as keyof typeof Services]);
        });
        ServiceAccessor._services = keys as unknown as IServices;
        return ServiceAccessor._services;
    }
}
