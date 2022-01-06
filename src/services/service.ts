import { IService } from './interfaces/IService';
import { ServiceAccessor } from './serviceAccessor';

export class Service implements IService {
    serviceAccessor?: ServiceAccessor;

    get services () {
        if (!this.serviceAccessor) this.serviceAccessor = new ServiceAccessor();
        return this.serviceAccessor.services;
    }
}
