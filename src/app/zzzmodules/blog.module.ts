import {ErrorHandler, NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {HammerModule} from '@angular/platform-browser';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';

import {RouterModule, Routes} from '@angular/router';
import {CommonModule} from '@angular/common';
import {MinimaDark, MinimaLight} from '@alyle/ui/themes/minima';
import {LY_THEME} from '@alyle/ui';
import {GlobalErrorHandlerService} from '../service/global-error-handler.service';
import {MenuBlogComponent} from '../component/blog/menu-blog/menu-blog.component';
import {BlogModuleComponent} from './root-component/blog/blog-module.component';
import {Error404Component} from '../component/error/404/error404.component';
import {
  ReservationSystemHelpYourBusinessComponent
} from '../component/blog/blogs/reservation-system-help-your-business/reservation-system-help-your-business.component';
import {BlogListComponent} from '../component/blog/blog-list/blog-list.component';
import {Top5Component} from '../component/blog/blogs/top-5/top-5.component';
import {BlogTemplateComponent} from '../component/blog/blog-template/blog-template.component';
import {BlogCardComponent} from '../component/blog/blog-card/blog-card.component';
import {
  GoogleCalendarAsReservationSystemComponent
} from '../component/blog/blogs/google-calendar-as-reservation-system/google-calendar-as-reservation-system.component';
import {
  ReservationSystemForBarberComponent
} from '../component/blog/blogs/reservation-system-for-barber/reservation-system-for-barber.component';
import {
  ReservationSystemForMassageComponent
} from '../component/blog/blogs/reservation-system-for-massage/reservation-system-for-massage.component';
import {
  ReservationSystemForSportVenueComponent
} from '../component/blog/blogs/reservation-system-for-sport-venue/reservation-system-for-sport-venue.component';
import {NotadoCommonModule} from './other-modules/notado-common.module';
import {
  ReservationSystemAndSecurity
} from '../component/blog/blogs/reservation-system-and-security/reservation-system-and-security.component';
import {ConfigurableBookingFormComponent} from '../component/blog/blogs/configurable-booking-form/configurable-booking-form.component';
import {PaymentsDuringBookingComponent} from '../component/blog/blogs/payments-during-booking/payments-during-booking.component';
import {BookingForDentistsComponent} from '../component/blog/blogs/booking-for-dentists/booking-for-dentists.component';
import {AboutNotadoComponent} from '../component/blog/blogs/about-notado/about-notado.component';
import {NotadoFeaturesComponent} from '../component/blog/blogs/notado-features/notado-features.component';
import {BookingForYogaComponent} from '../component/blog/blogs/booking-for-yoga/booking-for-yoga.component';
import {
  HowOnlineBookingCanRevolutionizeYourHairSalonBusinessComponent
} from '../component/blog/blogs/how-online-booking-can-revolutionize-your-hair-salon-business/how-online-booking-can-revolutionize-your-hair-salon-business.component';
import {PriceComponent} from '../component/blog/blogs/price/price.component';
import {HowItWorksComponent} from '../component/blog/blogs/how-it-works/how-it-works.component';
import {JakubStoryComponent} from '../component/blog/blogs/jakub-story/jakub-story.component';
import {BlogCardCsComponent} from '../component/blog/blog-card-cs/blog-card-cs.component';
import {
  ProKohoJsouRezervacniSystemyComponent
} from '../component/blog/blogs/pro-koho-jsou-rezervacni-systemy/pro-koho-jsou-rezervacni-systemy.component';
import {
  TelefonickeVsOnlineRezervaceComponent
} from '../component/blog/blogs/telefonicke-vs-online-rezervace/telefonicke-vs-online-rezervace.component';
import {BlogTemplateCsComponent} from '../component/blog/blog-template-cs/blog-template-cs.component';
import {ReverzniRezervaceComponent} from '../component/blog/blogs/reverzni-rezervace/reverzni-rezervace.component';
import {
  HistorieRezervacnichSystemuComponent
} from '../component/blog/blogs/historie-rezervacnich-systemu/historie-rezervacnich-systemu.component';
import {MasazStoryComponent} from '../component/blog/blogs/masaz-story/masaz-story.component';
import {GuideForBeginnersComponent} from '../component/blog/blogs/guide-for-beginers/guide-for-beginners.component';
import {
  AdvantagesAndDisadvantagesComponent
} from '../component/blog/blogs/advantages-and-disadvantages/advantages-and-disadvantages.component';
import {KeyFeaturesComponent} from '../component/blog/blogs/key-features/key-features.component';
import {
  JakVybratRezervacniSystemComponent
} from '../component/blog/blogs/jak-vybrat-rezervacni-system/jak-vybrat-rezervacni-system.component';
import {NotadoIntegraceBlogComponent} from '../component/blog/blogs/notado-integrace-blog/notado-integrace-blog.component';
import {SpravaZakaznikuComponent} from '../component/blog/blogs/sprava-zakazniku/sprava-zakazniku.component';
import {ProcNeSystemZdarmaComponent} from '../component/blog/blogs/proc-ne-system-zdarma/proc-ne-system-zdarma.component';
import {
  JednoduchyRezervacniSystemComponent
} from '../component/blog/blogs/jednoduchy-rezervacni-system/jednoduchy-rezervacni-system.component';
import {
  RezervacniSystemProSalonyComponent
} from '../component/blog/blogs/rezervacni-system-pro-salony/rezervacni-system-pro-salony.component';
import {
  RezervacniSystemProFotografyComponent
} from '../component/blog/blogs/rezervacni-system-pro-fotografy/rezervacni-system-pro-fotografy.component';
import {NeravidelnaPracovniDobaComponent} from '../component/blog/blogs/neravidelna-pracovni-doba/neravidelna-pracovni-doba.component';
import {RozhovorSFotografemComponent} from '../component/blog/blogs/rozhovor-s-fotografem/rozhovor-s-fotografem.component';
import {IntegraceNaWebComponent} from '../component/blog/blogs/integrace-na-web/integrace-na-web.component';
import {
  CoJeOnlineRezervacniSystemComponent
} from '../component/blog/blogs/co-je-online-rezervacni-system/co-je-online-rezervacni-system.component';

import {
  RezervacniSystemProPsychologyComponent
} from '../component/blog/blogs/rezervacni-system-pro-psychology/rezervacni-system-pro-psychology.component';
import {BookingCalendarComponent} from '../component/blog/blogs/booking-calendar/booking-calendar.component';
import {CancelingReservationComponent} from '../component/blog/blogs/canceling-reservation/canceling-reservation.component';
import {PermanentkyComponent} from '../component/blog/blogs/permanentky/permanentky.component';
import {KeyguruBlogComponent} from '../component/blog/blogs/keyguru/keyguru-blog.component';


const routes: Routes =
  [
    {
      path: '',
      component: BlogModuleComponent,
      children: [
        {
          path: ':language/blog-list', component: BlogListComponent
        },
        {
          path: ':language/top-5', component: Top5Component
        },
        {
          path: ':language/how-online-booking-can-revolutionize-your-hair-salon-business',
          component: HowOnlineBookingCanRevolutionizeYourHairSalonBusinessComponent
        },
        {
          path: ':language/reservation-system-for-sport-venue',
          component: ReservationSystemForSportVenueComponent
        },
        {
          path: ':language/reservation-system-for-massage',
          component: ReservationSystemForMassageComponent
        },
        {
          path: ':language/reservation-system-and-security',
          component: ReservationSystemAndSecurity
        },
        {
          path: ':language/reservation-system-for-barber',
          component: ReservationSystemForBarberComponent
        },
        {
          path: ':language/configurable-booking-form',
          component: ConfigurableBookingFormComponent
        },
        {
          path: ':language/reservation-system-help-your-business',
          component: ReservationSystemHelpYourBusinessComponent
        },
        {
          path: ':language/google-calendar-as-reservation-system',
          component: GoogleCalendarAsReservationSystemComponent
        },
        {
          path: ':language/payments-during-booking',
          component: PaymentsDuringBookingComponent
        },
        {
          path: ':language/booking-for-dentists',
          component: BookingForDentistsComponent
        },
        {
          path: ':language/booking-for-yoga',
          component: BookingForYogaComponent
        },
        {
          path: ':language/about-notado',
          component: AboutNotadoComponent
        },
        {
          path: ':language/keyguru',
          component: KeyguruBlogComponent
        },
        {
          path: ':language/notado-features',
          component: NotadoFeaturesComponent
        },
        {
          path: ':language/price',
          component: PriceComponent
        },
        {
          path: ':language/jak-funguje-rezervacni-system',
          component: HowItWorksComponent
        },
        {
          path: ':language/jakub-story',
          component: JakubStoryComponent
        }, {
          path: ':language/masaz-story',
          component: MasazStoryComponent
        }, {
          path: ':language/permanentky',
          component: PermanentkyComponent
        },
        {
          path: ':language/pro-koho-jsou-rezervacni-systemy',
          component: ProKohoJsouRezervacniSystemyComponent
        },
        {
          path: ':language/telefonicke-vs-online-rezervace',
          component: TelefonickeVsOnlineRezervaceComponent
        },
        {
          path: ':language/reverzni-rezervace',
          component: ReverzniRezervaceComponent
        },
        {
          path: ':language/historie-rezervacnich-systemu',
          component: HistorieRezervacnichSystemuComponent
        },
        {
          path: ':language/guide-for-beginners',
          component: GuideForBeginnersComponent
        },
        {
          path: ':language/advantages-and-disadvantages',
          component: AdvantagesAndDisadvantagesComponent
        },
        {
          path: ':language/key-features',
          component: KeyFeaturesComponent
        },
        {
          path: ':language/jak-vybrat-rezervacni-system',
          component: JakVybratRezervacniSystemComponent
        },
        {
          path: ':language/notado-integrace-blog',
          component: NotadoIntegraceBlogComponent
        },
        {
          path: ':language/sprava-zakazniku',
          component: SpravaZakaznikuComponent
        },
        {
          path: ':language/proc-ne-system-zdarma',
          component: ProcNeSystemZdarmaComponent
        },
        {
          path: ':language/jednoduchy-rezervacni-system',
          component: JednoduchyRezervacniSystemComponent
        },
        {
          path: ':language/rezervacni-system-pro-salony',
          component: RezervacniSystemProSalonyComponent
        },
        {
          path: ':language/rezervacni-system-pro-fotografy',
          component: RezervacniSystemProFotografyComponent
        },
        {
          path: ':language/rezervacni-system-pro-psychology',
          component: RezervacniSystemProPsychologyComponent
        }, {
          path: ':language/booking-calendar',
          component: BookingCalendarComponent
        },
        {
          path: ':language/rozhovor-s-fotografem',
          component: RozhovorSFotografemComponent
        },
        {
          path: ':language/neravidelna-pracovni-doba',
          component: NeravidelnaPracovniDobaComponent
        },
        {
          path: ':language/integrace-na-web',
          component: IntegraceNaWebComponent
        },
        {
          path: ':language/co-je-online-rezervacni-system',
          component: CoJeOnlineRezervacniSystemComponent
        },
        {
          path: ':language/canceling-reservation',
          component: CancelingReservationComponent
        },
        {path: '**', component: Error404Component}
      ]
    },
  ];

@NgModule({
  imports: [RouterModule.forChild(routes),
    NotadoCommonModule,
    ReactiveFormsModule,
    // Set main theme
    // Add components
    CommonModule,
    HammerModule,
    CancelingReservationComponent,
    MenuBlogComponent,
    BlogModuleComponent,
    Top5Component,
    ReservationSystemHelpYourBusinessComponent,
    GoogleCalendarAsReservationSystemComponent,
    ReservationSystemForBarberComponent,
    ReservationSystemForMassageComponent,
    ReservationSystemForSportVenueComponent,
    ReservationSystemAndSecurity,
    BlogListComponent,
    BlogCardComponent,
    BlogCardCsComponent,
    BlogTemplateComponent,
    BlogTemplateCsComponent,
    ConfigurableBookingFormComponent,
    PaymentsDuringBookingComponent,
    AboutNotadoComponent,
    BookingForDentistsComponent,
    BookingForYogaComponent,
    NotadoFeaturesComponent,
    HowOnlineBookingCanRevolutionizeYourHairSalonBusinessComponent,
    PriceComponent,
    HowItWorksComponent,
    JakubStoryComponent,
    MasazStoryComponent,
    ProKohoJsouRezervacniSystemyComponent,
    TelefonickeVsOnlineRezervaceComponent,
    ReverzniRezervaceComponent,
    HistorieRezervacnichSystemuComponent,
    GuideForBeginnersComponent,
    AdvantagesAndDisadvantagesComponent,
    KeyFeaturesComponent,
    JakVybratRezervacniSystemComponent,
    NotadoIntegraceBlogComponent,
    SpravaZakaznikuComponent,
    ProcNeSystemZdarmaComponent,
    JednoduchyRezervacniSystemComponent,
    RezervacniSystemProSalonyComponent,
    BlogCardComponent,
    RezervacniSystemProFotografyComponent,
    RezervacniSystemProPsychologyComponent,
    NeravidelnaPracovniDobaComponent,
    RozhovorSFotografemComponent,
    IntegraceNaWebComponent,
    CoJeOnlineRezervacniSystemComponent,
    BookingCalendarComponent
    // TryButtonFeatureConfigCheckboxComponent,
    // FooterComponent,
  ], providers: [
    // secure module
    NgbModal,
    {provide: LY_THEME, useClass: MinimaLight, multi: true}, // name: `minima-light`
    {provide: LY_THEME, useClass: MinimaDark, multi: true}, // name: `minima-dark`
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandlerService
    },
    provideHttpClient(withInterceptorsFromDi())
  ]
})
export class BlogModule {

}
