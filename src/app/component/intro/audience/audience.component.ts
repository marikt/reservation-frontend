import {Component, OnInit} from '@angular/core';
import {LanguageService} from '../../../../../projects/notado-lib/src/lib/service/language.service';
import {TranslateModule} from '@ngx-translate/core';
import {RouterLink} from '@angular/router';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-audience',
  templateUrl: './audience.component.html',
  styleUrls: ['./audience.component.scss'],
  imports: [
    TranslateModule,
    RouterLink,
    NgForOf
  ],
  standalone: true
})
export class AudienceComponent implements OnInit {

  public industries: Industry[] = [];

  constructor(public languageService: LanguageService, ) {
  }

  ngOnInit(): void {
    this.createIndustries();
  }


  private createIndustries(): void {
    this.industries = [];
    this.industries.push(new Industry('BEAUTY', 'haircut', 'for-beauty'));
    this.industries.push(new Industry('EVENTS', 'vr', 'for-events'));
    this.industries.push(new Industry('SPORT', 'yoga', 'for-sport'));
    this.industries.push(new Industry('EDUCATION', 'education', 'for-education'));
    // this.industries.push(new Industry('HEALTH', 'doctor', 'for-health'));
    // this.industries.push(new Industry('PHOTO', 'doctor', 'for-health'));

  }
}

export class Industry {

  public title: string;
  public img: string;
  public link: string;

  constructor(title: string, img: string, link: string) {
    this.title = title;
    this.img = img;
    this.link = link;
  }

}
