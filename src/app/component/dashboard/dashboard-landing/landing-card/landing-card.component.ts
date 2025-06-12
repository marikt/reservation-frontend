import {Component} from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-landing-card',
  templateUrl: './landing-card.component.html',
  styleUrls: ['./landing-card.component.scss'],
  imports: [
    TranslateModule,
    FormsModule,
    NgForOf,
    NgIf
  ],
  standalone: true
})
export class LandingCardComponent {

  }
