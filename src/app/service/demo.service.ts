import {Injectable} from '@angular/core';
import {ReservationDemo} from '../model/reservation-demo';
import {FormWindowName} from '../../../projects/notado-lib/src/lib/util/form-window-name';

@Injectable({
  providedIn: 'root'
})
export class DemoService {
  public showFrame: boolean = false;
  public modalState: FormWindowName;
  public label: string;
  public reservation: ReservationDemo;

  constructor() {
    this.reset();
  }

  public getDuration(): string {
    switch (this.reservation.service) {
      case 'Manikůra':
        return '45 min';
      case 'Pedikúra':
        return '20 min';
      case 'Střih':
        return '1 h';
    }
    return '45 min';
  }

  public reset(): void {
    this.modalState = FormWindowName.SERVICE;
    this.updateLabel();

    this.reservation = new ReservationDemo();
    this.reservation.time = '9:30';
    const today: Date = new Date();
    this.reservation.date = {
      year: today.getFullYear(),
      month: today.getMonth(),
      day: today.getDay()
    };
    this.reservation.worker = 'DEMO.W_2';
    this.reservation.service = 'DEMO.BARBER.S_1';
    this.reservation.name = 'Amy Nova';
    this.reservation.email = 'amy.nova@gmail.com';
  }

  public previousState(): void {

    switch (this.modalState) {

      case FormWindowName.SERVICE:
        this.modalState = FormWindowName.SERVICE;
        break;

      case FormWindowName.DATE:
        this.modalState = FormWindowName.SERVICE;
        break;

      case FormWindowName.CONTACT:
        this.modalState = FormWindowName.DATE;
        break;


      case FormWindowName.SUMMARY:
        this.modalState = FormWindowName.CONTACT;
        break;

      case FormWindowName.THANKS:
        this.modalState = FormWindowName.SUMMARY;
        break;
    }

    this.updateLabel();
  }

  public nextState(): void {
    switch (this.modalState) {

      case FormWindowName.SERVICE:
        this.modalState = FormWindowName.DATE;
        break;

      case FormWindowName.DATE:
        this.modalState = FormWindowName.CONTACT;
        break;

      case FormWindowName.CONTACT:
        this.modalState = FormWindowName.SUMMARY;
        break;

      case FormWindowName.SUMMARY:
        this.modalState = FormWindowName.THANKS;
        break;

      case FormWindowName.THANKS:
        this.modalState = FormWindowName.CONTACT;
        break;
    }
    this.updateLabel();

  }

  private updateLabel() {
    switch (this.modalState) {

      case FormWindowName.CONTACT:
        this.label = 'FORM.CARD.CONTACT';
        break;

      case FormWindowName.SERVICE:
        this.label = 'FORM.CARD.SERVICE';
        break;

      case FormWindowName.DATE:
        this.label = 'FORM.CARD.DATE';
        break;

      case FormWindowName.SUMMARY:
        this.label = 'FORM.CARD.SUMMARY';
        break;

      case FormWindowName.THANKS:
        this.label = '';
        break;
    }
  }


}
