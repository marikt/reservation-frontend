import {Component, OnInit} from '@angular/core';
import {NavigationStart, Router, RouterOutlet} from '@angular/router';
import {AuthService} from '../../../../../projects/notado-lib/src/lib/security/service/auth.service';
import {BroadcastService} from '../../../../../projects/notado-lib/src/lib/service/broadcast.service';
import {AutoRedirectService} from '../../../service/auto-redirect.service';
import {LanguageService} from '../../../../../projects/notado-lib/src/lib/service/language.service';
import {MySubscribable} from '../../../../../projects/notado-lib/src/lib/util/my-subscribable';
import {environment} from '../../../environments/environment';
import {NavbarService} from '../../../service/navbar.service';
import {Server} from '../../../../../projects/notado-lib/src/config/server';
import {MenuComponent} from '../../../component/menu/menu.component';
import {FooterComponent} from '../../../component/intro/footer/footer.component';

@Component({
  selector: 'app-intro-module',
  templateUrl: './for-audience-module.component.html',
  styleUrls: ['./for-audience-module.component.scss'],
  imports: [
    MenuComponent,
    RouterOutlet,
    FooterComponent
  ],
  standalone: true
})
export class ForAudienceModuleComponent extends MySubscribable implements OnInit {

  public route: string = '';
  public environment: any;
  public isMobile: boolean;
  //
  // @ViewChild('paymentModal')
  // public paymentModal: any;

  constructor(
    public authService: AuthService,
    public broadcastService: BroadcastService,
    public router: Router,
    public autoRedirectService: AutoRedirectService, // init the service to activate subscribe
    public languageService: LanguageService,
    public navbarService: NavbarService,
    public server: Server
  ) {
    super(broadcastService);

    this.environment = environment;
  }

  ngOnInit() {
    this.languageService.initLanguage();
    // scroll on top when redirect
    this.router.events.subscribe(
      (evt) => {
        window.scrollTo(0, 0);
        if (evt instanceof NavigationStart) {
          this.route = evt.url;
          if (this.route === '/') {
            this.route = '/intro';
          }
        }
      });
  }
}
