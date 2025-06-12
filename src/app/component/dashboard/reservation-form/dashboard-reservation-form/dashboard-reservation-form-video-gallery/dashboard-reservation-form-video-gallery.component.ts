import {Component, OnInit, ViewChild} from '@angular/core';
import {ReservationTemplate} from '../../../../../../../projects/notado-lib/src/lib/model/reservation-form/reservation-template';
import {Server} from '../../../../../../../projects/notado-lib/src/config/server';
import {FormService} from '../../../../../../../projects/notado-lib/src/lib/service/form.service';
import {DashboardService} from '../../../../../service/dashboard.service';
import {AlertService} from '../../../../../../../projects/notado-lib/src/lib/service/alert.service';
import {BroadcastService} from '../../../../../../../projects/notado-lib/src/lib/service/broadcast.service';
import {HttpService} from '../../../../../../../projects/notado-lib/src/lib/service/http.service';
import {ResizeImageService} from '../../../../../service/resize-image.service';
import {ModalService} from '../../../../../../../projects/notado-lib/src/lib/service/modal.service';
import {PexelService} from '../../../../../service/pexel.service';
import {DomSanitizer} from '@angular/platform-browser';
import {JsonPipe, NgForOf, NgIf} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {ImageResizeComponent} from '../../../../image-resize/image-resize.component';
import {FileUploadModule} from 'ng2-file-upload';
import {FormsModule} from '@angular/forms';
import {FormConfigService} from '../../../../../service/form-config.service';
import {PexelVideo} from '../../../../../model/pexel-video';
import {GoogleTranslateService} from '../../../../../service/google-translate.service';
import {LanguageService} from '../../../../../../../projects/notado-lib/src/lib/service/language.service';

