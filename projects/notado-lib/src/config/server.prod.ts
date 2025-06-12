import {Env} from '../lib/enum/env';
import {Injectable} from '@angular/core';

@Injectable()
export class ServerProd {
  public environment: Env = Env.PRODUCTION;
  // public SERVER: string = 'https://www.notado.cz:8443/';
  // public SERVER: string = 'https://www.notado.cz/';

  // keep it, for notado its https://www.notado.cz/* for form ist https://somebusinessdomain.notado.cz/*
  public SERVER: string = window.location.origin + '/';
}
