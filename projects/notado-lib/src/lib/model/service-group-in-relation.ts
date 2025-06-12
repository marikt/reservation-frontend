import {ServiceGroupMax} from './service-group-max';

export class ServiceGroupInRelation {

    public serviceGroup: ServiceGroupMax;
    public active: boolean;

    constructor(serviceGroup: ServiceGroupMax) {
        this.serviceGroup = serviceGroup;
        this.active = false;
    }
}
