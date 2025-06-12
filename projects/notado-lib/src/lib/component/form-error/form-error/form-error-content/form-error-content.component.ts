import {Component, OnInit} from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-error-content',
  templateUrl: './form-error-content.component.html',
  styleUrls: ['./form-error-content.component.scss'],
  imports: [
    TranslateModule,
    NgIf
  ],
  standalone: true
})
export class FormErrorContentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public refreshPage() {
    window.location.href = '/';
    window.location.reload();
  }
}
