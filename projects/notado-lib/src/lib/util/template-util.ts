import {FormWindowName} from './form-window-name';
import {ReservationWindow} from '../model/reservation-form/reservation-window';
import {ReservationWindowConfig} from '../model/reservation-form/reservation-window-config';
import {ReservationTemplate} from '../model/reservation-form/reservation-template';

export class TemplateUtil {

  public static getWindow(windowName: FormWindowName, template: ReservationTemplate): ReservationWindow {
    if (!template) {
      return null;
    }
    for (const window of template.windows) {
      if (window.name === windowName) {
        if (!window.config) {
          window.config = new ReservationWindowConfig();
        }
        return window;
      }
    }
  }

  public static getConfig(windowName: FormWindowName, template: ReservationTemplate): ReservationWindowConfig {
    if (!template) {
      return null;
    }
    for (const window of template.windows) {
      if (window.name === windowName) {
        if (!window.config) {
          window.config = new ReservationWindowConfig();
        }
        return window.config;
      }
    }
  }

}
