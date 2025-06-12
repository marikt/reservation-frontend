import {MetaService} from '../../service/meta.service';
import {Component, OnInit} from '@angular/core';

import {AlertService} from '../../../../projects/notado-lib/src/lib/service/alert.service';
import {SpinnerService} from '../../../../projects/notado-lib/src/lib/service/spinner.service';
import {SecurityUser} from '../../../../projects/notado-lib/src/lib/security/model/security-user';
import {AuthService} from '../../../../projects/notado-lib/src/lib/security/service/auth.service';
import {SetMeta} from '../../../../projects/notado-lib/src/lib/util/set-meta';
import {ModalService} from '../../../../projects/notado-lib/src/lib/service/modal.service';
import {Server} from '../../../../projects/notado-lib/src/config/server';
import {HttpStatus} from '../../../../projects/notado-lib/src/lib/util/http-status';
import {CONST} from '../../../../projects/notado-lib/src/lib/util/const';
import {LanguageService} from '../../../../projects/notado-lib/src/lib/service/language.service';
import {LocalStorageService} from '../../../../projects/notado-lib/src/lib/service/local-storage.service';
import {TranslateModule} from '@ngx-translate/core';
import {NgbAlert} from '@ng-bootstrap/ng-bootstrap';
import {NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {NgxFlickeringGridComponent} from '@omnedia/ngx-flickering-grid';
import {NgxBackgroundBeamsComponent} from '@omnedia/ngx-background-beams';
import {HttpService} from '../../../../projects/notado-lib/src/lib/service/http.service';
import {Api} from '../../../../projects/notado-lib/src/lib/enum/api';
import {Business} from '../../../../projects/notado-lib/src/lib/model/business';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  imports: [
    TranslateModule,
    NgbAlert,
    NgIf,
    NgForOf,
    FormsModule,
    RouterLink,
    NgxFlickeringGridComponent,
    NgxBackgroundBeamsComponent
  ],
  standalone: true
})
export class SignupComponent implements SetMeta, OnInit {


  public user: SecurityUser;
  public accountAlreadyExists: boolean;
  public emailNotExists: boolean;
  public licenceAgree: boolean = true;


  constructor(public authService: AuthService,
              public spinnerService: SpinnerService,
              public alertService: AlertService,
              public metaService: MetaService,
              public modalService: ModalService,
              public localStorage: LocalStorageService,
              public languageService: LanguageService,
              public server: Server,
              public router: Router,
              public http: HttpService) {
  }

  ngOnInit() {
    this.setMeta();
    this.accountAlreadyExists = false;
    this.emailNotExists = false;
    // emailNotExists
    this.user = new SecurityUser();
  }

  public signup(): void {
    this.accountAlreadyExists = false;
    this.localStorage.add(CONST.NEW_USER, true);
    this.authService.signup(this.user, (status) => {
      if (status === HttpStatus.ACCEPTED) {
        this.accountAlreadyExists = true;
        this.http.post(Api.BUSINESS + '/default-for-user/' + this.user.id + '/' + this.languageService.language, {}, (business: Business) => {
        });
      }
    });
  }

  public setMeta(): void {
    this.metaService.setMetaData('META.LOGIN');
  }

  public signUpWithGoogle() {
    this.localStorage.add(CONST.NEW_USER, true);
    window.location.href = this.server.SERVER + 'oauth2/authorization/google';
    // window.location.href = 'https://www.notado.cz:8443/oauth2/authorization/google';
  }
}
