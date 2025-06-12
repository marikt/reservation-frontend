import {MetaService} from '../../service/meta.service';
import {Component, Input} from '@angular/core';

import {AlertService} from '../../../../projects/notado-lib/src/lib/service/alert.service';
import {SpinnerService} from '../../../../projects/notado-lib/src/lib/service/spinner.service';
import {SecurityUser} from '../../../../projects/notado-lib/src/lib/security/model/security-user';
import {AuthService} from '../../../../projects/notado-lib/src/lib/security/service/auth.service';
import {BroadcastService} from '../../../../projects/notado-lib/src/lib/service/broadcast.service';
import {MySubscribable} from '../../../../projects/notado-lib/src/lib/util/my-subscribable';
import {SecureApi} from '../../../../projects/notado-lib/src/lib/security/util/secure-api';
import {SetMeta} from '../../../../projects/notado-lib/src/lib/util/set-meta';
import {ModalService} from '../../../../projects/notado-lib/src/lib/service/modal.service';
import {Server} from '../../../../projects/notado-lib/src/config/server';
import {HttpService} from '../../../../projects/notado-lib/src/lib/service/http.service';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {NgForOf, NgIf} from '@angular/common';
import {NgbAlert} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {NgxFlickeringGridComponent} from '@omnedia/ngx-flickering-grid';


@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.scss'],
  imports: [
    TranslateModule,
    NgIf,
    NgbAlert,
    FormsModule,
    NgForOf,
    RouterLink,
    NgxFlickeringGridComponent
  ],
  standalone: true
})
export class JoinComponent extends MySubscribable implements SetMeta {

  @Input() public title: string;

  public user: SecurityUser;
  public badCredentials: boolean;
  public emailNotExists: boolean;
  public showValidation: boolean = false;

  constructor(public broadcastService: BroadcastService,
              public authService: AuthService,
              private http: HttpService,
              public spinnerService: SpinnerService,
              public alertService: AlertService,
              public metaService: MetaService,
              public modalService: ModalService,
              public server: Server,
              public translate: TranslateService,
              public router: Router,
              private route: ActivatedRoute) {
    super(broadcastService);
  }

  ngOnInit() {
    this.setMeta();
    this.badCredentials = false;
    this.emailNotExists = false;
    // emailNotExists
    this.user = new SecurityUser();

    const email: string = this.route.snapshot.params.email;
    const password: string = this.route.snapshot.params.password;

    if (email && password) {
      this.user.email = email;
      this.user.password = password;
      this.authService.login(this.user, () => this.badCredentials = true);
    }
  }

  public login(): void {
    this.badCredentials = false;
    this.authService.login(this.user, () => this.badCredentials = true);
  }

  public sendPassword(): void {
    this.spinnerService.show();
    this.emailNotExists = false;
    const param = '?email=' + this.user.email;

    this.http.get(SecureApi.SEND_PASSWORD + param, () => {
        this.spinnerService.hide();
        this.alertService.addInfo(this.translate.instant('ALERT.PASSWORD_SENT') + ' ' + this.user.email);
      }
    );
  }

  public joinWithGoogle() {
    // window.location.href = 'https://www.notado.cz:8443/oauth2/authorization/google';
    //
    window.location.href = this.server.SERVER + 'oauth2/authorization/google';

  }

  public setMeta(): void {
    this.metaService.setMetaData('META.LOGIN');
  }

}
