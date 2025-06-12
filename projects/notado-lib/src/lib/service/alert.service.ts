import {Injectable} from '@angular/core';
import {Alert} from '../enum/alert';


@Injectable({
    providedIn: 'root'
})
export class AlertService {

    private static TOAST_DELAY: number = 4000;
    private static ALERT_DELAY: number = 4000;

    // public vcr: ViewContainerRef;s
    public alerts: Alert[] = [];
    public toasts: Alert[] = [];

    constructor() {
    }

    public addSuccess(msg: string) {
        const alert: Alert = new Alert(msg, Alert.SUCCESS);
        this.push(alert);
    }

    public addError(msg: string) {
        const alert: Alert = new Alert(msg, Alert.ERROR);
        this.push(alert);
    }

    public addWarning(msg: string) {
        const alert: Alert = new Alert(msg, Alert.WARNING);
        this.push(alert);
    }

    public addInfo(msg: string) {
      const alert: Alert = new Alert(msg, Alert.INFO);
      this.pushToast(alert);
      //
      // let alert: Alert = new Alert(msg, Alert.INFO);
      //   this.push(alert);
    }

    public addSuccessToast(msg: string) {
        const alert: Alert = new Alert(msg, Alert.SUCCESS);
        this.pushToast(alert);
    }

    public addErrorToast(msg: string) {
        const alert: Alert = new Alert(msg, Alert.ERROR);
        this.pushToast(alert);
    }

    public addWarningToast(msg: string) {
        const alert: Alert = new Alert(msg, Alert.WARNING);
        this.pushToast(alert);
    }

    private push(alert: Alert): void {
        this.alerts.push(alert);
        setTimeout(
            () => {
                this.alerts = [];
            },
            AlertService.ALERT_DELAY
        );
    }

    private pushToast(alert: Alert): void {
        this.toasts.push(alert);
        setTimeout(
            () => {
                this.toasts = [];
            },
            AlertService.TOAST_DELAY
        );
    }

    public closeAlert(alert: Alert) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }

}
