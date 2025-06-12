import {Component, ViewChild} from '@angular/core';
import {ReservationTemplate} from '../../../../../../../projects/notado-lib/src/lib/model/reservation-form/reservation-template';
import {Server} from '../../../../../../../projects/notado-lib/src/config/server';
import {FormService} from '../../../../../../../projects/notado-lib/src/lib/service/form.service';
import {Uploader} from '../../../../../util/uploader';
import {DashboardService} from '../../../../../service/dashboard.service';
import {AlertService} from '../../../../../../../projects/notado-lib/src/lib/service/alert.service';
import {BroadcastService} from '../../../../../../../projects/notado-lib/src/lib/service/broadcast.service';
import {HttpService} from '../../../../../../../projects/notado-lib/src/lib/service/http.service';
import {Api} from '../../../../../../../projects/notado-lib/src/lib/enum/api';
import {CropState, ResizeImageService} from '../../../../../service/resize-image.service';
import {ModalService} from '../../../../../../../projects/notado-lib/src/lib/service/modal.service';
import {PexelImg} from '../../../../../model/pexel-img';
import {PexelService} from '../../../../../service/pexel.service';
import {DomSanitizer} from '@angular/platform-browser';
import {JsonPipe, NgForOf, NgIf} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {ImageResizeComponent} from '../../../../image-resize/image-resize.component';
import {FileUploadModule} from 'ng2-file-upload';
import {FormsModule} from '@angular/forms';
import {FormConfigService} from '../../../../../service/form-config.service';
import {GoogleTranslateService} from '../../../../../service/google-translate.service';
import {LanguageService} from '../../../../../../../projects/notado-lib/src/lib/service/language.service';

@Component({
  selector: 'app-dashboard-reservation-form-gallery',
  templateUrl: './dashboard-reservation-form-gallery.component.html',
  styleUrls: ['./dashboard-reservation-form-gallery.component.scss'],
  imports: [
    NgForOf,
    TranslateModule,
    ImageResizeComponent,
    NgIf,
    FileUploadModule,
    FormsModule,
    JsonPipe
  ],
  standalone: true
})
export class DashboardReservationFormGalleryComponent extends Uploader {

  protected searchKey: string = 'wallpaper';
  public imgs: PexelImg[] = [];

  @ViewChild('templateImageUpload')
  public templateImageUpload: any;


