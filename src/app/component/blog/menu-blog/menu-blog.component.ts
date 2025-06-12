import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {UserService} from "../../../../../projects/notado-lib/src/lib/security/service/user.service";
import {AuthService} from "../../../../../projects/notado-lib/src/lib/security/service/auth.service";
import {NavbarService} from "../../../service/navbar.service";
import {LanguageService} from "../../../../../projects/notado-lib/src/lib/service/language.service";
import {ModalService} from "../../../../../projects/notado-lib/src/lib/service/modal.service";
import {MenuState} from "../../util/menu-state";
import {NgForOf, NgIf} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-menu-blog',
  templateUrl: './menu-blog.component.html',
  styleUrls: ['./menu-blog.component.scss'],
  imports: [
    NgForOf,
    NgIf,
    RouterLink,
    TranslateModule,
    RouterLinkActive
  ],
  standalone: true
})
export class MenuBlogComponent implements OnInit {

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

  }

  public get menuStateEnum(): typeof MenuState {
    return MenuState;
  }

}
