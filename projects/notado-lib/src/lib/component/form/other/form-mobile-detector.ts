import { HostListener, Input, Directive } from '@angular/core';
import {FormService} from '../../../service/form.service';
import {FormType} from '../../../util/form-type';

@Directive()
export abstract class FormMobileDetector {

  private static NO_OF_ATTEMPTS: number = 22;

  public ready: boolean;

  public formTypeValue: FormType;

  protected constructor(public formService: FormService) {
    this.attemptLoad(0);
  }

  private attemptLoad(attempts: number) {
    if (!this.formService.template && attempts < FormMobileDetector.NO_OF_ATTEMPTS) {
      setTimeout(() => {
        attempts++;
        this.attemptLoad(attempts);
      }, 100);
    } else if (!this.formService.template && attempts >= FormMobileDetector.NO_OF_ATTEMPTS) {
      this.formService.loadBusinessAndTemplate(() => {
        this.ready = true;
        this.onResize();
      });
    } else {
      this.ready = true;
      this.onResize();
    }
  };


  @HostListener('window:resize', ['$event'])
  public onResize(event?) {
    if (window.innerWidth < 1199) {
      this.formTypeValue = FormType.WIDGET;
    } else {
      this.formTypeValue = FormType.FULLSCREEN;
    }

    if (window.innerWidth < 576) {
      this.formService.isMobile = true;
    } else {
      this.formService.isMobile = false;
    }
  }

  public get formType(): typeof FormType {
    return FormType;
  }
}
