import {ModuleWithProviders, NgModule} from '@angular/core';

import {LyImageCropperModule} from '@alyle/ui/image-cropper';
import {LySliderModule} from '@alyle/ui/slider';
import {LyButtonModule} from '@alyle/ui/button';
import {LyIconModule} from '@alyle/ui/icon';
import {LyThemeModule} from '@alyle/ui';
import {LyToolbarModule} from '@alyle/ui/toolbar';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {CalendarExplainComponent} from '../../component/other/calendar-explain/calendar-explain.component';
import {IntegrationImgComponent} from '../../component/dashboard/integration/integration-img/integration-img.component';
import {ContactComponent} from '../../component/intro/contact/contact.component';
import {ImageResizeComponent} from '../../component/image-resize/image-resize.component';

import {FooterComponent} from '../../component/intro/footer/footer.component';
import {MenuComponent} from '../../component/menu/menu.component';
import {WhatWeKnowListItemComponent} from '../../component/intro/what-we-know-list-item/what-we-know-list-item.component';
import {WhatWeKnowListComponent} from '../../component/intro/what-we-know-list/what-we-know-list.component';
import {MenuAudianceComponent} from '../../component/intro/menu/menu-audiance/menu-audiance.component';
import {MenuWhatWeKnowComponent} from '../../component/intro/menu/menu-what-we-know/menu-what-we-know.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {DemoComponent} from '../../component/intro/demo/demo.component';
import {DemoFormTimeComponent} from '../../component/intro/demo/demo-form-time/demo-form-time.component';
import {DemoModalComponent} from '../../component/intro/demo/demo-modal/demo-modal.component';
import {DemoModalContactComponent} from '../../component/intro/demo/demo-modal-contact/demo-modal-contact.component';
import {DemoModalDateComponent} from '../../component/intro/demo/demo-modal-date/demo-modal-date.component';
import {DemoModalServiceComponent} from '../../component/intro/demo/demo-modal-service/demo-modal-service.component';
import {DemoModalSummaryComponent} from '../../component/intro/demo/demo-modal-summary/demo-modal-summary.component';
import {DemoModalThanksComponent} from '../../component/intro/demo/demo-modal-thanks/demo-modal-thanks.component';
import {IntroItemRevertComponent} from '../../component/intro/intro-item-revert/intro-item-revert.component';
import {IntroItemComponent} from '../../component/intro/intro-item/intro-item.component';
import {TryButtonComponent} from '../../component/intro/try-button/try-button.component';
import {Error404Component} from '../../component/error/404/error404.component';
import {FaqOnBottomPageComponent} from '../../component/util/faq-on-bottom-page/faq-on-bottom-page.component';
import {FaqOnBottomPageItemComponent} from '../../component/util/faq-on-bottom-page-item/faq-on-bottom-page-item.component';
import {FeedbackComponent} from '../../component/intro/feedback/feedback.component';
import {NotadoLibModule} from '../../../../projects/notado-lib/src/lib/notado-lib.module';
import {FeaturesComponent} from '../../component/intro/features/features.component';
import {BookingChannelsComponent} from '../../component/intro/booking-channels/booking-channels.component';
import {VideoTutorialComponent} from '../../component/video-tutorial/video-tutorial.component';
import {Demo2Component} from '../../component/intro/demo/demo2/demo2.component';
import {VideoGuideComponent} from '../../component/video-guide/video-guide.component';
import {BrowserFrameComponent} from '../../component/intro/browser-frame/browser-frame.component';
import {TryAndVideoButtonComponent} from '../../component/intro/try-and-video-button/try-and-video-button.component';
import {RowFaqItemComponent} from '../../component/util/row-faq-item/row-faq-item.component';
import {
  GoogleConnectPopupInfoComponent
} from '../../component/dashboard/google-calendar-connect-business-item/google-connect-popup-info/google-connect-popup-info.component';


@NgModule({
  imports: [
    LyImageCropperModule,
    LySliderModule,
    LyButtonModule,
    LyIconModule,
    LyThemeModule.setTheme('minima-light'),
    LyToolbarModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    CommonModule,
    NgbModule,
    NotadoLibModule,
    IntegrationImgComponent,
    ContactComponent,
    CalendarExplainComponent,
    ImageResizeComponent,
    FooterComponent,
    MenuComponent,
    WhatWeKnowListItemComponent,
    WhatWeKnowListComponent,
    MenuAudianceComponent,
    MenuWhatWeKnowComponent,
    DemoComponent,
    Demo2Component,
    DemoFormTimeComponent,
    DemoModalComponent,
    DemoModalContactComponent,
    DemoModalDateComponent,
    DemoModalServiceComponent,
    DemoModalSummaryComponent,
    DemoModalThanksComponent,
    IntroItemRevertComponent,
    IntroItemComponent,
    TryButtonComponent,
    TryAndVideoButtonComponent,
    Error404Component,
    FaqOnBottomPageComponent,
    FaqOnBottomPageItemComponent,
    FeedbackComponent,
    FeaturesComponent,
    BookingChannelsComponent,
    VideoTutorialComponent,
    VideoGuideComponent,
    BrowserFrameComponent,
    RowFaqItemComponent,
    GoogleConnectPopupInfoComponent
  ],
  exports: [
    IntegrationImgComponent,
    ContactComponent,
    CalendarExplainComponent,
    ImageResizeComponent,
    FooterComponent,
    MenuComponent,
    WhatWeKnowListItemComponent,
    WhatWeKnowListComponent,
    MenuAudianceComponent,
    MenuWhatWeKnowComponent,
    TranslateModule,
    NgbModule,
    DemoComponent,
    Demo2Component,
    DemoFormTimeComponent,
    DemoModalComponent,
    DemoModalContactComponent,
    DemoModalDateComponent,
    DemoModalServiceComponent,
    DemoModalSummaryComponent,
    DemoModalThanksComponent,
    IntroItemRevertComponent,
    IntroItemComponent,
    TryButtonComponent,
    TryAndVideoButtonComponent,
    Error404Component,
    FaqOnBottomPageComponent,
    FaqOnBottomPageItemComponent,
    FeedbackComponent,
    FeaturesComponent,
    BookingChannelsComponent,
    VideoTutorialComponent,
    VideoGuideComponent,
    BrowserFrameComponent,
    RowFaqItemComponent,
    GoogleConnectPopupInfoComponent,
  ]
})
export class NotadoCommonModule {
  static forRoot(): ModuleWithProviders<NotadoCommonModule> {
    return {
      ngModule: NotadoCommonModule
    };
  }
}
