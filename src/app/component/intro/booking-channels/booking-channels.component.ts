import {Component, OnInit} from '@angular/core';
import {LanguageService} from '../../../../../projects/notado-lib/src/lib/service/language.service';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-booking-channels',
  templateUrl: './booking-channels.component.html',
  styleUrls: ['./booking-channels.component.scss'],
  imports: [
    TranslateModule
  ],
  standalone: true
})
export class BookingChannelsComponent implements OnInit {
  activeCard: string = 'WIDGET';


  constructor(
    public languageService: LanguageService
  ) {
  }

  ngOnInit(): void {
  }

}

