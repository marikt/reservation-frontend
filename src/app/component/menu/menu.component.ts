import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {UserService} from '../../../../projects/notado-lib/src/lib/security/service/user.service';
import {AuthService} from '../../../../projects/notado-lib/src/lib/security/service/auth.service';
import {NavbarService} from '../../service/navbar.service';
import {LanguageService} from '../../../../projects/notado-lib/src/lib/service/language.service';
import {ModalService} from '../../../../projects/notado-lib/src/lib/service/modal.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MenuState} from '../util/menu-state';
import {TranslateModule} from '@ngx-translate/core';
import {NgbCollapse} from '@ng-bootstrap/ng-bootstrap';
import {MenuWhatWeKnowComponent} from '../intro/menu/menu-what-we-know/menu-what-we-know.component';
import {MenuAudianceComponent} from '../intro/menu/menu-audiance/menu-audiance.component';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  animations: [
    trigger('audienceMenu', [
      state('OPEN', style({
        opacity: 1
      })),
      state('CLOSE', style({
        opacity: 0
      })),
      transition('OPEN => CLOSE', [
        animate('0.2s')
      ]),
      transition('CLOSE => OPEN', [
        animate('0.2s')
      ]),
    ]),
  ],
  imports: [
    RouterLink,
    TranslateModule,
    NgbCollapse,
    MenuWhatWeKnowComponent,
    MenuAudianceComponent,
    NgIf,
    RouterLinkActive,
    NgForOf
  ],
  standalone: true
})
export class MenuComponent implements OnInit {

  public audienceMenuCollapsed: boolean = true;
  public whatWeKnowMenuCollapsed: boolean = true;
  public showMobileMenu: boolean = false;

  constructor(public router: Router,
              public userService: UserService,
              public authService: AuthService,
              public navbarService: NavbarService,
              public languageService: LanguageService,
              public modalService: ModalService) {
  }

  ngOnInit(): void {
    this.router.events.subscribe(
      () => {
        this.audienceMenuCollapsed = true;
        this.whatWeKnowMenuCollapsed = true;
      });
  }

  public get menuStateEnum(): typeof MenuState {
    return MenuState;
  }

  getFlagPostfix(lang: string) {
    if (lang === 'cs') {
      return 'cz'
    }
    if (lang === 'en') {
      return 'gb'
    }

    return lang;
  }
}
