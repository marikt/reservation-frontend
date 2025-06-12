import {ServiceProvider} from './service-provider';

export class Worker extends ServiceProvider {

  public email: string;
  public phone: string;
  public zoomLink: string;
  public sequence: number;
  public notificationMsg: string;
  public elementRef: any;
}