  public templateGallery: object[] = [
    {
      'textColor': '#212529',
      'backgroundColor': 'rgba(255,255,255,0.15)',
      'backgroundTextColor': '#212529',
      'componentColor': '#757f9a',
      'formBackgroundColor': '#ffffff',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundMainColor': 'linear-gradient(to right, #757f9a, #d7dde8)',
      'backgroundImg': null,
      'backgroundImgFromGallery': true
    }, {
      'textColor': '#212529',
      'backgroundColor': 'rgba(255,255,255,0.15)',
      'backgroundTextColor': '#212529',
      'componentColor': '#c9d6ff',
      'formBackgroundColor': '#ffffff',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundMainColor': 'linear-gradient(to right, #c9d6ff, #e2e2e2)',
      'backgroundImg': null,
      'backgroundImgFromGallery': true
    }, {
      'textColor': '#212529',
      'backgroundColor': 'rgba(255,255,255,0.15)',
      'backgroundTextColor': '#212529',
      'componentColor': '#ff512f',
      'formBackgroundColor': '#ffffff',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundMainColor': 'linear-gradient(to right, #ff512f, #f09819)',
      'backgroundImg': null,
      'backgroundImgFromGallery': true
    }, {
      'textColor': '#212529',
      'backgroundColor': 'rgba(255,255,255,0.15)',
      'backgroundTextColor': '#212529',
      'componentColor': '#56ab2f',
      'formBackgroundColor': '#ffffff',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundMainColor': 'linear-gradient(to right, #56ab2f, #a8e063)',
      'backgroundImg': null,
      'backgroundImgFromGallery': true
    }, {
      'textColor': '#212529',
      'backgroundColor': 'rgba(255,255,255,0.15)',
      'backgroundTextColor': '#212529',
      'componentColor': '#ff9966',
      'formBackgroundColor': '#ffffff',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundMainColor': 'linear-gradient(to right, #ff9966, #ff5e62)',
      'backgroundImg': null,
      'backgroundImgFromGallery': true
    }, {
      'textColor': '#212529',
      'backgroundColor': 'rgba(255,255,255,0.15)',
      'backgroundTextColor': '#212529',
      'componentColor': '#ff416c',
      'formBackgroundColor': '#ffffff',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundMainColor': 'linear-gradient(to right, #ff416c, #ff4b2b)',
      'backgroundImg': null,
      'backgroundImgFromGallery': true
    }, {
      'textColor': '#212529',
      'backgroundColor': 'rgba(255,255,255,0.15)',
      'backgroundTextColor': '#212529',
      'componentColor': '#ee9ca7',
      'formBackgroundColor': '#ffffff',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundMainColor': 'linear-gradient(to right, #ee9ca7, #ffdde1)',
      'backgroundImg': null,
      'backgroundImgFromGallery': true
    }, {
      'textColor': '#212529',
      'backgroundColor': 'rgba(255,255,255,0.15)',
      'backgroundTextColor': '#212529',
      'componentColor': '#283048',
      'formBackgroundColor': '#ffffff',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundMainColor': 'linear-gradient(to right, #283048, #859398)',
      'backgroundImg': null,
      'backgroundImgFromGallery': true
    }, {
      'textColor': '#212529',
      'backgroundColor': 'rgba(255,255,255,0.15)',
      'backgroundTextColor': '#212529',
      'componentColor': '#43cea2',
      'formBackgroundColor': '#ffffff',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundMainColor': 'linear-gradient(to right, #43cea2, #185a9d)',
      'backgroundImg': null,
      'backgroundImgFromGallery': true
    }, {
      'textColor': '#212529',
      'backgroundColor': 'rgba(255,255,255,0.15)',
      'backgroundTextColor': '#212529',
      'componentColor': '#457fca',
      'formBackgroundColor': '#ffffff',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundMainColor': 'linear-gradient(to right, #457fca, #5691c8)',
      'backgroundImg': null,
      'backgroundImgFromGallery': true
    }, {
      'textColor': '#232020',
      'backgroundColor': 'rgba(255,255,255,0.15)',
      'backgroundTextColor': '#3d3636',
      'componentColor': '#BB582A',
      'formBackgroundColor': '#ffffff',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundImg': '78.jpg',
      'backgroundImgFromGallery': true
    }, {
      'textColor': '#232020',
      'backgroundColor': 'rgba(0,0,0,0.25)',
      'backgroundTextColor': '#ffffff',
      'componentColor': '#539cb2',
      'formBackgroundColor': '#ffffff',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundImg': '73.jpg',
      'backgroundImgFromGallery': true
    }, {
      'textColor': '#232020',
      'backgroundColor': 'rgba(255,255,255,0.15)',
      'backgroundTextColor': '#ffffff',
      'componentColor': '#914944',
      'formBackgroundColor': '#ffffff',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundImg': '72.jpg',
      'backgroundImgFromGallery': true
    }, {
      'textColor': '#232020',
      'backgroundColor': 'rgba(255,255,255,0.15)',
      'backgroundTextColor': '#ffffff',
      'componentColor': '#367698',
      'formBackgroundColor': '#ffffff',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundImg': '70.jpg',
      'backgroundImgFromGallery': true
    }, {
      'textColor': '#232020',
      'backgroundColor': 'rgba(255,255,255,0.15)',
      'backgroundTextColor': '#ffffff',
      'componentColor': '#68a444',
      'formBackgroundColor': '#ffffff',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundImg': '69.jpg',
      'backgroundImgFromGallery': true
    }
    , {
      'textColor': '#232020',
      'backgroundColor': 'rgba(255,255,255,0.15)',
      'backgroundTextColor': '#ffffff',
      'componentColor': '#444a4a',
      'formBackgroundColor': '#ffffff',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundImg': '68.jpg',
      'backgroundImgFromGallery': true
    },
    {
      'textColor': '#232020',
      'backgroundColor': 'rgba(255,255,255,0.15)',
      'backgroundTextColor': '#ffffff',
      'componentColor': '#33494f',
      'formBackgroundColor': '#ffffff',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundImg': '67.jpg',
      'backgroundImgFromGallery': true
    }, {
      'textColor': '#232020',
      'backgroundColor': 'rgba(255,255,255,0.15)',
      'backgroundTextColor': '#373131',
      'componentColor': '#8e6e57',
      'formBackgroundColor': '#ffffff',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundImg': '66.jpg',
      'backgroundImgFromGallery': true
    }, {
      'textColor': '#232020',
      'backgroundColor': 'rgba(0,0,0,0.15)',
      'backgroundTextColor': '#ffffff',
      'componentColor': '#5e6362',
      'formBackgroundColor': '#ffffff',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundImg': '65.jpg',
      'backgroundImgFromGallery': true
    }, {
      'textColor': '#232020',
      'backgroundColor': 'rgba(0,0,0,0.25)',
      'backgroundTextColor': '#ffffff',
      'componentColor': '#ac999e',
      'formBackgroundColor': '#ffffff',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundImg': '64.jpg',
      'backgroundImgFromGallery': true
    }, {
      'textColor': '#232020',
      'backgroundColor': 'rgba(255,255,255,0.15)',
      'backgroundTextColor': '#2f2b2b',
      'componentColor': '#c8b6b1',
      'formBackgroundColor': '#ffffff',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundImg': '63.jpg',
      'backgroundImgFromGallery': true
    }, {
      'textColor': '#232020',
      'backgroundColor': 'rgba(255,255,255,0.15)',
      'backgroundTextColor': '#ffffff',
      'componentColor': '#2d4c4c',
      'formBackgroundColor': '#ffffff',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundImg': '62.jpg',
      'backgroundImgFromGallery': true
    }, {
      'textColor': '#232020',
      'backgroundColor': 'rgba(255,255,255,0.15)',
      'backgroundTextColor': '#2f2a2a',
      'componentColor': '#ce4c41',
      'formBackgroundColor': '#ffffff',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundImg': '61.jpg',
      'backgroundImgFromGallery': true
    }, {
      'textColor': '#232020',
      'backgroundColor': 'rgba(255,255,255,0.38)',
      'backgroundTextColor': '#332f2f',
      'componentColor': '#e0cc42',
      'formBackgroundColor': '#ffffff',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundImg': '60.jpg',
      'backgroundImgFromGallery': true
    }, {
      'textColor': '#232020',
      'backgroundColor': 'rgba(255,255,255,0.46)',
      'backgroundTextColor': '#252323',
      'componentColor': '#527fa5',
      'formBackgroundColor': '#ffffff',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundImg': '59.jpg',
      'backgroundImgFromGallery': true
    }, {
      'textColor': '#232020',
      'backgroundColor': 'rgba(0,0,0,0.28)',
      'backgroundTextColor': '#ffffff',
      'componentColor': '#9a843b',
      'formBackgroundColor': '#ffffff',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundImg': '58.jpg',
      'backgroundImgFromGallery': true
    },
    {
      'textColor': '#232020',
      'backgroundColor': 'rgba(255,255,255,0.15)',
      'backgroundTextColor': '#ffffff',
      'componentColor': '#37455c',
      'formBackgroundColor': '#ffffff',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundImg': '57.jpg',
      'backgroundImgFromGallery': true
    },

    {
      'textColor': '#232020',
      'backgroundColor': 'rgba(255,255,255,0.15)',
      'backgroundTextColor': '#2f2c2c',
      'componentColor': '#6886be',
      'formBackgroundColor': '#ffffff',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundImg': '56.jpg',
      'backgroundImgFromGallery': true
    }, {
      'textColor': '#232020',
      'backgroundColor': 'rgba(255,255,255,0.15)',
      'backgroundTextColor': '#ffffff',
      'componentColor': '#232020',
      'formBackgroundColor': '#ffffff',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundImg': '75.jpg',
      'backgroundImgFromGallery': true
    }, {
      'textColor': '#232020',
      'backgroundColor': 'rgba(255,255,255,0.15)',
      'backgroundTextColor': '#312b2b',
      'componentColor': '#312b2b',
      'formBackgroundColor': '#ffffff',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundImg': '74.jpg',
      'backgroundImgFromGallery': true
    }, {
      'textColor': '#232020',
      'backgroundColor': 'rgba(255,255,255,0.15)',
      'backgroundTextColor': '#ffffff',
      'componentColor': '#4c8057',
      'formBackgroundColor': '#ffffff',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundImg': '55.jpg',
      'backgroundImgFromGallery': true
    }, {
      'textColor': '#232020',
      'backgroundColor': 'rgba(0,0,0,0.21)',
      'backgroundTextColor': '#ffffff',
      'componentColor': '#855c93',
      'formBackgroundColor': '#ffffff',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundImg': '54.jpg',
      'backgroundImgFromGallery': true
    }, {
      'textColor': '#232020',
      'backgroundColor': 'rgba(255,255,255,0.15)',
      'backgroundTextColor': '#ffffff',
      'componentColor': '#7a493b',
      'formBackgroundColor': '#ffffff',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundImg': '53.jpg',
      'backgroundImgFromGallery': true
    },
    {
      'textColor': '#232020',
      'backgroundColor': 'rgba(255,255,255,0.15)',
      'backgroundTextColor': '#211f1f',
      'componentColor': '#8ac8da',
      'formBackgroundColor': '#ffffff',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundImg': '52.jpg',
      'backgroundImgFromGallery': true
    }, {
      'textColor': '#232020',
      'backgroundColor': 'rgba(0,0,0,0.21)',
      'backgroundTextColor': '#ffffff',
      'componentColor': '#855c93',
      'formBackgroundColor': '#ffffff',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundImg': '50.jpg',
      'backgroundImgFromGallery': true
    }, {
      'textColor': '#232020',
      'backgroundColor': 'rgba(255,255,255,0.15)',
      'backgroundTextColor': '#211f1f',
      'componentColor': '#776a4f',
      'formBackgroundColor': '#ffffff',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundImg': '49.jpg',
      'backgroundImgFromGallery': true
    }, {
      'textColor': '#232020',
      'backgroundColor': 'rgba(255,255,255,0.69)',
      'backgroundTextColor': '#211f1f',
      'componentColor': '#263844',
      'formBackgroundColor': '#ffffff',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundImg': '48.jpg',
      'backgroundImgFromGallery': true
    }, {
      'textColor': '#232020',
      'backgroundColor': 'rgba(255,255,255,0.15)',
      'backgroundTextColor': '#ffffff',
      'componentColor': '#bb3539',
      'formBackgroundColor': '#ffffff',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundImg': '47.jpg',
      'backgroundImgFromGallery': true
    }, {
      'textColor': '#232020',
      'backgroundColor': 'rgba(0,0,0,0.21)',
      'backgroundTextColor': '#ffffff',
      'componentColor': '#ebd745',
      'formBackgroundColor': '#ffffff',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundImg': '46.jpg',
      'backgroundImgFromGallery': true
    }, {
      'textColor': '#232020',
      'backgroundColor': 'rgba(255,255,255,0.15)',
      'backgroundTextColor': '#211f1f',
      'componentColor': '#cb9ab8',
      'formBackgroundColor': '#ffffff',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundImg': '45.jpg',
      'backgroundImgFromGallery': true
    }, {
      'textColor': '#232020',
      'backgroundColor': 'rgba(255,255,255,0.46)',
      'backgroundTextColor': '#211f1f',
      'componentColor': '#627e84',
      'formBackgroundColor': '#ffffff',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundImg': '44.jpg',
      'backgroundImgFromGallery': true
    }, {
      'textColor': '#232020',
      'backgroundColor': 'rgba(255,255,255,0.15)',
      'backgroundTextColor': '#211f1f',
      'componentColor': '#cac3ba',
      'formBackgroundColor': '#ffffff',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundImg': '43.jpg',
      'backgroundImgFromGallery': true
    }, {
      'textColor': '#232020',
      'backgroundColor': 'rgba(255,255,255,0.15)',
      'backgroundTextColor': '#211f1f',
      'componentColor': '#c7a66c',
      'formBackgroundColor': '#ffffff',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundImg': '42.jpg',
      'backgroundImgFromGallery': true
    },
    {
      'textColor': '#232020',
      'backgroundColor': 'rgba(255,255,255,0.2)',
      'backgroundTextColor': '#211f1f',
      'componentColor': '#418088',
      'formBackgroundColor': '#ffffff',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundImg': '41.jpg',
      'backgroundImgFromGallery': true
    },
    {
      'textColor': 'rgb(89, 89, 89)',
      'backgroundColor': 'rgba(0,0,0,0.2)',
      'backgroundTextColor': '#ffffff',
      'componentColor': '#944726',
      'formBackgroundColor': 'rgba(255,255,255)',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundImg': '40.jpg',
      'backgroundImgFromGallery': true
    },
    {
      'textColor': '#9f2e70',
      'backgroundColor': 'rgba(255,246,251,0.3)',
      'backgroundTextColor': '#9f2e70',
      'componentColor': '#ff50b7',
      'formBackgroundColor': '#fff6fb',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundImg': '33.jpg',
      'backgroundImgFromGallery': true
    }, {
      'textColor': '#622d0e',
      'backgroundColor': 'rgba(255,255,255,0.24)',
      'backgroundTextColor': '#622d0e',
      'componentColor': '#622d0e',
      'formBackgroundColor': '#eacebe',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundImg': '32.jpg',
      'backgroundImgFromGallery': true
    }, {

      'textColor': '#560f25',
      'backgroundColor': 'rgba(255,255,255,0.31)',
      'backgroundTextColor': '#560f25',
      'componentColor': '#560f25',
      'formBackgroundColor': '#e2cbd2',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundImg': '31.jpg',
      'backgroundImgFromGallery': true
    }, {
      'textColor': '#331f04',
      'backgroundColor': 'rgba(255,255,255,0.31)',
      'backgroundTextColor': '#331f04',
      'componentColor': '#7f5318',
      'formBackgroundColor': 'rgba(205,196,184)',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundImg': '30.jpg',
      'backgroundImgFromGallery': true
    }, {
      'textColor': '#523716',
      'backgroundColor': 'rgba(255,255,255,0)',
      'backgroundTextColor': '#523716',
      'componentColor': '#c3af97',
      'formBackgroundColor': '#eeedeb',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundImg': '29.jpg',
      'backgroundImgFromGallery': true
    }, {
      'textColor': '#394867',
      'backgroundColor': 'rgba(126,136,157,0.57)',
      'backgroundTextColor': '#394867',
      'componentColor': '#394867',
      'formBackgroundColor': 'rgba(241,246,249)',
      'textButtonColor': '#F1F6F9',
      'buttonRadius': '50px',
      'backgroundImg': '28.jpg',
      'backgroundImgFromGallery': true
    }, {
      'textColor': '#394867',
      'backgroundColor': 'rgba(126,136,157,0.57)',
      'backgroundTextColor': '#394867',
      'componentColor': '#394867',
      'formBackgroundColor': 'rgba(241,246,249)',
      'textButtonColor': '#F1F6F9',
      'buttonRadius': '50px',
      'backgroundImg': '27.png',
      'backgroundImgFromGallery': true
    }, {
      'textColor': '#394867',
      'backgroundColor': 'rgba(57,72,103,0.36)',
      'backgroundTextColor': '#ffffff',
      'componentColor': '#394867',
      'formBackgroundColor': '#f5f6f8',
      'textButtonColor': '#F1F6F9',
      'buttonRadius': '50px',
      'backgroundImg': '26.png',
      'backgroundImgFromGallery': true
    }, {
      'textColor': '#005f8d',
      'backgroundColor': 'rgba(57,72,103,0)',
      'backgroundTextColor': '#005f8d',
      'componentColor': '#005f8d',
      'formBackgroundColor': '#f5f6f8',
      'textButtonColor': '#F1F6F9',
      'buttonRadius': '50px',
      'backgroundImg': '25.png',
      'backgroundImgFromGallery': true
    }, {
      'textColor': '#394867',
      'backgroundColor': 'rgba(224,224,224,0.3)',
      'backgroundTextColor': '#394867',
      'componentColor': '#394867',
      'formBackgroundColor': '#e9e9eb',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundImg': '24.jpg',
      'backgroundImgFromGallery': true
    }, {
      'textColor': '#394867',
      'backgroundColor': 'rgba(57, 72, 103, 0.57)',
      'backgroundTextColor': '#F1F6F9',
      'componentColor': '#394867',
      'formBackgroundColor': '#F1F6F9',
      'textButtonColor': '#F1F6F9',
      'buttonRadius': '50px',
      'backgroundImg': '23.png',
      'backgroundImgFromGallery': true
    }, {
      'textColor': '#394867',
      'backgroundColor': 'rgba(57, 72, 103, 0.57)',
      'backgroundTextColor': '#F1F6F9',
      'componentColor': '#394867',
      'formBackgroundColor': '#F1F6F9',
      'textButtonColor': '#F1F6F9',
      'buttonRadius': '50px',
      'backgroundImg': '22.png',
      'backgroundImgFromGallery': true
    }, {
      'textColor': '#394867',
      'backgroundColor': 'rgba(57, 72, 103, 0.57)',
      'backgroundTextColor': '#F1F6F9',
      'componentColor': '#394867',
      'formBackgroundColor': '#F1F6F9',
      'textButtonColor': '#F1F6F9',
      'buttonRadius': '50px',
      'backgroundImg': '21.png',
      'backgroundImgFromGallery': true
    }, {
      'textColor': '#394867',
      'backgroundColor': 'rgba(57, 72, 103, 0.57)',
      'backgroundTextColor': '#F1F6F9',
      'componentColor': '#394867',
      'formBackgroundColor': '#F1F6F9',
      'textButtonColor': '#F1F6F9',
      'buttonRadius': '50px',
      'backgroundImg': '1.png',
      'backgroundImgFromGallery': true
    }, {
      'textColor': '#394867',
      'backgroundColor': 'rgba(57, 72, 103, 0.57)',
      'backgroundTextColor': '#F1F6F9',
      'componentColor': '#394867',
      'formBackgroundColor': '#F1F6F9',
      'textButtonColor': '#F1F6F9',
      'buttonRadius': '50px',
      'backgroundImg': '3.png',
      'backgroundImgFromGallery': true
    },
    {
      'textColor': 'rgb(89, 89, 89)',
      'backgroundColor': 'rgba(143,0,71,0.64)',
      'backgroundTextColor': 'white',
      'componentColor': '#c84989',
      'formBackgroundColor': 'rgb(255,255,255)',
      'textButtonColor': 'white',
      'buttonRadius': '50px',
      'backgroundImg': '2.png',
      'backgroundImgFromGallery': true
    },
    {
      'textColor': 'rgb(89, 89, 89)',
      'backgroundColor': 'rgba(88,88,88,0.51)',
      'backgroundTextColor': 'white',
      'componentColor': '#0c92b9',
      'formBackgroundColor': 'rgb(255,255,255)',
      'textButtonColor': 'white',
      'buttonRadius': '50px',
      'backgroundImg': '4.png',
      'backgroundImgFromGallery': true
    },
    {
      'textColor': 'rgb(89, 89, 89)',
      'backgroundColor': 'rgba(88,88,88,0)',
      'backgroundTextColor': 'white',
      'componentColor': '#d896b2',
      'formBackgroundColor': 'rgb(255,255,255)',
      'textButtonColor': 'white',
      'buttonRadius': '50px',
      'backgroundImg': '5.png',
      'backgroundImgFromGallery': true
    },
    {
      'textColor': 'rgb(89, 89, 89)',
      'backgroundColor': 'rgba(88,88,88,0.51)',
      'backgroundTextColor': 'white',
      'componentColor': '#616a84',
      'formBackgroundColor': 'rgb(255,255,255)',
      'textButtonColor': 'white',
      'buttonRadius': '50px',
      'backgroundImg': '6.png',
      'backgroundImgFromGallery': true
    },
    {
      'textColor': 'rgb(89, 89, 89)',
      'backgroundColor': 'rgba(255,255,255,0.71)',
      'backgroundTextColor': 'rgb(89, 89, 89)',
      'componentColor': '#3a324f',
      'formBackgroundColor': 'rgba(255,255,255)',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundImg': '7.png',
      'backgroundImgFromGallery': true
    },
    {
      'textColor': 'rgb(89, 89, 89)',
      'backgroundColor': 'rgb(0,0,0,0.36)',
      'backgroundTextColor': 'white',
      'componentColor': '#e1a249',
      'formBackgroundColor': 'rgb(255,255,255)',
      'textButtonColor': 'white',
      'buttonRadius': '50px',
      'backgroundImg': '8.png',
      'backgroundImgFromGallery': true
    },
    {
      'textColor': 'rgb(89, 89, 89)',
      'backgroundColor': 'rgba(0,0,0,0.24)',
      'backgroundTextColor': 'white',
      'componentColor': '#0bc67a',
      'formBackgroundColor': 'rgb(255,255,255)',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundImg': '10.png',
      'backgroundImgFromGallery': true
    }

  ];

  constructor(
    public alertService: AlertService,
    public broadcastService: BroadcastService,
    public http: HttpService,
    public formService: FormService,
    public resizeImageService: ResizeImageService,
    public modalService: ModalService,
    public dashboardService: DashboardService,
    private pexelService: PexelService,
    private sanitizer: DomSanitizer,
    private formConfigService: FormConfigService,
    private googleTranslateService: GoogleTranslateService,
    private languageService: LanguageService,
    public server: Server) {
    super(alertService, broadcastService, http);

  }

  ngOnInit(): void {
    this.resizeImageService.reset();
    this.resizeImageService.onCropCallback = (img) => {
      this.modalService.close();
      const url = Api.TEMPLATE + '/' + this.dashboardService.template.id + '/file';
      this.http.postFile(url, img, () => {
        this.modalService.close();
        this.resizeImageService.reset();
        this.http.get(Api.TEMPLATE + '/' + this.dashboardService.template.id, (template: ReservationTemplate) => {
          this.formService.template.backgroundImg = template.backgroundImg;
          this.formService.template.fullPathImg = template.fullPathImg;
          this.formService.template.backgroundImgFromGallery = false;
        });
      });
    };
    this.initUploaderForCroper((imgUrl) => {
      this.resizeImageService.state = CropState.IMG_SELECTED;
      this.resizeImageService.setImgUrl(imgUrl);
    }, 900);
  }

  public userTemplate(template: ReservationTemplate): void {
    this.formConfigService.refreshBackground();
    this.formService.template.backgroundVideo = null;
    this.formService.template.backgroundPreviewVideo = null;
    this.formService.template.textColor = template.textColor;
    this.formService.template.backgroundColor = template.backgroundColor;
    this.formService.template.backgroundMainColor = template.backgroundMainColor;
    this.formService.template.backgroundTextColor = template.backgroundTextColor;
    this.formService.template.componentColor = template.componentColor;
    this.formService.template.formBackgroundColor = template.formBackgroundColor;
    this.formService.template.textButtonColor = template.textButtonColor;
    this.formService.template.buttonRadius = template.buttonRadius;
    this.formService.template.backgroundImg = template.backgroundImg;
    this.formService.template.backgroundImgFromGallery = template.backgroundImgFromGallery;
    if (!template.backgroundImgFromGallery) {
      this.formService.template.fullPathImg = this.formService.template.fullPathScreenshot;
    }

  }

  public getImagePath(template: ReservationTemplate): string {
    if (template.backgroundImgFromGallery) {
      return '../../../../../../resources/form-gallery/' + template.backgroundImg;
    }
    return this.server.SERVER + this.formService.template.fullPathScreenshot;
  }

  public openImageModal(): void {
    this.modalService.open(this.templateImageUpload, {size: 'lg'});
    this.searchForPexelImg();
  }

  public selectPexelImg(imgUrl: string): void {
    this.resizeImageService.state = CropState.IMG_SELECTED;
    this.resizeImageService.setImgUrl(imgUrl);
  }

  public searchForPexelImg() {
    this.googleTranslateService.translate(this.searchKey, this.languageService.language, (searchKey: string) => {
      this.pexelService.getImagesPortrait(searchKey, (imgs: PexelImg[]) => {
        this.imgs = imgs;
      }, 300);
    });
  }

}
