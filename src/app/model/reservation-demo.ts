export class ReservationDemo {

    public name: string;
    public email: string;
    public phone: string;
    public service: string;
    public serviceGroup: string;
    public businessBranch: string;
    public worker: string;
    public date: { year: number; month: number; day: number; };
    public time: string;
    public voucher: string;
    public note: string;
    public voucherActive: boolean;
    public requestedAttendeesNo: number = 1;

    constructor() {
        let today: Date = new Date();
        this.date = {
            year: today.getFullYear(),
            month: today.getMonth(),
            day: today.getDay()
        }
    }
}
