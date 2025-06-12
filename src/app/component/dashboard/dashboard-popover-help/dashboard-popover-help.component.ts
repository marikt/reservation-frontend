import {Component, Input} from '@angular/core';
import {NgbPopoverConfig, NgbPopoverModule} from '@ng-bootstrap/ng-bootstrap';
import {TranslateModule} from '@ngx-translate/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-dashboard-popover-help',
  templateUrl: './dashboard-popover-help.component.html',
  styleUrls: ['./dashboard-popover-help.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    NgbPopoverModule,
    TranslateModule
  ]
})
export class DashboardPopoverHelpComponent {
  @Input('img') img: string;

  constructor(config: NgbPopoverConfig) {
    config.placement = 'end';
    config.triggers = 'hover';
    config.popperOptions = (options) => {
      for (const modifier of options.modifiers || []) {
        if (modifier.name === 'offset' && modifier.options) {
          modifier.options.offset = () => [30, 8];
        }
      }
      return options;
    };
  }
}
