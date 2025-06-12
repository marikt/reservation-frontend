import {Component, OnInit} from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';
import {FormService} from '../../../service/form.service';

@Component({
  selector: 'app-error',
  templateUrl: './form-error.component.html',
  styleUrls: ['./form-error.component.scss'],
  imports: [
    TranslateModule
  ],
  standalone: true
})
export class FormErrorComponent implements OnInit {
  public countdown: number = 5;

  constructor(    public formService: FormService,
  ) { }

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