@Component({
  selector: 'app-dashboard-reservation-form-video-gallery',
  templateUrl: './dashboard-reservation-form-video-gallery.component.html',
  styleUrls: ['./dashboard-reservation-form-video-gallery.component.scss'],
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
export class DashboardReservationFormVideoGalleryComponent implements OnInit {

  protected searchKey: string = 'hory';
  public videos: PexelVideo[] = [];

  @ViewChild('templateVideoSearch')
  public templateVideoSearch: any;


  public templateGallery: object[] = [
    {
      'textColor': 'rgb(89, 89, 89)',
      'backgroundColor': 'rgba(0,0,0,0.24)',
      'backgroundTextColor': 'white',
      'componentColor': '#EB7958',
      'formBackgroundColor': 'rgb(255,255,255)',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundPreviewVideoSm': 'https://images.pexels.com/videos/5147455/pictures/preview-0.jpeg',
      'backgroundPreviewVideo': 'https://images.pexels.com/videos/5147455/beach-hua-hin-sunrise-thaliand-5147455.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=630',
      'backgroundVideo': 'https://videos.pexels.com/video-files/5147455/5147455-hd_1080_1920_30fps.mp4'
    }, {
      'textColor': 'rgb(89, 89, 89)',
      'backgroundColor': 'rgba(0,0,0,0.24)',
      'backgroundTextColor': 'white',
      'componentColor': '#494949',
      'formBackgroundColor': 'rgb(255,255,255)',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundPreviewVideoSm': 'https://images.pexels.com/videos/4623748/pexels-photo-4623748.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=630',
      'backgroundPreviewVideo': 'https://images.pexels.com/videos/4623748/pexels-photo-4623748.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=630',
      'backgroundVideo': 'https://videos.pexels.com/video-files/4623748/4623748-hd_1080_1922_24fps.mp4'
    }, {
      'textColor': 'rgb(89, 89, 89)',
      'backgroundColor': 'rgba(0,0,0,0.24)',
      'backgroundTextColor': 'white',
      'componentColor': '#262723',
      'formBackgroundColor': 'rgb(255,255,255)',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundPreviewVideoSm': 'https://images.pexels.com/videos/3998514/pictures/preview-0.jpeg',
      'backgroundPreviewVideo': 'https://images.pexels.com/videos/3998514/pexels-photo-3998514.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=630',
      'backgroundVideo': 'https://videos.pexels.com/video-files/3998514/3998514-hd_1080_2048_25fps.mp4'
    }, {
      'textColor': 'rgb(89, 89, 89)',
      'backgroundColor': 'rgba(0,0,0,0.24)',
      'backgroundTextColor': 'white',
      'componentColor': '#090502',
      'formBackgroundColor': 'rgb(255,255,255)',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundPreviewVideoSm': 'https://images.pexels.com/videos/3998444/pictures/preview-0.jpeg',
      'backgroundPreviewVideo': 'https://images.pexels.com/videos/3998444/pexels-photo-3998444.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=630',
      'backgroundVideo': 'https://videos.pexels.com/video-files/3998444/3998444-hd_1080_2048_25fps.mp4'
    }, {
      'textColor': 'rgb(89, 89, 89)',
      'backgroundColor': 'rgba(0,0,0,0.24)',
      'backgroundTextColor': 'white',
      'componentColor': '#6B7D4C',
      'formBackgroundColor': 'rgb(255,255,255)',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundPreviewVideoSm': 'https://images.pexels.com/videos/4625816/pictures/preview-0.jpeg',
      'backgroundPreviewVideo': 'https://images.pexels.com/videos/4625816/bare-feet-basket-cat-child-4625816.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=630',
      'backgroundVideo': 'https://videos.pexels.com/video-files/4625816/4625816-hd_1080_1920_30fps.mp4'
    }, {
      'textColor': 'rgb(89, 89, 89)',
      'backgroundColor': 'rgba(0,0,0,0.24)',
      'backgroundTextColor': 'white',
      'componentColor': '#025946',
      'formBackgroundColor': 'rgb(255,255,255)',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundPreviewVideoSm': 'https://images.pexels.com/videos/6734777/pictures/preview-0.jpeg',
      'backgroundPreviewVideo': 'https://images.pexels.com/videos/6734777/aerial-beach-waves-drone-video-ocean-6734777.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=630',
      'backgroundVideo': 'https://videos.pexels.com/video-files/6734777/6734777-hd_1080_1920_24fps.mp4'
    }, {
      'textColor': 'rgb(89, 89, 89)',
      'backgroundColor': 'rgba(0,0,0,0.24)',
      'backgroundTextColor': 'white',
      'componentColor': '#0B2721',
      'formBackgroundColor': 'rgb(255,255,255)',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundPreviewVideoSm': 'https://images.pexels.com/videos/8438335/pictures/preview-0.jpeg',
      'backgroundPreviewVideo': 'https://images.pexels.com/videos/8438335/pexels-photo-8438335.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=630',
      'backgroundVideo': 'https://videos.pexels.com/video-files/8438335/8438335-hd_1080_1920_30fps.mp4'
    }, {
      'textColor': 'rgb(89, 89, 89)',
      'backgroundColor': 'rgba(0,0,0,0.24)',
      'backgroundTextColor': 'white',
      'componentColor': '#AB6C79',
      'formBackgroundColor': 'rgb(255,255,255)',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundPreviewVideoSm': 'https://images.pexels.com/videos/6202759/pictures/preview-0.jpeg',
      'backgroundPreviewVideo': 'https://images.pexels.com/videos/6202759/pexels-photo-6202759.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=630',
      'backgroundVideo': 'https://videos.pexels.com/video-files/6202759/6202759-hd_1080_1920_30fps.mp4'
    }, {
      'textColor': 'rgb(89, 89, 89)',
      'backgroundColor': 'rgba(0,0,0,0.24)',
      'backgroundTextColor': 'white',
      'componentColor': '#2D291A',
      'formBackgroundColor': 'rgb(255,255,255)',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundPreviewVideoSm': 'https://images.pexels.com/videos/6099173/pictures/preview-0.jpeg',
      'backgroundPreviewVideo': 'https://images.pexels.com/videos/6099173/at-the-beach-beach-resort-beach-restaurant-coconut-trees-6099173.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=630',
      'backgroundVideo': 'https://videos.pexels.com/video-files/6099173/6099173-hd_1080_1920_30fps.mp4'
    }, {
      'textColor': 'rgb(89, 89, 89)',
      'backgroundColor': 'rgba(0,0,0,0.24)',
      'backgroundTextColor': 'white',
      'componentColor': '#46532A',
      'formBackgroundColor': 'rgb(255,255,255)',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundPreviewVideoSm': 'https://images.pexels.com/videos/3883706/pictures/preview-0.jpeg',
      'backgroundPreviewVideo': 'https://images.pexels.com/videos/3883706/pexels-photo-3883706.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=630',
      'backgroundVideo': 'https://videos.pexels.com/video-files/3883706/3883706-hd_1080_1920_30fps.mp4'
    }, {
      'textColor': 'rgb(89, 89, 89)',
      'backgroundColor': 'rgba(0,0,0,0.24)',
      'backgroundTextColor': 'white',
      'componentColor': '#AD570F',
      'formBackgroundColor': 'rgb(255,255,255)',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundPreviewVideoSm': 'https://images.pexels.com/videos/6190918/pictures/preview-0.jpeg',
      'backgroundPreviewVideo': 'https://images.pexels.com/videos/6190918/ambience-campfire-dark-night-fire-6190918.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=630',
      'backgroundVideo': 'https://videos.pexels.com/video-files/6190918/6190918-hd_1080_1920_30fps.mp4'
    }, {
      'textColor': 'rgb(89, 89, 89)',
      'backgroundColor': 'rgba(0,0,0,0.24)',
      'backgroundTextColor': 'white',
      'componentColor': '#C88414',
      'formBackgroundColor': 'rgb(255,255,255)',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundPreviewVideoSm': 'https://images.pexels.com/videos/5896379/pictures/preview-0.jpeg',
      'backgroundPreviewVideo': 'https://images.pexels.com/videos/5896379/aerial-footage-aerial-fotoage-aerial-video-aerial-view-5896379.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=630',
      'backgroundVideo': 'https://videos.pexels.com/video-files/5896379/5896379-hd_1080_1920_24fps.mp4'
    }, {
      'textColor': 'rgb(89, 89, 89)',
      'backgroundColor': 'rgba(0,0,0,0.24)',
      'backgroundTextColor': 'white',
      'componentColor': '#502811',
      'formBackgroundColor': 'rgb(255,255,255)',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundPreviewVideoSm': 'https://images.pexels.com/videos/2313069/pictures/preview-0.jpeg',
      'backgroundPreviewVideo': 'https://images.pexels.com/videos/2313069/free-video-2313069.jpg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=630',
      'backgroundVideo': 'https://videos.pexels.com/video-files/2313069/2313069-hd_1080_1510_30fps.mp4'
    }, {
      'textColor': 'rgb(89, 89, 89)',
      'backgroundColor': 'rgba(0,0,0,0.24)',
      'backgroundTextColor': 'white',
      'componentColor': '#2F2B24',
      'formBackgroundColor': 'rgb(255,255,255)',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundPreviewVideoSm': 'https://images.pexels.com/videos/6650309/pictures/preview-0.jpeg',
      'backgroundPreviewVideo': 'https://images.pexels.com/videos/6650309/pexels-photo-6650309.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=630',
      'backgroundVideo': 'https://videos.pexels.com/video-files/6650309/6650309-hd_1080_2048_30fps.mp4'
    }, {
      'textColor': 'rgb(89, 89, 89)',
      'backgroundColor': 'rgba(0,0,0,0.24)',
      'backgroundTextColor': 'white',
      'componentColor': '#162728',
      'formBackgroundColor': 'rgb(255,255,255)',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundPreviewVideoSm': 'https://images.pexels.com/videos/8062895/pictures/preview-0.jpeg',
      'backgroundPreviewVideo': 'https://images.pexels.com/videos/8062895/beatiful-landscape-blue-mountains-blue-sky-clouds-8062895.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=630',
      'backgroundVideo': 'https://videos.pexels.com/video-files/8062895/8062895-hd_1080_1920_24fps.mp4'
    }, {
      'textColor': 'rgb(89, 89, 89)',
      'backgroundColor': 'rgba(0,0,0,0.24)',
      'backgroundTextColor': 'white',
      'componentColor': '#6B4216',
      'formBackgroundColor': 'rgb(255,255,255)',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundPreviewVideoSm': 'https://images.pexels.com/videos/4625518/pictures/preview-0.jpeg',
      'backgroundPreviewVideo': 'https://images.pexels.com/videos/4625518/pexels-photo-4625518.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=630',
      'backgroundVideo': 'https://videos.pexels.com/video-files/4625518/4625518-hd_1080_1920_30fps.mp4'
    }, {
      'textColor': 'rgb(89, 89, 89)',
      'backgroundColor': 'rgba(0,0,0,0.24)',
      'backgroundTextColor': 'white',
      'componentColor': '#4E2916',
      'formBackgroundColor': 'rgb(255,255,255)',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundPreviewVideoSm': 'https://images.pexels.com/videos/3998277/pictures/preview-0.jpeg',
      'backgroundPreviewVideo': 'https://images.pexels.com/videos/3998277/pexels-photo-3998277.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=630',
      'backgroundVideo': 'https://videos.pexels.com/video-files/3998277/3998277-hd_1080_2048_25fps.mp4'
    }, {
      'textColor': 'rgb(89, 89, 89)',
      'backgroundColor': 'rgba(0,0,0,0.24)',
      'backgroundTextColor': 'white',
      'componentColor': '#141414',
      'formBackgroundColor': 'rgb(255,255,255)',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundPreviewVideoSm': 'https://images.pexels.com/videos/6693421/pictures/preview-0.jpeg',
      'backgroundPreviewVideo': 'https://images.pexels.com/videos/6693421/pexels-photo-6693421.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=630',
      'backgroundVideo': 'https://videos.pexels.com/video-files/6693421/6693421-hd_1080_2048_30fps.mp4'
    }, {
      'textColor': 'rgb(89, 89, 89)',
      'backgroundColor': 'rgba(0,0,0,0.24)',
      'backgroundTextColor': 'white',
      'componentColor': '#869B90',
      'formBackgroundColor': 'rgb(255,255,255)',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundPreviewVideoSm': 'https://images.pexels.com/videos/9063404/pictures/preview-0.jpeg',
      'backgroundPreviewVideo': 'https://images.pexels.com/videos/9063404/pexels-photo-9063404.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=630',
      'backgroundVideo': 'https://videos.pexels.com/video-files/9063404/9063404-hd_1080_2048_30fps.mp4'
    }, {
      'textColor': 'rgb(89, 89, 89)',
      'backgroundColor': 'rgba(0,0,0,0.24)',
      'backgroundTextColor': 'white',
      'componentColor': '#965D23',
      'formBackgroundColor': 'rgb(255,255,255)',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundPreviewVideoSm': 'https://images.pexels.com/videos/6810583/pictures/preview-0.jpeg',
      'backgroundPreviewVideo': 'https://images.pexels.com/videos/6810583/pexels-photo-6810583.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=630',
      'backgroundVideo': 'https://videos.pexels.com/video-files/6810583/6810583-hd_1080_1872_30fps.mp4'
    }, {
      'textColor': 'rgb(89, 89, 89)',
      'backgroundColor': 'rgba(0,0,0,0.24)',
      'backgroundTextColor': 'white',
      'componentColor': '#EBC5B1',
      'formBackgroundColor': 'rgb(255,255,255)',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundPreviewVideoSm': 'https://images.pexels.com/videos/20382699/pictures/preview-0.jpeg',
      'backgroundPreviewVideo': 'https://images.pexels.com/videos/20382699/aromatherapy-bath-candle-christmas-20382699.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=630',
      'backgroundVideo': 'https://videos.pexels.com/video-files/20382699/20382699-hd_1080_1920_50fps.mp4'
    }, {
      'textColor': 'rgb(89, 89, 89)',
      'backgroundColor': 'rgba(0,0,0,0.24)',
      'backgroundTextColor': 'white',
      'componentColor': '#D6B7BD',
      'formBackgroundColor': 'rgb(255,255,255)',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundPreviewVideoSm': 'https://images.pexels.com/videos/8131886/pictures/preview-0.jpeg',
      'backgroundPreviewVideo': 'https://images.pexels.com/videos/8131886/pexels-photo-8131886.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=630',
      'backgroundVideo': 'https://videos.pexels.com/video-files/8131886/8131886-hd_1080_2048_25fps.mp4'
    }, {
      'textColor': 'rgb(89, 89, 89)',
      'backgroundColor': 'rgba(0,0,0,0.24)',
      'backgroundTextColor': 'white',
      'componentColor': '#2E86B2',
      'formBackgroundColor': 'rgb(255,255,255)',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundPreviewVideoSm': 'https://images.pexels.com/videos/6608004/pictures/preview-0.jpeg',
      'backgroundPreviewVideo': 'https://images.pexels.com/videos/6608004/pexels-photo-6608004.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=630',
      'backgroundVideo': 'https://videos.pexels.com/video-files/6608004/6608004-hd_1080_2048_30fps.mp4'
    },
    {
      'textColor': 'rgb(89, 89, 89)',
      'backgroundColor': 'rgba(0,0,0,0.24)',
      'backgroundTextColor': 'white',
      'componentColor': '#5E86B7',
      'formBackgroundColor': 'rgb(255,255,255)',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundPreviewVideoSm': 'https://images.pexels.com/videos/4562023/pictures/preview-0.jpeg',
      'backgroundPreviewVideo': 'https://images.pexels.com/videos/4562023/pexels-photo-4562023.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=630',
      'backgroundVideo': 'https://videos.pexels.com/video-files/4562023/4562023-hd_1040_1848_30fps.mp4'
    }, {
      'textColor': 'rgb(89, 89, 89)',
      'backgroundColor': 'rgba(0,0,0,0.24)',
      'backgroundTextColor': 'white',
      'componentColor': '#59688B',
      'formBackgroundColor': 'rgb(255,255,255)',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundPreviewVideoSm': 'https://images.pexels.com/videos/7782667/pictures/preview-0.jpeg',
      'backgroundPreviewVideo': 'https://images.pexels.com/videos/7782667/3d-3d-render-abstract-abstract-art-7782667.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=630',
      'backgroundVideo': 'https://videos.pexels.com/video-files/7782667/7782667-hd_1080_1920_25fps.mp4'
    },
    {
      'textColor': 'rgb(89, 89, 89)',
      'backgroundColor': 'rgba(0,0,0,0.24)',
      'backgroundTextColor': 'white',
      'componentColor': '#6F9EE2',
      'formBackgroundColor': 'rgb(255,255,255)',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundPreviewVideoSm': 'https://images.pexels.com/videos/4562021/pictures/preview-0.jpeg',
      'backgroundPreviewVideo': 'https://images.pexels.com/videos/4562021/pexels-photo-4562021.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=630',
      'backgroundVideo': 'https://videos.pexels.com/video-files/4562021/4562021-hd_1056_1880_30fps.mp4'
    },
    {
      'textColor': 'rgb(89, 89, 89)',
      'backgroundColor': 'rgba(0,0,0,0.24)',
      'backgroundTextColor': 'white',
      'componentColor': '#7F8367',
      'formBackgroundColor': 'rgb(255,255,255)',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundPreviewVideoSm': 'https://images.pexels.com/videos/4536559/pictures/preview-0.jpeg',
      'backgroundPreviewVideo': 'https://images.pexels.com/videos/4536559/animated-background-beautiful-background-flowers-green-4536559.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=630',
      'backgroundVideo': 'https://videos.pexels.com/video-files/4536559/4536559-hd_1080_1920_30fps.mp4'
    },
    {
      'textColor': 'rgb(89, 89, 89)',
      'backgroundColor': 'rgba(0,0,0,0.24)',
      'backgroundTextColor': 'white',
      'componentColor': '#7288BF',
      'formBackgroundColor': 'rgb(255,255,255)',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundPreviewVideoSm': 'https://images.pexels.com/videos/7895825/pictures/preview-0.jpeg',
      'backgroundPreviewVideo': 'https://images.pexels.com/videos/7895825/adventure-arid-background-beach-7895825.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=630',
      'backgroundVideo': 'https://videos.pexels.com/video-files/7895825/7895825-hd_1080_1920_30fps.mp4'
    }, {
      'textColor': 'rgb(89, 89, 89)',
      'backgroundColor': 'rgba(0,0,0,0.24)',
      'backgroundTextColor': 'white',
      'componentColor': '#300180',
      'formBackgroundColor': 'rgb(255,255,255)',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundPreviewVideoSm': 'https://images.pexels.com/videos/7235110/pictures/preview-0.jpeg',
      'backgroundPreviewVideo': 'https://images.pexels.com/videos/7235110/abstract-abstraction-acrylic-art-7235110.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=630',
      'backgroundVideo': 'https://videos.pexels.com/video-files/7235110/7235110-hd_1080_1920_30fps.mp4'
    },
    {
      'textColor': 'rgb(89, 89, 89)',
      'backgroundColor': 'rgba(0,0,0,0.24)',
      'backgroundTextColor': 'white',
      'componentColor': '#331D01',
      'formBackgroundColor': 'rgb(255,255,255)',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundPreviewVideoSm': 'https://images.pexels.com/videos/3955642/pictures/preview-0.jpeg',
      'backgroundPreviewVideo': 'https://images.pexels.com/videos/3955642/pexels-photo-3955642.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=630',
      'backgroundVideo': 'https://videos.pexels.com/video-files/3955642/3955642-hd_1080_1920_30fps.mp4'
    },
    {
      'textColor': 'rgb(89, 89, 89)',
      'backgroundColor': 'rgba(0,0,0,0.24)',
      'backgroundTextColor': 'white',
      'componentColor': '#151515',
      'formBackgroundColor': 'rgb(255,255,255)',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundPreviewVideoSm': 'https://images.pexels.com/videos/7945834/pictures/preview-0.jpeg',
      'backgroundPreviewVideo': 'https://images.pexels.com/videos/7945834/abstract-analog-analogue-animation-7945834.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=630',
      'backgroundVideo': 'https://videos.pexels.com/video-files/7945834/7945834-hd_1080_1920_30fps.mp4'
    },
    {
      'textColor': 'rgb(89, 89, 89)',
      'backgroundColor': 'rgba(0,0,0,0.24)',
      'backgroundTextColor': 'white',
      'componentColor': '#1A2C2A',
      'formBackgroundColor': 'rgb(255,255,255)',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundPreviewVideoSm': 'https://images.pexels.com/videos/28047912/pictures/preview-0.jpg',
      'backgroundPreviewVideo': 'https://images.pexels.com/videos/28047912/pexels-photo-28047912.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=630',
      'backgroundVideo': ''
    }, {
      'textColor': 'rgb(89, 89, 89)',
      'backgroundColor': 'rgba(0,0,0,0.24)',
      'backgroundTextColor': 'white',
      'componentColor': '#4A6079',
      'formBackgroundColor': 'rgb(255,255,255)',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundPreviewVideoSm': 'https://images.pexels.com/videos/8859849/pictures/preview-0.jpeg',
      'backgroundPreviewVideo': 'https://images.pexels.com/videos/8859849/acrobatics-cliff-exercises-fitness-8859849.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=630',
      'backgroundVideo': 'https://videos.pexels.com/video-files/8859849/8859849-hd_1080_1920_25fps.mp4'
    },
    {
      'textColor': 'rgb(89, 89, 89)',
      'backgroundColor': 'rgba(0,0,0,0.24)',
      'backgroundTextColor': 'white',
      'componentColor': '#4C5E42',
      'formBackgroundColor': 'rgb(255,255,255)',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundPreviewVideoSm': 'https://images.pexels.com/videos/4937376/pictures/preview-0.jpeg',
      'backgroundPreviewVideo': 'https://images.pexels.com/videos/4937376/20-25-years-old-woman-beautiful-sunset-beautiful-woman-blue-dress-4937376.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=630',
      'backgroundVideo': 'https://videos.pexels.com/video-files/4937376/4937376-hd_1080_1920_24fps.mp4'
    }, {
      'textColor': 'rgb(89, 89, 89)',
      'backgroundColor': 'rgba(0,0,0,0.24)',
      'backgroundTextColor': 'white',
      'componentColor': '#971D0F',
      'formBackgroundColor': 'rgb(255,255,255)',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundPreviewVideoSm': 'https://images.pexels.com/videos/4812205/pictures/preview-0.jpeg',
      'backgroundPreviewVideo': 'https://images.pexels.com/videos/4812205/air-child-dad-dress-4812205.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=630',
      'backgroundVideo': 'https://videos.pexels.com/video-files/4812205/4812205-hd_1080_1920_30fps.mp4'
    }, {
      'textColor': 'rgb(89, 89, 89)',
      'backgroundColor': 'rgba(0,0,0,0.24)',
      'backgroundTextColor': 'white',
      'componentColor': '#934023',
      'formBackgroundColor': 'rgb(255,255,255)',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundPreviewVideoSm': 'https://images.pexels.com/videos/3320517/pictures/preview-0.jpeg',
      'backgroundPreviewVideo': 'https://images.pexels.com/videos/3320517/free-video-3320517.jpg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=630',
      'backgroundVideo': 'https://videos.pexels.com/video-files/3320517/3320517-hd_1080_1920_25fps.mp4'
    }, {
      'textColor': 'rgb(89, 89, 89)',
      'backgroundColor': 'rgba(0,0,0,0.24)',
      'backgroundTextColor': 'white',
      'componentColor': '#131313',
      'formBackgroundColor': 'rgb(255,255,255)',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundPreviewVideoSm': 'https://images.pexels.com/videos/3703708/pictures/preview-0.jpeg',
      'backgroundPreviewVideo': 'https://images.pexels.com/videos/3703708/pexels-photo-3703708.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=630',
      'backgroundVideo': 'https://videos.pexels.com/video-files/3703708/3703708-hd_1080_2048_25fps.mp4'
    }, {
      'textColor': 'rgb(89, 89, 89)',
      'backgroundColor': 'rgba(0,0,0,0.24)',
      'backgroundTextColor': 'white',
      'componentColor': '#E0A800',
      'formBackgroundColor': 'rgb(255,255,255)',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundPreviewVideoSm': 'https://images.pexels.com/videos/8064146/pictures/preview-0.jpeg',
      'backgroundPreviewVideo': 'https://images.pexels.com/videos/8064146/pexels-photo-8064146.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=630',
      'backgroundVideo': 'https://videos.pexels.com/video-files/8064146/8064146-hd_1080_1350_30fps.mp4'
    }, {
      'textColor': 'rgb(89, 89, 89)',
      'backgroundColor': 'rgba(0,0,0,0.24)',
      'backgroundTextColor': 'white',
      'componentColor': '#64011F',
      'formBackgroundColor': 'rgb(255,255,255)',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundPreviewVideoSm': 'https://images.pexels.com/videos/3796066/pictures/preview-0.jpeg',
      'backgroundPreviewVideo': 'https://images.pexels.com/videos/3796066/pexels-photo-3796066.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=630',
      'backgroundVideo': 'https://videos.pexels.com/video-files/3796066/3796066-hd_1080_2048_25fps.mp4'
    }, {
      'textColor': 'rgb(89, 89, 89)',
      'backgroundColor': 'rgba(0,0,0,0.24)',
      'backgroundTextColor': 'white',
      'componentColor': '#004A63',
      'formBackgroundColor': 'rgb(255,255,255)',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundPreviewVideoSm': 'https://images.pexels.com/videos/7565438/pictures/preview-0.jpeg',
      'backgroundPreviewVideo': 'https://images.pexels.com/videos/7565438/pexels-photo-7565438.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=630',
      'backgroundVideo': 'https://videos.pexels.com/video-files/7565438/7565438-hd_1080_1920_25fps.mp4'
    }, {
      'textColor': 'rgb(89, 89, 89)',
      'backgroundColor': 'rgba(0,0,0,0.24)',
      'backgroundTextColor': 'white',
      'componentColor': '#668B62',
      'formBackgroundColor': 'rgb(255,255,255)',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundPreviewVideoSm': 'https://images.pexels.com/videos/7565881/pictures/preview-0.jpeg',
      'backgroundPreviewVideo': 'https://images.pexels.com/videos/7565881/pexels-photo-7565881.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=630',
      'backgroundVideo': 'https://videos.pexels.com/video-files/7565881/7565881-hd_1080_1920_25fps.mp4'
    }, {
      'textColor': 'rgb(89, 89, 89)',
      'backgroundColor': 'rgba(0,0,0,0.24)',
      'backgroundTextColor': 'white',
      'componentColor': '#0F7E9A',
      'formBackgroundColor': 'rgb(255,255,255)',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundPreviewVideoSm': 'https://images.pexels.com/videos/7565622/pictures/preview-0.jpeg',
      'backgroundPreviewVideo': 'https://images.pexels.com/videos/7565622/pexels-photo-7565622.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=630',
      'backgroundVideo': 'https://videos.pexels.com/video-files/7565622/7565622-hd_1080_1920_25fps.mp4'
    }, {
      'textColor': 'rgb(89, 89, 89)',
      'backgroundColor': 'rgba(0,0,0,0.24)',
      'backgroundTextColor': 'white',
      'componentColor': '#565A5D',
      'formBackgroundColor': 'rgb(255,255,255)',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundPreviewVideoSm': 'https://images.pexels.com/videos/4167404/pictures/preview-0.jpeg',
      'backgroundPreviewVideo': 'https://images.pexels.com/videos/4167404/alta-tecnologia-apple-dron-drone-video-4167404.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=630',
      'backgroundVideo': 'https://videos.pexels.com/video-files/4167404/4167404-hd_1080_1440_24fps.mp4'
    }, {
      'textColor': 'rgb(89, 89, 89)',
      'backgroundColor': 'rgba(0,0,0,0.24)',
      'backgroundTextColor': 'white',
      'componentColor': '#7BA690',
      'formBackgroundColor': 'rgb(255,255,255)',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundPreviewVideoSm': 'https://images.pexels.com/videos/1713836/pictures/preview-0.jpeg',
      'backgroundPreviewVideo': 'https://images.pexels.com/videos/1713836/free-video-1713836.jpg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=630',
      'backgroundVideo': 'https://videos.pexels.com/video-files/1713836/1713836-hd_1080_1920_30fps.mp4'
    },
    {
      'textColor': 'rgb(89, 89, 89)',
      'backgroundColor': 'rgba(0,0,0,0.24)',
      'backgroundTextColor': 'white',
      'componentColor': '#ABB0B2',
      'formBackgroundColor': 'rgb(255,255,255)',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundPreviewVideoSm': 'https://images.pexels.com/videos/3944827/pictures/preview-0.jpeg',
      'backgroundPreviewVideo': 'https://images.pexels.com/videos/3944827/pexels-photo-3944827.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=630',
      'backgroundVideo': 'https://videos.pexels.com/video-files/3944827/3944827-hd_1080_2048_25fps.mp4'
    }, {
      'textColor': 'rgb(89, 89, 89)',
      'backgroundColor': 'rgba(0,0,0,0.24)',
      'backgroundTextColor': 'white',
      'componentColor': '#1C3529',
      'formBackgroundColor': 'rgb(255,255,255)',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundPreviewVideoSm': 'https://images.pexels.com/videos/4065220/pictures/preview-0.jpeg',
      'backgroundPreviewVideo': 'https://images.pexels.com/videos/4065220/pexels-photo-4065220.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=630',
      'backgroundVideo': 'https://videos.pexels.com/video-files/4065220/4065220-hd_1080_2048_25fps.mp4'
    }, {
      'textColor': 'rgb(89, 89, 89)',
      'backgroundColor': 'rgba(0,0,0,0.24)',
      'backgroundTextColor': 'white',
      'componentColor': '#8F836D',
      'formBackgroundColor': 'rgb(255,255,255)',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundPreviewVideoSm': 'https://images.pexels.com/videos/7710420/pictures/preview-0.jpeg',
      'backgroundPreviewVideo': 'https://images.pexels.com/videos/7710420/adult-blur-business-coffee-7710420.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=630',
      'backgroundVideo': 'https://videos.pexels.com/video-files/7710420/7710420-hd_1080_2048_25fps.mp4'
    }, {
      'textColor': 'rgb(89, 89, 89)',
      'backgroundColor': 'rgba(0,0,0,0.24)',
      'backgroundTextColor': 'white',
      'componentColor': '#381C0F',
      'formBackgroundColor': 'rgb(255,255,255)',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundPreviewVideoSm': 'https://images.pexels.com/videos/5989753/pictures/preview-0.jpeg',
      'backgroundPreviewVideo': 'https://images.pexels.com/videos/5989753/business-businesswoman-cafe-close-up-5989753.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=630',
      'backgroundVideo': 'https://videos.pexels.com/video-files/5989753/5989753-hd_1080_1920_25fps.mp4'
    }, {
      'textColor': 'rgb(89, 89, 89)',
      'backgroundColor': 'rgba(0,0,0,0.24)',
      'backgroundTextColor': 'white',
      'componentColor': '#031828',
      'formBackgroundColor': 'rgb(255,255,255)',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundPreviewVideoSm': 'https://images.pexels.com/videos/6799742/pictures/preview-0.jpeg',
      'backgroundPreviewVideo': 'https://images.pexels.com/videos/6799742/adult-analysis-analyze-analyzing-6799742.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=630',
      'backgroundVideo': 'https://videos.pexels.com/video-files/6799742/6799742-hd_1080_1920_30fps.mp4'
    }, {
      'textColor': 'rgb(89, 89, 89)',
      'backgroundColor': 'rgba(0,0,0,0.24)',
      'backgroundTextColor': 'white',
      'componentColor': '#030A08',
      'formBackgroundColor': 'rgb(255,255,255)',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundPreviewVideoSm': 'https://images.pexels.com/videos/4543684/pictures/preview-0.jpeg',
      'backgroundPreviewVideo': 'https://images.pexels.com/videos/4543684/pexels-photo-4543684.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=630',
      'backgroundVideo': 'https://videos.pexels.com/video-files/4543684/4543684-hd_1080_1920_25fps.mp4'
    }, {
      'textColor': 'rgb(89, 89, 89)',
      'backgroundColor': 'rgba(0,0,0,0.24)',
      'backgroundTextColor': 'white',
      'componentColor': '#664A17',
      'formBackgroundColor': 'rgb(255,255,255)',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundPreviewVideoSm': 'https://images.pexels.com/videos/7263086/pictures/preview-0.jpeg',
      'backgroundPreviewVideo': 'https://images.pexels.com/videos/7263086/pexels-photo-7263086.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=630',
      'backgroundVideo': 'https://videos.pexels.com/video-files/7263086/7263086-hd_1080_1920_25fps.mp4'
    }, {
      'textColor': 'rgb(89, 89, 89)',
      'backgroundColor': 'rgba(0,0,0,0.24)',
      'backgroundTextColor': 'white',
      'componentColor': '#6A6765',
      'formBackgroundColor': 'rgb(255,255,255)',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundPreviewVideoSm': 'https://images.pexels.com/videos/7657367/pictures/preview-0.jpeg',
      'backgroundPreviewVideo': 'https://images.pexels.com/videos/7657367/coffee-computer-desk-flowers-7657367.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=630',
      'backgroundVideo': 'https://videos.pexels.com/video-files/7657367/7657367-hd_1080_1920_25fps.mp4'
    }, {
      'textColor': 'rgb(89, 89, 89)',
      'backgroundColor': 'rgba(0,0,0,0.24)',
      'backgroundTextColor': 'white',
      'componentColor': '#002642',
      'formBackgroundColor': 'rgb(255,255,255)',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundPreviewVideoSm': 'https://images.pexels.com/videos/7818619/pictures/preview-0.jpeg',
      'backgroundPreviewVideo': 'https://images.pexels.com/videos/7818619/achievement-aid-branding-business-7818619.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=630',
      'backgroundVideo': 'https://videos.pexels.com/video-files/7818619/7818619-hd_1080_1920_30fps.mp4'
    }, {
      'textColor': 'rgb(89, 89, 89)',
      'backgroundColor': 'rgba(0,0,0,0.24)',
      'backgroundTextColor': 'white',
      'componentColor': '#5B2E1A',
      'formBackgroundColor': 'rgb(255,255,255)',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundPreviewVideoSm': 'https://images.pexels.com/videos/4778723/pictures/preview-0.jpeg',
      'backgroundPreviewVideo': 'https://images.pexels.com/videos/4778723/pexels-photo-4778723.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=630',
      'backgroundVideo': 'https://videos.pexels.com/video-files/4778723/4778723-hd_1080_2048_25fps.mp4'
    }, {
      'textColor': 'rgb(89, 89, 89)',
      'backgroundColor': 'rgba(0,0,0,0.24)',
      'backgroundTextColor': 'white',
      'componentColor': '#1F1109',
      'formBackgroundColor': 'rgb(255,255,255)',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundPreviewVideoSm': 'https://images.pexels.com/videos/4156330/pictures/preview-0.jpeg',
      'backgroundPreviewVideo': 'https://images.pexels.com/videos/4156330/pexels-photo-4156330.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=630',
      'backgroundVideo': 'https://videos.pexels.com/video-files/4156330/4156330-hd_1080_2048_25fps.mp4'
    }, {
      'textColor': 'rgb(89, 89, 89)',
      'backgroundColor': 'rgba(0,0,0,0.24)',
      'backgroundTextColor': 'white',
      'componentColor': '#5F3D1C',
      'formBackgroundColor': 'rgb(255,255,255)',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundPreviewVideoSm': 'https://images.pexels.com/videos/3986257/pictures/preview-0.jpeg',
      'backgroundPreviewVideo': 'https://images.pexels.com/videos/3986257/cafe-girl-relax-relaxing-3986257.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=630',
      'backgroundVideo': 'https://videos.pexels.com/video-files/3986257/3986257-hd_1080_1920_30fps.mp4'
    }, {
      'textColor': 'rgb(89, 89, 89)',
      'backgroundColor': 'rgba(0,0,0,0.24)',
      'backgroundTextColor': 'white',
      'componentColor': '#496873',
      'formBackgroundColor': 'rgb(255,255,255)',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundPreviewVideoSm': 'https://images.pexels.com/videos/4920770/pictures/preview-0.jpeg',
      'backgroundPreviewVideo': 'https://images.pexels.com/videos/4920770/pexels-photo-4920770.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=630',
      'backgroundVideo': 'https://videos.pexels.com/video-files/4920770/4920770-hd_1080_2048_25fps.mp4'
    }, {
      'textColor': 'rgb(89, 89, 89)',
      'backgroundColor': 'rgba(0,0,0,0.24)',
      'backgroundTextColor': 'white',
      'componentColor': '#B26845',
      'formBackgroundColor': 'rgb(255,255,255)',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundPreviewVideoSm': 'https://images.pexels.com/videos/5534664/pictures/preview-0.jpeg',
      'backgroundPreviewVideo': 'https://images.pexels.com/videos/5534664/pexels-photo-5534664.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=630',
      'backgroundVideo': 'https://videos.pexels.com/video-files/5534664/5534664-hd_1080_1920_30fps.mp4'
    }, {
      'textColor': 'rgb(89, 89, 89)',
      'backgroundColor': 'rgba(0,0,0,0.24)',
      'backgroundTextColor': 'white',
      'componentColor': '#2D485F',
      'formBackgroundColor': 'rgb(255,255,255)',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundPreviewVideoSm': 'https://images.pexels.com/videos/4488737/pictures/preview-0.jpeg',
      'backgroundPreviewVideo': 'https://images.pexels.com/videos/4488737/pexels-photo-4488737.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=630',
      'backgroundVideo': 'https://videos.pexels.com/video-files/4488737/4488737-hd_1080_2048_25fps.mp4'
    }, {
      'textColor': 'rgb(89, 89, 89)',
      'backgroundColor': 'rgba(0,0,0,0.24)',
      'backgroundTextColor': 'white',
      'componentColor': '#010001',
      'formBackgroundColor': 'rgb(255,255,255)',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundPreviewVideoSm': 'https://images.pexels.com/videos/3997802/pictures/preview-0.jpeg',
      'backgroundPreviewVideo': 'https://images.pexels.com/videos/3997802/pexels-photo-3997802.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=630',
      'backgroundVideo': 'https://videos.pexels.com/video-files/3997802/3997802-hd_1080_2048_25fps.mp4'
    }, {
      'textColor': 'rgb(89, 89, 89)',
      'backgroundColor': 'rgba(0,0,0,0.24)',
      'backgroundTextColor': 'white',
      'componentColor': '#13212B',
      'formBackgroundColor': 'rgb(255,255,255)',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundPreviewVideoSm': 'https://images.pexels.com/videos/4489872/pictures/preview-0.jpeg',
      'backgroundPreviewVideo': 'https://images.pexels.com/videos/4489872/pexels-photo-4489872.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=630',
      'backgroundVideo': 'https://videos.pexels.com/video-files/4489872/4489872-hd_1080_2048_25fps.mp4'
    }, {
      'textColor': 'rgb(89, 89, 89)',
      'backgroundColor': 'rgba(0,0,0,0.24)',
      'backgroundTextColor': 'white',
      'componentColor': '#1B242B',
      'formBackgroundColor': 'rgb(255,255,255)',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundPreviewVideoSm': 'https://images.pexels.com/videos/6873501/pictures/preview-0.jpeg',
      'backgroundPreviewVideo': 'https://images.pexels.com/videos/6873501/pexels-photo-6873501.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=630',
      'backgroundVideo': 'https://videos.pexels.com/video-files/6873501/6873501-hd_1080_1920_25fps.mp4'
    }, {
      'textColor': 'rgb(89, 89, 89)',
      'backgroundColor': 'rgba(0,0,0,0.24)',
      'backgroundTextColor': 'white',
      'componentColor': '#0B1011',
      'formBackgroundColor': 'rgb(255,255,255)',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundPreviewVideoSm': 'https://images.pexels.com/videos/6872478/pictures/preview-0.jpeg',
      'backgroundPreviewVideo': 'https://images.pexels.com/videos/6872478/pexels-photo-6872478.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=630',
      'backgroundVideo': 'https://videos.pexels.com/video-files/6872478/6872478-hd_1080_1920_25fps.mp4'
    }, {
      'textColor': 'rgb(89, 89, 89)',
      'backgroundColor': 'rgba(0,0,0,0.24)',
      'backgroundTextColor': 'white',
      'componentColor': '#302B2E',
      'formBackgroundColor': 'rgb(255,255,255)',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundPreviewVideoSm': 'https://images.pexels.com/videos/12370189/pictures/preview-0.jpeg',
      'backgroundPreviewVideo': 'https://images.pexels.com/videos/12370189/auto-bmw-car-washing-carwash-12370189.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=630',
      'backgroundVideo': 'https://videos.pexels.com/video-files/12370189/12370189-hd_720_1280_30fps.mp4'
    },
    {
      'textColor': 'rgb(89, 89, 89)',
      'backgroundColor': 'rgba(0,0,0,0.24)',
      'backgroundTextColor': 'white',
      'componentColor': '#971ac3',
      'formBackgroundColor': 'rgb(255,255,255)',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundPreviewVideoSm': 'https://images.pexels.com/videos/7547782/pictures/preview-0.jpeg',
      'backgroundPreviewVideo': 'https://images.pexels.com/videos/7547782/pexels-photo-7547782.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=630',
      'backgroundVideo': 'https://videos.pexels.com/video-files/7547782/7547782-hd_1080_1920_25fps.mp4'
    },
    {
      'textColor': 'rgb(89, 89, 89)',
      'backgroundColor': 'rgba(0,0,0,0.24)',
      'backgroundTextColor': 'white',
      'componentColor': '#8347cd',
      'formBackgroundColor': 'rgb(255,255,255)',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundPreviewVideoSm': 'https://images.pexels.com/videos/8764796/pictures/preview-0.jpeg',
      'backgroundPreviewVideo': 'https://images.pexels.com/videos/8764796/adult-art-beautiful-bionic-8764796.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=630',
      'backgroundVideo': 'https://videos.pexels.com/video-files/8764796/8764796-hd_1080_1920_25fps.mp4'
    },
    {
      'textColor': 'rgb(89, 89, 89)',
      'backgroundColor': 'rgba(0,0,0,0.24)',
      'backgroundTextColor': 'white',
      'componentColor': '#091125',
      'formBackgroundColor': 'rgb(255,255,255)',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundPreviewVideoSm': 'https://images.pexels.com/videos/6499159/pictures/preview-0.jpeg',
      'backgroundPreviewVideo': 'https://images.pexels.com/videos/6499159/pexels-photo-6499159.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=630',
      'backgroundVideo': 'https://videos.pexels.com/video-files/6499159/6499159-hd_1080_1920_25fps.mp4'
    },
    {
      'textColor': 'rgb(89, 89, 89)',
      'backgroundColor': 'rgba(0,0,0,0.24)',
      'backgroundTextColor': 'white',
      'componentColor': '#363B71',
      'formBackgroundColor': 'rgb(255,255,255)',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundPreviewVideoSm': 'https://images.pexels.com/videos/6498262/pictures/preview-0.jpeg',
      'backgroundPreviewVideo': 'https://images.pexels.com/videos/6498262/pexels-photo-6498262.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=630',
      'backgroundVideo': 'https://videos.pexels.com/video-files/6498262/6498262-hd_1080_1920_25fps.mp4'
    },
    {
      'textColor': 'rgb(89, 89, 89)',
      'backgroundColor': 'rgba(0,0,0,0.24)',
      'backgroundTextColor': 'white',
      'componentColor': '#67151B',
      'formBackgroundColor': 'rgb(255,255,255)',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundPreviewVideoSm': 'https://images.pexels.com/videos/7942760/pictures/preview-0.jpeg',
      'backgroundPreviewVideo': 'https://images.pexels.com/videos/7942760/adult-at-home-dark-device-7942760.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=630',
      'backgroundVideo': 'https://videos.pexels.com/video-files/7942760/7942760-hd_1080_2048_25fps.mp4'
    },
    {
      'textColor': 'rgb(89, 89, 89)',
      'backgroundColor': 'rgba(0,0,0,0.24)',
      'backgroundTextColor': 'white',
      'componentColor': '#002081',
      'formBackgroundColor': 'rgb(255,255,255)',
      'textButtonColor': '#ffffff',
      'buttonRadius': '50px',
      'backgroundPreviewVideoSm': 'https://images.pexels.com/videos/7547776/pictures/preview-0.jpeg',
      'backgroundPreviewVideo': 'https://images.pexels.com/videos/7547776/pexels-photo-7547776.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=630',
      'backgroundVideo': 'https://videos.pexels.com/video-files/7547776/7547776-hd_1080_1920_25fps.mp4'
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
    public formConfigService: FormConfigService,
    private pexelService: PexelService,
    private sanitizer: DomSanitizer,
    private googleTranslateService: GoogleTranslateService,
    private languageService: LanguageService,
    public server: Server) {
  }

  ngOnInit(): void {
  }

  public userTemplate(template: ReservationTemplate): void {
    this.formConfigService.refreshBackground();
    this.formService.template.textColor = template.textColor;
    this.formService.template.backgroundColor = template.backgroundColor;
    this.formService.template.backgroundMainColor = template.backgroundMainColor;
    this.formService.template.backgroundTextColor = template.backgroundTextColor;
    this.formService.template.componentColor = template.componentColor;
    this.formService.template.formBackgroundColor = template.formBackgroundColor;
    this.formService.template.textButtonColor = template.textButtonColor;
    this.formService.template.buttonRadius = template.buttonRadius;
    this.formService.template.backgroundImg = null;
    this.formService.template.backgroundImgFromGallery = null;
    this.formService.template.fullPathImg = null;
    this.formService.template.backgroundVideo = template.backgroundVideo;
    this.formService.template.backgroundPreviewVideo = template.backgroundPreviewVideo;
  }

  public openVideoSearchModal(): void {
    this.modalService.open(this.templateVideoSearch, {size: 'lg'});
    this.searchForPexelVideos();
  }

  public searchForPexelVideos(): void {
    this.googleTranslateService.translate(this.searchKey, this.languageService.language, (searchKey: string) => {
      this.pexelService.getVideos(searchKey, (videos: PexelVideo[]) => {
        this.videos = videos;
      }, 40);
    });
  }

  public selectPexelVideo(video: PexelVideo): void {
    // Find HD video file (prefer 1080p)
    const hdVideo = video.video_files.find(file =>
      file.quality === 'hd' && file.height >= 1080
    ) || video.video_files[0];

    // Find preview image
    const previewImage = video.video_pictures[0]?.picture || '';

    // Create a template with the selected video
    const template = {
      textColor: 'rgb(89, 89, 89)',
      backgroundColor: 'rgba(0,0,0,0.24)',
      backgroundTextColor: 'white',
      componentColor: '#090502',
      formBackgroundColor: 'rgb(255,255,255)',
      textButtonColor: '#ffffff',
      buttonRadius: '50px',
      backgroundPreviewVideoSm: video.video_pictures[0]?.picture,
      backgroundPreviewVideo: previewImage,
      backgroundVideo: hdVideo.link
    };
    this.userTemplate(template as unknown as ReservationTemplate);
    this.modalService.close();
  }
}
