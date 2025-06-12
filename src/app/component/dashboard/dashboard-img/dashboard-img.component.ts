import {Component, OnInit} from '@angular/core';
import {PexelService} from '../../../service/pexel.service';
import {PexelImg} from '../../../model/pexel-img';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-dashboard-img',
  templateUrl: './dashboard-img.component.html',
  styleUrls: ['./dashboard-img.component.scss'],
  imports: [
    TranslateModule,
    FormsModule,
    NgForOf,
    NgIf
  ],
  standalone: true
})
export class DashboardImgComponent implements OnInit {

    public imgs: PexelImg[] = [];
    public searchKey: any;

    constructor(
        private pexelService: PexelService
    ) {

    }

    ngOnInit() {
        this.pexelService.getImages('people', (imgs: PexelImg[]) => {
            this.imgs = imgs;
        });
    }

    public search() {
        this.pexelService.getImages(this.searchKey, (imgs: PexelImg[]) => {
            this.imgs = imgs;
        });
    }
}
