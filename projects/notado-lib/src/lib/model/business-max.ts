import {ServiceMax} from './service-max';
import {Business} from './business';
import {WorkerMax} from './worker-max';
import {Device} from './device';
import {OpeningDay} from './opening-day';
import {DayOfWeek} from '../util/day-of-week';
import {ServiceGroupMax} from './service-group-max';
import {BusinessBranchMax} from './business-branch-max';


export class BusinessMax extends Business {

    public services: ServiceMax[];
    public workers: WorkerMax[];
    public devices: Device[];
    public openingDays: OpeningDay[];
    public serviceGroups: ServiceGroupMax[];
    public businessBranches: BusinessBranchMax[];

    constructor() {
        super();
        this.openingDays = [];
        this.openingDays[0] = new OpeningDay(DayOfWeek.MONDAY);
        this.openingDays[1] = new OpeningDay(DayOfWeek.TUESDAY);
        this.openingDays[2] = new OpeningDay(DayOfWeek.WEDNESDAY);
        this.openingDays[3] = new OpeningDay(DayOfWeek.THURSDAY);
        this.openingDays[4] = new OpeningDay(DayOfWeek.FRIDAY);
        this.openingDays[5] = new OpeningDay(DayOfWeek.SATURDAY);
        this.openingDays[6] = new OpeningDay(DayOfWeek.SUNDAY);

        this.services = [];
        this.services[0] = new ServiceMax();

        this.workers = [];
        this.workers[0] = new WorkerMax();
        this.devices = [];
        this.devices[0] = new Device();

    }
}
