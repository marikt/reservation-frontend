import {FormWindowName} from '../../util/form-window-name';
import {ReservationWindowConfig} from './reservation-window-config';


export class ReservationWindow {

    public id: number;
    public seq: number;
    public active: boolean;
    public required: boolean;
    public label: string;
    public name: FormWindowName;
    public config: ReservationWindowConfig = new ReservationWindowConfig();

    constructor() {
    }
}
