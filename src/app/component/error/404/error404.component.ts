import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {AuthService} from '../../../../../projects/notado-lib/src/lib/security/service/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-error404',
  templateUrl: './error404.component.html',
  styleUrls: ['./error404.component.scss'],
  standalone: true
})
export class Error404Component implements OnInit {

  constructor(public translate: TranslateService,
              public authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
    if (this.authService.user) {
      this.router.navigate(['/dashboard/dashboard-landing']);
    } else {
      this.router.navigate(['/home']);
    }
  }

}
