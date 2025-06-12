import {Component, OnInit} from '@angular/core';
import {SetMeta} from '../../../../../../projects/notado-lib/src/lib/util/set-meta';
import {MetaService} from '../../../../service/meta.service';
import {TranslateModule} from '@ngx-translate/core';
import {BlogTemplateComponent} from '../../blog-template/blog-template.component';

@Component({
  selector: 'app-reservation-system-for-sport-venue',
  templateUrl: './reservation-system-for-sport-venue.component.html',
  styleUrls: ['./reservation-system-for-sport-venue.component.scss'],
  imports: [
    TranslateModule,
    BlogTemplateComponent
  ],
  standalone: true
})
export class ReservationSystemForSportVenueComponent implements OnInit, SetMeta {


  constructor(private metaService: MetaService) {

  }

  ngOnInit(): void {
    this.setMeta();
  }

  setMeta(): void {
    this.metaService.setCsMetaData('Online rezervační systém pro sportoviště | Notado Blog', 'Ať už provozujete malé nebo velké sportovní zařízení, efektivní rezervační systém je nezbytný pro bezproblémový provoz. V článku se dozvíte o výhodách používání rezervačního systému pro sportoviště, jak vybrat ten správný a jak Notado může pomoci zefektivnit vaše podnikání v oblasti sportu.');
  }

}
