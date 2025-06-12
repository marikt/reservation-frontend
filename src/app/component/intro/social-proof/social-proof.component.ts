import {Component, HostListener, OnInit} from '@angular/core';
import {LanguageService} from '../../../../../projects/notado-lib/src/lib/service/language.service';
import {VideoTutorialComponent} from '../../video-tutorial/video-tutorial.component';
import {TranslateModule} from '@ngx-translate/core';
import {RouterLink} from '@angular/router';
import {NgForOf, NgIf} from '@angular/common';
import {Feedback} from '../feedback/feedback.component';
import {NgbTooltip} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-social-proof',
  templateUrl: './social-proof.component.html',
  styleUrls: ['./social-proof.component.scss'],
  imports: [
    VideoTutorialComponent,
    TranslateModule,
    RouterLink,
    NgIf,
    NgForOf,
    NgbTooltip
  ],
  standalone: true
})
export class SocialProofComponent implements OnInit {

  public feedbacks: Feedback[] = [];

  constructor(public languageService: LanguageService) {
  }

  ngOnInit(): void {
      this.feedbacks.push(new Feedback('https://rkmasaze.cz/', 1));
      this.feedbacks.push(new Feedback('https://www.masaze-lana.sk/', 2));
      this.feedbacks.push(new Feedback('https://www.techgear.cz/rezervace/', 3));
      // this.feedbacks.push(new Feedback('https://www.hobbycentrum4.cz/', 6));
      this.feedbacks.push(new Feedback('https://www.czechcricket.cz', 9));
    }

}

