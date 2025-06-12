import {Component, OnInit} from '@angular/core';
import {SetMeta} from '../../../../../projects/notado-lib/src/lib/util/set-meta';
import {MetaService} from '../../../service/meta.service';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-price-comparison',
  templateUrl: './price-comparison.component.html',
  styleUrls: ['./price-comparison.component.scss'],
  imports: [
    RouterLink
  ],
  standalone: true
})
export class PriceComparisonComponent implements OnInit, SetMeta {

  constructor(public metaService: MetaService,) {
  }

  ngOnInit(): void {
    this.setMeta();
  }

  public setMeta(): void {
    this.metaService.setMetaData('Srovnání ceny s konkurencí');
  }

}
