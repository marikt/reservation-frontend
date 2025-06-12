import {Component, OnInit} from '@angular/core';
import {CONST} from '../../../util/const';
import {LocalStorageService} from '../../../service/local-storage.service';

@Component({
    selector: 'app-set-as-owner',
    templateUrl: './set-as-owner.component.html',
    styleUrls: ['./set-as-owner.component.scss'],
    standalone: true
})
export class SetAsOwnerComponent implements OnInit {

  constructor(
    private localStorage: LocalStorageService,
  ) {
  }

  ngOnInit() {
    this.localStorage.set(CONST.OWNER, true);
  }

}
