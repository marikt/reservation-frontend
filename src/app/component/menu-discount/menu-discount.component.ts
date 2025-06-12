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
  selector: 'app-menu-discount',
  templateUrl: './menu-discount.component.html',
  styleUrls: ['./menu-discount.component.scss'],
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
export class MenuDiscountComponent implements OnInit {


  constructor(public router: Router,
              public userService: UserService,
              public authService: AuthService,
              public navbarService: NavbarService,
              public languageService: LanguageService,
              public modalService: ModalService) {
  }

  ngOnInit(): void {
  }

}
