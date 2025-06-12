import {Component, EventEmitter, Input, Output} from '@angular/core';
import {LanguageService} from '../../../../../projects/notado-lib/src/lib/service/language.service';
import {TranslateModule} from '@ngx-translate/core';
import {RouterLink} from '@angular/router';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-try-button-feature-config-checkbox',
  templateUrl: './try-button-feature-config-checkbox.component.html',
  styleUrls: ['./try-button-feature-config-checkbox.component.scss'],
  imports: [
    TranslateModule,
    RouterLink,
    NgIf
  ],
  standalone: true
})
export class TryButtonFeatureConfigCheckboxComponent {

  @Input() label: string = '';
  @Input() icon: string = '';
  isChecked: boolean = false;

  @Output('checkAction')
  public checkAction: EventEmitter<any> = new EventEmitter();

  toggleCheck() {
    this.isChecked = !this.isChecked;
    this.checkAction.emit({label: this.label, checked: this.isChecked});
  }
}


