import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-wizard-module',
  templateUrl: './wizard-module.component.html',
  styleUrls: ['./wizard-module.component.scss'],
  imports: [
    RouterOutlet
  ],
  standalone: true
})
export class WizardModuleComponent {


  constructor(
  ) {
  }

}
