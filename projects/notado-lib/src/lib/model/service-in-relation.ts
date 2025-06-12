import {Service} from './service';

export class ServiceInRelation {

    public service: Service;
    public active: boolean;

    constructor(service: Service) {
        this.service = service;
        this.active = false;
    }
}
