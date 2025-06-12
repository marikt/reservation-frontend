import {Injectable} from '@angular/core';
import {FormMode} from '../lib/util/form-mode.enum';

@Injectable()
export class ModeService {
  public mode: FormMode = FormMode.DEMO;
  public urlPrefix = 'form/';
}
