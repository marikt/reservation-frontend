import {Device} from './device';

export class DeviceInRelation {

    public device: Device;
    public active: boolean;

    constructor(device: Device) {
        this.device = device;
        this.active = false;
    }
}
