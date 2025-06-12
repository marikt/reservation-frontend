import {Component, OnInit} from '@angular/core';
import {SetMeta} from '../../../../../../projects/notado-lib/src/lib/util/set-meta';
import {MetaService} from '../../../../service/meta.service';
import {BlogTemplateComponent} from '../../blog-template/blog-template.component';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-reservation-system-for-massage',
  templateUrl: './reservation-system-for-massage.component.html',
  styleUrls: ['./reservation-system-for-massage.component.scss'],
  imports: [
    BlogTemplateComponent,
    TranslateModule
  ],
  standalone: true
})
export class ReservationSystemForMassageComponent implements OnInit, SetMeta {


  constructor(private metaService: MetaService) {

  }

  ngOnInit(): void {
    this.setMeta();
  }

  setMeta(): void {
    this.metaService.setMetaData('META.BLOG_04');
  }

}
