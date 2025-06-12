import {ReservationWindow} from './reservation-window';
import {FormType} from '../../util/form-type';

export class ReservationTemplate {

  public id: number;
  public textColor: string;
  public backgroundColor: string;
  public backgroundMainColor: string;
  public backgroundVideo: string;
  public backgroundPreviewVideo: string;
  public componentColor: string;
  public formBackgroundColor: string;
  public textButtonColor: string;
  public backgroundTextColor: string;
  public buttonRadius: string;
  public margin: Margin;
  public backgroundImg: string;
  public backgroundImgFromGallery: boolean;
  public fullPathImg: string;
  public windows: ReservationWindow[];
  public removedWindows: number[] = [];
  public fullPathScreenshot: string;
  public type: FormType;
  public highlightComponentForEditor: HighlightComponentForEditor;
  public logo: string;
  public businessName: string;
  public serviceCardColor: string;
  public serviceCardTextColor: string;
  public font: string;
  public fontSizeMainLabel: number;
  public fontSizeServiceLabel: number;
  public fontSizeServiceDescription: number;
  public showOpeningHours: boolean;
  public rightCustomMsg: string;

  constructor() {
  }

}

export class HighlightComponentForEditor {
  public background: boolean;
  public backgroundMainColor: boolean;
  public formBackground: boolean;
  public text: boolean;
  public button: boolean;
  public serviceCardColor: boolean;
  public serviceCardTextColor: boolean;
}

export enum Margin {
  BIG = 'BIG',
  SMALL = 'SMALL'
}
