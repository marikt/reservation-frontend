import {Component, Input, OnInit} from '@angular/core';
import {ModalService} from '../../../../../projects/notado-lib/src/lib/service/modal.service';
import {LanguageService} from '../../../../../projects/notado-lib/src/lib/service/language.service';
import {TranslateModule} from '@ngx-translate/core';
import {JsonPipe, NgForOf, NgIf} from '@angular/common';
import {TextShortPipe} from '../../../../../projects/notado-lib/src/lib/pipe/text-short.pipe';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
  imports: [
    TranslateModule,
    NgForOf,
    NgIf,
    TextShortPipe,
    JsonPipe
  ],
  standalone: true
})
export class FeedbackComponent implements OnInit {

  public feedbacks: Feedback[] = [];
  public googleReviews: GoogleReview[] = [];
  public selectedGoogleReview: GoogleReview;

  @Input('feedbackOnly')
  public feedbackOnly: boolean = false;
  activeIndex: number = 0;
  reviewsPerSlide: number = 3;

  constructor(public modalService: ModalService,
              public languageService: LanguageService) {
  }

  ngOnInit() {
    this.feedbacks.push(new Feedback('https://www.azylprozviratahk.cz/rezervace/'));
    this.feedbacks.push(new Feedback('https://rkmasaze.cz/'));
    this.feedbacks.push(new Feedback('https://www.masaze-lana.sk/'));
    this.feedbacks.push(new Feedback('https://www.techgear.cz/rezervace/'));
    this.feedbacks.push(new Feedback('https://www.krasotinka.sk/'));
    this.feedbacks.push(new Feedback('https://www.mysteryroom.cz/'));
    this.feedbacks.push(new Feedback('https://www.hobbycentrum4.cz/'));
    this.feedbacks.push(new Feedback('https://www.protetika-ergona.cz/vyjezdova-mista/'));
    this.feedbacks.push(new Feedback('https://studiostrojirna.cz'));
    this.feedbacks.push(new Feedback('https://www.czechcricket.cz'));

    this.googleReviews.push(new GoogleReview(0, 'ksk', 'Kozmetické štúdio KRASOTINKA'));
    this.googleReviews.push(new GoogleReview(1, 'ic', 'Ivan Čermák'));
    this.googleReviews.push(new GoogleReview(2, 'mw', 'Monika Wildnerová'));
    this.googleReviews.push(new GoogleReview(3, 'tm', 'Tomáš Malý'));
    this.googleReviews.push(new GoogleReview(4, 'jb', 'Jasmina Bosanacova'));
    this.googleReviews.push(new GoogleReview(5, 'dn', 'Dana Ostrovská'));
    this.googleReviews.push(new GoogleReview(6, 'mm', 'Michal michalll'));
    this.googleReviews.push(new GoogleReview(7, 'mm2', 'Mirka Marková'));
    this.googleReviews.push(new GoogleReview(8, 'v', 'Výměník'));
    this.googleReviews.push(new GoogleReview(9, 'rk', 'Renata K'));
    this.googleReviews.push(new GoogleReview(10, 'tk', 'Tomáš K.'));
    this.googleReviews.push(new GoogleReview(11, 'tkf', 'Tyna K'));
    this.googleReviews.push(new GoogleReview(12, 'isr', 'infosvatebniraj'));
    this.googleReviews.push(new GoogleReview(13, 'jh', 'Jan Homola'));
  }

  calculateReviewsPerSlide(): void {
    this.reviewsPerSlide = 3
    // const screenWidth = window.innerWidth;
    // if (screenWidth >= 992) {
    //   this.reviewsPerSlide = 3; // Large screens
    // } else if (screenWidth >= 768) {
    //   this.reviewsPerSlide = 2; // Medium screens
    // } else {
    //   this.reviewsPerSlide = 1; // Small screens
    // }
  }

  previousSlide(): void {
    this.activeIndex = (this.activeIndex - 1 + this.googleReviews.length) % this.googleReviews.length;
  }

  nextSlide(): void {
    this.activeIndex = (this.activeIndex + 1) % this.googleReviews.length;
  }


  getVisibleReviews(): any[] {
    const reviewsPerSlide = this.calculateReviewsPerSlide();
    const start = this.activeIndex;
    const end = start + this.reviewsPerSlide;

    return [...this.googleReviews.slice(start, end), ...this.googleReviews.slice(0, end > this.googleReviews.length ? end - this.googleReviews.length : 0)];
  }
}

export class Feedback {
  public url: string;
  public img: number;

  constructor(url: string, img?: number) {
    this.url = url;
    this.img = img;
  }
}

export class GoogleReview {
  public id: number;
  public img: string;
  public name: string;

  constructor(id: number, img: string, name: string) {
    this.id = id;
    this.img = img;
    this.name = name;
  }
}


