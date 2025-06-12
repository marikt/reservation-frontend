import {Injectable} from '@angular/core';
import {FormMode} from '../lib/util/form-mode.enum';

@Injectable()
export class ModeServiceProd {
  public mode: FormMode = FormMode.PRODUCTION;  public urlPrefix = '/';
  // public urlPrefix = 'form/';
}
