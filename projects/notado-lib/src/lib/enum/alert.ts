export class Alert {

    public static SUCCESS: string = 'success';
    public static ERROR: string = 'danger';
    public static WARNING: string = 'warning';
    public static SECONDARY: string = 'secondary';
    public static INFO: string = 'info';


    public msg: string;
    public type: string;


    constructor(msg: string, type?: string) {
        this.msg = msg;
        if (type) {
            this.type = type;
        } else {
            this.type = Alert.SUCCESS;
        }

    }

}
