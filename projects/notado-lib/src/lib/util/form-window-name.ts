import {ReservationWindow} from '../model/reservation-form/reservation-window';

export enum FormWindowName {

  BUSINESS_BRANCH = 'BUSINESS_BRANCH',
  SERVICE_GROUP = 'SERVICE_GROUP',
  SERVICE = 'SERVICE',
  SERVICE_DURATION = 'SERVICE_DURATION',
  DATE = 'DATE',
  VOUCHER = 'VOUCHER',
  CUSTOM = 'CUSTOM',
  NOTE = 'NOTE',
  CONTACT = 'CONTACT',
  SUMMARY = 'SUMMARY',
  THANKS = 'THANKS'
}

export class FormWindowUtil {

  public static prevCard(windowName: FormWindowName): FormWindowName {
    let prevState: FormWindowName = null;
    for (const name in FormWindowName) {
      if (name === windowName) {
        return prevState;
      }
      // @ts-ignore
      prevState = name;
    }
  }

  public static nextCard(windowName: FormWindowName): FormWindowName {
    let hasCurrent = false;
    for (const name in FormWindowName) {
      if (hasCurrent) {
        // @ts-ignore
        return name;
      }
      if (name === windowName) {
        hasCurrent = true;
      }
    }
  }

  public static getIdx(windows: ReservationWindow[], windowName: FormWindowName): number {

    if (!windows || windows.length <= 0) {
      return -1;
    }

    for (let i = 0; i < windows.length; i++) {
      if (windows[i].name === windowName) {
        return i;
      }
    }
    if (windowName === FormWindowName.CUSTOM) {
      return this.getIdx(windows, FormWindowName.CONTACT); // for case that CUSTOM window is disabled get the next one
    }
    return -1;
  }
}



