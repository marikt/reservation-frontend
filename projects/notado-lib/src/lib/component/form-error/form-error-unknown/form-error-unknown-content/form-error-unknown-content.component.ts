import {Component, OnInit} from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-error-unknown-content',
  templateUrl: './form-error-unknown-content.component.html',
  standalone: true,
  imports: [
    TranslateModule
  ],
  styleUrls: ['./form-error-unknown-content.component.scss']
})
export class FormErrorUnknownContentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public refreshPage() {
    window.location.href = '/';
    window.location.reload();
  }
}
