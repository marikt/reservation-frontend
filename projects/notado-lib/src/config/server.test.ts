import {Env} from '../lib/enum/env';
import {Injectable} from '@angular/core';

@Injectable()
export class ServerTest {
  public environment: Env = Env.TEST;
  public SERVER: string = 'https://www.test-notado.eu:8443/';
}


