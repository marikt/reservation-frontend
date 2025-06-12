import {Component, OnInit} from '@angular/core';
import {LanguageService} from '../../../../../projects/notado-lib/src/lib/service/language.service';
import {TranslateModule} from '@ngx-translate/core';
import {RouterLink} from '@angular/router';
import {NgForOf, NgClass} from '@angular/common';
import {TryButtonFeatureConfigCheckboxComponent} from '../try-button-feature-config-checkbox/try-button-feature-config-checkbox.component';

@Component({
  selector: 'app-try-button-with-config',
  templateUrl: './try-button-with-config.component.html',
  styleUrls: ['./try-button-with-config.component.scss'],
  imports: [
    TranslateModule,
    RouterLink,
    NgForOf,
    NgClass,
    TryButtonFeatureConfigCheckboxComponent
  ],
  standalone: true
})
export class TryButtonWithConfigComponent implements OnInit {
  public configFeatures: ConfigFeature[] = [];
  public featureStack: string[] = [];
  public selectedFeature: string = 'default';
  biggerButton: string = 'normal-button';

  constructor(public languageService: LanguageService) {
  }

  ngOnInit(): void {
    this.configFeatures.push(new ConfigFeature('fas fa-cut', 'APPOINTMENT'));
    this.configFeatures.push(new ConfigFeature('fas fa-graduation-cap', 'COURSE'));
    this.configFeatures.push(new ConfigFeature('fas fa-calendar-alt', 'CALENDAR'));
    this.configFeatures.push(new ConfigFeature('fas fa-ticket-alt', 'COUPON'));
    this.configFeatures.push(new ConfigFeature('fas fa-sms', 'NOTIFICATIONS'));
    this.configFeatures.push(new ConfigFeature('fas fa-palette', 'DESIGN'));
  }

  public featureSelected($event: any): void {
    const feature = $event.label.toLowerCase();
    const featureElement = document.querySelector('.feature-background');
    
    if (featureElement) {
      // Add a transition class to enhance the effect
      featureElement.classList.add('transitioning');
    }

    if ($event.checked) {
      // Add to stack if checked
      this.featureStack.push(feature);
    } else {
      // Remove from stack if unchecked
      const index = this.featureStack.indexOf(feature);
      if (index !== -1) {
        this.featureStack.splice(index, 1);
      }
    }

    // Update selectedFeature to the top of the stack or 'default' if empty
    this.selectedFeature = this.featureStack.length > 0 ? this.featureStack[this.featureStack.length - 1] : 'default';

    // Remove the transition class after the transition completes
    setTimeout(() => {
      if (featureElement) {
        featureElement.classList.remove('transitioning');
      }
    }, 800); // Match this with the transition duration in CSS

    this.biggerButton = 'bigger-button';
    setTimeout(() => {
      this.biggerButton = 'normal-button';
    }, 200);
  }
}

export class ConfigFeature {
  public icon: string;
  public label: string;

  constructor(icon: string, label: string) {
    this.icon = icon;
    this.label = label;
  }
}


