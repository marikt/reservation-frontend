import {Component, Input} from '@angular/core';
import {ComponentTypeEnum} from '../../../../../projects/notado-lib/src/lib/util/component-type.enum';
import {FormConfigService} from '../../../service/form-config.service';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgbDropdown, NgbDropdownItem, NgbDropdownMenu, NgbDropdownToggle} from '@ng-bootstrap/ng-bootstrap';
import {ReservationWindowConfig} from '../../../../../projects/notado-lib/src/lib/model/reservation-form/reservation-window-config';
import {CustomField} from '../../../../../projects/notado-lib/src/lib/model/reservation-form/custom-field';

export class ComponentTypeWithIcon {
  public componentType: ComponentTypeEnum;
  public icon: string;

  constructor(componentType: ComponentTypeEnum, icon: string) {
    this.componentType = componentType;
    this.icon = icon;
  }
}

@Component({
  selector: 'app-custom-field-manager',
  templateUrl: './custom-field-manager.component.html',
  styleUrls: ['./custom-field-manager.component.scss'],
  imports: [
    NgIf,
    NgForOf,
    FormsModule,
    TranslateModule,
    NgbDropdown,
    NgbDropdownToggle,
    NgbDropdownMenu,
    NgbDropdownItem
  ],
  standalone: true
})
export class CustomFieldManagerComponent {
  @Input() addFieldLabel: string;

  public supportedComponentType: ComponentTypeWithIcon[] = [];

  constructor(
    public formConfigService: FormConfigService,
    public translate: TranslateService,
  ) {
    this.initSupportedComponentTypes();
  }

  private initSupportedComponentTypes() {
    this.supportedComponentType.push(new ComponentTypeWithIcon(ComponentTypeEnum.TEXT, 'far fa-file-alt'));
    this.supportedComponentType.push(new ComponentTypeWithIcon(ComponentTypeEnum.TEXTAREA, 'far fa-file-alt'));
    this.supportedComponentType.push(new ComponentTypeWithIcon(ComponentTypeEnum.CHECKBOX, 'far fa-check-square'));
    this.supportedComponentType.push(new ComponentTypeWithIcon(ComponentTypeEnum.LABEL, 'fas fa-tag'));
    this.supportedComponentType.push(new ComponentTypeWithIcon(ComponentTypeEnum.LINE, 'fas fa-minus'));
    this.supportedComponentType.push(new ComponentTypeWithIcon(ComponentTypeEnum.DATEPICKER, 'fas fa-calendar'));
    this.supportedComponentType.push(new ComponentTypeWithIcon(ComponentTypeEnum.TIMEPICKER, 'fas fa-clock'));
    this.supportedComponentType.push(new ComponentTypeWithIcon(ComponentTypeEnum.COLOR, 'fas fa-palette'));
    this.supportedComponentType.push(new ComponentTypeWithIcon(ComponentTypeEnum.ATTENDEES, 'fas fa-users'));
  }

  public addCustomField(type: ComponentTypeEnum): void {
    this.formConfigService.window.active = true;
    if (!this.formConfigService.window.config) {
      this.formConfigService.window.config = new ReservationWindowConfig();
    }
    if (!this.formConfigService.window.config.customFieldsForServices) {
      this.formConfigService.window.config.customFieldsForServices = [];
    }

    const customField: CustomField = new CustomField();
    customField.componentType = type;
    switch (customField.componentType) {
      case ComponentTypeEnum.ATTENDEES:
        customField.label = this.translate.instant('DASHBOARD.FORM_WINDOW.ATTENDEES');
        break;
      case ComponentTypeEnum.LINE:
        break;
      default:
        customField.label = 'Změň mě';
    }
    this.formConfigService.customFieldForService.customFields.push(customField);
  }

  public removeCustomField(index: number): void {
    if (index >= 0 && index < this.formConfigService.customFieldForService.customFields.length) {
      this.formConfigService.customFieldForService.customFields.splice(index, 1);
    }
  }

  public get componentType(): typeof ComponentTypeEnum {
    return ComponentTypeEnum;
  }
}
