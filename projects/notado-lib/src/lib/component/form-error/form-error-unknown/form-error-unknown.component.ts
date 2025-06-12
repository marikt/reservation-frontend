import {Component, OnInit} from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';
import {FormService} from '../../../service/form.service';

@Component({
  selector: 'app-error-unknown',
  templateUrl: './form-error-unknown.component.html',
  standalone: true,
  imports: [
    TranslateModule
  ],
  styleUrls: ['./form-error-unknown.component.scss']
})
export class FormErrorUnknownComponent implements OnInit {
  public countdown: number = 5;

  constructor(public formService: FormService,
  ) {
  }

  ngOnInit(): void {

    const intervalId = setInterval(() => {
      console.log(this.countdown); // log the countdown value
      this.countdown--;
      if (this.countdown < 0) {
        clearInterval(intervalId); // stop the interval when countdown reaches 0
      }
    }, 1000);

    setTimeout(() => {
        this.formService.openReservationFormForProduction();
      },
      5_000
    );
  }

}
