import {Worker} from './worker';

export class WorkerInRelation {

    public worker: Worker;
    public active: boolean;

    constructor(worker: Worker) {
        this.worker = worker;
        this.active = false;
    }
}
