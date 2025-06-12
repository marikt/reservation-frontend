import {Component} from '@angular/core';
import {IntroItemRevertComponent} from '../intro-item-revert/intro-item-revert.component';
import {IntroItemComponent} from '../intro-item/intro-item.component';
import {TryButtonComponent} from '../try-button/try-button.component';

@Component({
  selector: 'app-ways-how-use-notado',
  templateUrl: './ways-how-use-notado.component.html',
  styleUrls: ['./ways-how-use-notado.component.scss'],
  imports: [
    IntroItemRevertComponent,
    IntroItemComponent,
    TryButtonComponent
  ],
  standalone: true
})

export class WaysHowUseNotadoComponent {


}


