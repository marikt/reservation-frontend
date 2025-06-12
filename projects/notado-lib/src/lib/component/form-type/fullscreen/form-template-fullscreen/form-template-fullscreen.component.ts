import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {LanguageService} from '../../../../service/language.service';
import {FormService} from '../../../../service/form.service';
import {Server} from '../../../../../config/server';
import {HttpService} from '../../../../service/http.service';
import {FormTemplateCommon} from '../../util/form-template-common';
import {VerticalBookingProgressComponent} from '../../simple/vertical-booking-progress/vertical-booking-progress.component';
import {TranslateModule} from '@ngx-translate/core';
import {NgIf, NgStyle} from '@angular/common';
import {ButtonConfigFullscreenComponent} from '../button-config-fullscreen/button-config-fullscreen.component';
import {FormTodoItemsComponent} from '../../../form-todo-items/form-todo-items.component';
import {SafeUrlStylePipe} from '../../../../pipe/safe-url-style.pipe';
import {BookingDetailFullscreenComponent} from '../booking-detail-fullscreen/booking-detail-fullscreen.component';

@Component({
  selector: 'app-form-template-fullscreen',
  templateUrl: './form-template-fullscreen.component.html',
  styleUrls: ['./form-template-fullscreen.component.scss'],
  imports: [
    VerticalBookingProgressComponent,
    TranslateModule,
    NgIf,
    ButtonConfigFullscreenComponent,
    FormTodoItemsComponent,
    SafeUrlStylePipe,
    BookingDetailFullscreenComponent,
    NgStyle
  ],
  standalone: true
})
export class FormTemplateFullscreenComponent extends FormTemplateCommon implements OnInit {

  // @ViewChild('videoRef', { static: false }) videoElement!: ElementRef;

  public showVideo: boolean = false;

  constructor(public languageService: LanguageService,
              public formService: FormService,
              public server: Server,
              public http: HttpService,
  ) {
    super(languageService, formService, server, http);
  }

  ngOnInit(): void {
    this.validateCriticalProblems();
    setTimeout(() => {
      this.showVideo = true;
    }, 100);

  }

  public backgroundImage(counter?: number): string {
    if (this.formService.template && this.formService.template.backgroundPreviewVideo) {
      return 'url(\'' + this.formService.template.backgroundPreviewVideo + '\') no-repeat scroll top center'
    }
    if (this.formService.template && this.formService.template.backgroundImgFromGallery) {
      return 'url(\'../../../../../resources/form-gallery/' + this.formService.template.backgroundImg + '\') no-repeat scroll top center'
    }
    if (this.formService.template && this.formService.template.fullPathImg) {
      return 'url(\'' + this.server.SERVER + this.formService.template.fullPathImg + '\') no-repeat scroll top center'
    }
    return '';
  }

}
