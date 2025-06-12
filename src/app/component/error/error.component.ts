import {Component, OnInit} from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
  imports: [
    TranslateModule
  ],
  standalone: true
})
export class ErrorComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }


    public refresh(): void {
        window.location.reload()
    }
}
