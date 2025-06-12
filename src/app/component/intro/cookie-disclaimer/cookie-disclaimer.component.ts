import {Component, OnInit} from '@angular/core';
import {CONST} from '../../../../../projects/notado-lib/src/lib/util/const';
import {LocalStorageService} from '../../../../../projects/notado-lib/src/lib/service/local-storage.service';
import {TranslateModule} from '@ngx-translate/core';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-cookie-disclaimer',
  templateUrl: './cookie-disclaimer.component.html',
  styleUrls: ['./cookie-disclaimer.component.scss'],
  imports: [
    TranslateModule,
    NgIf
  ],
  standalone: true
})
export class CookieDisclaimerComponent implements OnInit {

  public hide: boolean = true;

  constructor(public localStorage: LocalStorageService) {
  }

  ngOnInit(): void {
    const showTmp = this.localStorage.get(CONST.COOKIE_DISCLAIMER);
    if (!showTmp) {
      this.hide = false;
    } else {
      this.hide = true;
    }
  }

  public acceptCookies(): void {
    this.localStorage.set(CONST.COOKIE_DISCLAIMER, true);
    this.hide = true;
  }

  public declineCookies(): void {
    this.localStorage.set(CONST.COOKIE_DISCLAIMER, true);
    this.hide = true;
  }
}
